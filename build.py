import re
import ast
import shutil
from pathlib import Path
from textwrap import dedent

from transpile_pyx import transpile_pyx


PY_JS_FILE_TEMPLATE = '''import {{ executeFile }} from './pyodideUtils';
{}
const pyImports = {{}};
const pyPromises = [];
{}
const PYTHON = `
{}
`;
const execute = executeFile(PYTHON, pyImports, pyPromises);
export default execute;
'''

JS_IMPORT_ALL_TEMPLATE = 'import * as {} from \'{}\';'

JS_IMPORT_TEMPLATE = 'import {} from \'{}\';'

REGISTER_PY_IMPORT_TEMPLATE = '''const {}Promise = {}.then(x => {{ pyImports['{}'] = x }});
pyPromises.push({}Promise);'''

REGISTER_JS_IMPORT_TEMPLATE = 'pyImports[\'{}\'] = {};'

PACKAGE_NAME = 'pythonreact'


def _find_imports(code):
    """
    Finds the imports in a string of code and returns a list of their package
    names.
    """
    # handle mis-indented input from multi-line strings
    code = dedent(code)

    mod = ast.parse(code)
    imports = set()
    for node in ast.walk(mod):
        if isinstance(node, (ast.Import, ast.ImportFrom)):
            relative_name = code.split('\n')[node.lineno - 1].split()[1]
            imports.add(relative_name)
    return imports


def _find_suffix(path):
    if path.with_suffix('.py').exists() or path.with_suffix('.pyx').exists():
        return '.py.js'
    elif path.with_suffix('.js').exists():
        return '.js'
    raise ValueError(f'No file with supported suffix found for - {path}')


def _parse_relative_import_name(root_path, rel_path, name):
    """
    Get the absolute path of the import and the import path relative to the importer file's path as a string.
    """
    import_path = root_path / rel_path
    path_prefix = ''
    while name.startswith('.'):
        if not path_prefix:
            path_prefix += './'
        else:
            path_prefix += '../'
        import_path = import_path.parent
        name = name[1:]
    import_path = import_path / name
    suffix = _find_suffix(import_path)
    return import_path.with_suffix(suffix), f'{path_prefix}{name}{suffix}', name


def _get_relative_import_lines(root_path, rel_path, name):
    abs_path, rel_path_str, name = _parse_relative_import_name(root_path, rel_path, name)
    is_python = rel_path_str.endswith('.py.js')

    import_template = JS_IMPORT_TEMPLATE if is_python else JS_IMPORT_ALL_TEMPLATE
    package_path = '.'.join([PACKAGE_NAME, *abs_path.relative_to(root_path).parts[:-1], name])

    import_line = import_template.format(name, rel_path_str)
    if is_python:
        register_line = REGISTER_PY_IMPORT_TEMPLATE.format(name, name, package_path, name)
    else:
        register_line = REGISTER_JS_IMPORT_TEMPLATE.format(package_path, name)
    return import_line, register_line


def _convert_py_code(code, root_path, dst_root_path, rel_path):
    with open((dst_root_path / rel_path).with_suffix('.py.js'), 'w') as py_file:
        import_names = _find_imports(code)
        import_lines = []
        register_lines = []
        for name in import_names:
            if name.startswith('.'):
                import_line, register_line = _get_relative_import_lines(root_path, rel_path, name)
                import_lines.append(import_line)
                register_lines.append(register_line)
            elif (root_path.parent / 'node_modules' / name).exists():
                register_lines.append(REGISTER_JS_IMPORT_TEMPLATE.format(name, name))
                import_lines.append(JS_IMPORT_ALL_TEMPLATE.format(name, name))
        path = '.'.join([PACKAGE_NAME, *rel_path.with_suffix('').parts])
        code = PY_JS_FILE_TEMPLATE.format('\n'.join(import_lines), '\n'.join(register_lines), code)
        py_file.write(code)


def convert_py(root_path, dst_root_path, rel_path):
    with open(root_path / rel_path, 'r') as py_file:
        code = py_file.read()
    _convert_py_code(code, root_path, dst_root_path, rel_path)


def convert_pyx(root_path, dst_root_path, rel_path):
    with open(root_path / rel_path, 'r') as py_file:
        code = transpile_pyx(py_file.read())
    _convert_py_code(code, root_path, dst_root_path, rel_path)


IMPORT_REGEX = re.compile(r'(\s*import\s+[\w\s{}*]*\s+from\s+[\'|"].\/\w*.)py([\'|"]\s*;?\s*)')
IMPORT_REPLACE = r'py.js'


def convert_js(root_path, dst_root_path, rel_path):
    # TODO: parse ast of javascript file for supporting more import statement syntax types.
    with open(root_path / rel_path, 'r') as js_file:
        code = js_file.read()
    with open(dst_root_path / rel_path, 'w') as js_file:
        js_file.write(re.sub(IMPORT_REGEX, r'\g<1>{}\g<2>'.format(IMPORT_REPLACE), code))


CONVERT_SUFFIX_MAP = {
    '.pyx': convert_pyx,
    '.py': convert_py,
    '.js': convert_js
}


def convert_file(root_path, dst_root_path, rel_path):
    converter = CONVERT_SUFFIX_MAP.get(rel_path.suffix)
    if converter:
        converter(root_path, dst_root_path, rel_path)
    else:
        shutil.copy2(root_path / rel_path, dst_root_path / rel_path)


def convert_folder(root_path, dst_root_path, rel_path):
    if not (dst_root_path / rel_path).exists():
        (dst_root_path / rel_path).mkdir()
    for file in (root_path / rel_path).iterdir():
        print((root_path / rel_path), file)
        convert(root_path, dst_root_path, file.relative_to(root_path))


def convert(root_path, dst_root_path, rel_path=Path('.')):
    if (root_path / rel_path).is_dir():
        convert_folder(root_path, dst_root_path, rel_path)
    else:
        convert_file(root_path, dst_root_path, rel_path)


if __name__ == '__main__':
    convert(Path(__file__).parent / 'app', Path(__file__).parent / 'src')
