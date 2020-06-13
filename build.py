import ast
import os
import re
import shutil
from pathlib import Path
from textwrap import dedent

from transpile_pyx import transpile_pyx

# JS_IMPORT_TEMPLATE = '''import * as NAME from 'FULLNAME';\n'''
# JS_PROMISE_IMPORT_TEMPLATE = '''import NAME from 'FULLNAME';\n'''
#
# PYIMPORTS_INIT = '''window.pyImports = {};\nconst pyPromises = [];\n'''
#
# PYIMPORTS_ADD_TEMPLATE = '''window.pyImports.NAME = NAME;\n'''
# PYIMPORTS_PROMISE_ADD_TEMPLATE = '''NAME.then(x => { window.pyImports.NAME = x });\npyPromises.push(NAME);\n'''
#
# PY_IMPORT_TEMPLATE = '''sys.modules['FULLNAME'] = pyImports.NAME\n'''
#
# TEMPLATE = '''const PYTHON = `
# CODE
#
# globals()
# `;
#
# const execute = Promise.all([window.languagePluginLoader, ...pyPromises]).then(() => window.pyodide.runPython(PYTHON))
#
# export default execute;
# '''
#
# IMPORT_REGEX = re.compile(r'(\s*import\s+[\w\s{}*]*\s+from\s+[\'|"].\/\w*.)py([\'|"]\s*;?\s*)')
# IMPORT_REPLACE = r'py.js'


# def find_imports(code):
#     """
#     Finds the imports in a string of code and returns a list of their package
#     names.
#     """
#     # handle mis-indented input from multi-line strings
#     code = dedent(code)
#
#     mod = ast.parse(code)
#     imports = set()
#     for node in ast.walk(mod):
#         if isinstance(node, (ast.Import, ast.ImportFrom)):
#             relative_name = code.split('\n')[node.lineno - 1].split()[1]
#             imports.add(relative_name)
#     return list(imports)
#
#
# def copytree(src, dst, symlinks=False, ignore=None):
#     for item in os.listdir(src):
#         s = os.path.join(src, item)
#         d = os.path.join(dst, item)
#         if os.path.isdir(s):
#             shutil.copytree(s, d, symlinks, ignore)
#         else:
#             shutil.copy2(s, d)
#
#
# def convert(path, src_path):
#     for subpath in path.iterdir():
#         if subpath.is_dir():
#             convert(subpath)
#         elif subpath.suffix in ['.py', '.pyx']:
#             with open(str(subpath), 'r') as py_file:
#                 code = py_file.read()
#                 if subpath.suffix in '.pyx':
#                     code = transpile_pyx(code)
#             with open(str(subpath.with_suffix('.py.js')), 'w+') as js_file:
#                 new = ''
#                 new_code = '''from js import pyImports\nimport sys\nglobals()['__name__'] = 'pythonreact'\nglobals()['__package__'] = 'pythonreact'\n'''
#                 imports = [name for name in find_imports(code) if name in [path.stem for path in (path.parent / 'node_modules').iterdir()]]
#                 relative_js_imports = [name for name in find_imports(code) if name in [path.stem for path in src_path.iterdir() if path.suffix == '.js']]
#                 relative_py_imports = [name for name in find_imports(code) if name in [path.stem for path in src_path.iterdir() if path.suffix in ['.py', '.pyx']]]
#                 # print(find_imports(code), [path.stem for path in src_path.iterdir() if path.suffix in ['.py', '.pyx']])
#                 for name in imports:
#                     new += JS_IMPORT_TEMPLATE.replace('FULLNAME', name).replace('NAME', name)
#                 for name in relative_js_imports:
#                     new += JS_IMPORT_TEMPLATE.replace('FULLNAME', './' + name).replace('NAME', name)
#                 for name in relative_py_imports:
#                     new += JS_PROMISE_IMPORT_TEMPLATE.replace('FULLNAME', './' + name + '.py.js').replace('NAME', name)
#                 new += PYIMPORTS_INIT
#                 for name in imports:
#                     new += PYIMPORTS_ADD_TEMPLATE.replace('NAME', name)
#                 for name in relative_js_imports:
#                     new += PYIMPORTS_ADD_TEMPLATE.replace('NAME', name)
#                 for name in relative_py_imports:
#                     new += PYIMPORTS_PROMISE_ADD_TEMPLATE.replace('NAME', name)
#                 for name in imports:
#                     new_code += PY_IMPORT_TEMPLATE.replace('FULLNAME', name).replace('NAME', name)
#                 for name in relative_js_imports:
#                     new_code += PY_IMPORT_TEMPLATE.replace('FULLNAME', 'pythonreact.' + name).replace('NAME', name)
#                 for name in relative_py_imports:
#                     new_code += PY_IMPORT_TEMPLATE.replace('FULLNAME', 'pythonreact.' + name).replace('NAME', name)
#                 new += TEMPLATE.replace('CODE', new_code + code)
#                 js_file.write(new)
#             subpath.unlink()
#             # print(subpath)
#         elif subpath.suffix == '.js':
#             with open(str(subpath), 'r+') as js_file:
#                 code = js_file.read()
#                 js_file.seek(0)
#                 js_file.truncate()
#                 js_file.write(re.sub(IMPORT_REGEX, r'\g<1>{}\g<2>'.format(IMPORT_REPLACE), code))

def convert_py(root_path, dst_root_path, rel_path):
    pass


def convert_pyx(root_path, dst_root_path, rel_path):
    pass


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
