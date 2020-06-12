APP = '''
from react import createElement
from .welcome import Welcome
from .description import description


def app(props, ref):
    name = props['name']

    return (
        <div>
            <Welcome name={name} />
            <description />
        </div>
    )
'''

from astunparse import unparse
from ast import NodeTransformer, dump, parse, Call, Name, Load

print(dump(parse('''createElement('div', {},
        createElement(Welcome, {'name': name}),
        createElement(description, {}),
    )''')))

class PyxTranspiler(NodeTransformer):
    def visit_Pyx(self, node):
        return Call(
            func=Name(id='createElement', ctx=Load()),
            args=[
                Name(id=node.name, ctx=Load())
            ],
            keywords=[]
        )


node = PyxTranspiler().visit(parse(APP))
print(unparse(node))