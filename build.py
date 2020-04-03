import os
import re
import shutil
from pathlib import Path

TEMPLATE = '''const PYTHON = {code: `
CODE
`};
export default PYTHON;
'''

IMPORT_REGEX = re.compile(r'(\s*import\s+[\w\s{}*]*\s+from\s+[\'|"].\/\w*.)py([\'|"]\s*;?\s*)')
IMPORT_REPLACE = r'py.js'


def copytree(src, dst, symlinks=False, ignore=None):
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        if os.path.isdir(s):
            shutil.copytree(s, d, symlinks, ignore)
        else:
            shutil.copy2(s, d)


def convert(path):
    for subpath in path.iterdir():
        if subpath.is_dir():
            convert(subpath)
        elif subpath.suffix == '.py':
            with open(str(subpath), 'r') as py_file:
                code = py_file.read()
            with open(str(subpath.with_suffix('.py.js')), 'w+') as js_file:
                js_file.write(TEMPLATE.replace('CODE', code))
            subpath.unlink()
            print(subpath)
        elif subpath.suffix == '.js':
            with open(str(subpath), 'r+') as js_file:
                code = js_file.read()
                js_file.seek(0)
                js_file.truncate()
                js_file.write(re.sub(IMPORT_REGEX, r'\g<1>{}\g<2>'.format(IMPORT_REPLACE), code))


if __name__ == '__main__':
    copytree(str(Path(__file__).parent / 'app'), str(Path(__file__).parent / 'src'))
    convert(Path(__file__).parent / 'src')