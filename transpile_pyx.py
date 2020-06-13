from ast import *
from astunparse import unparse


def _pyx_arg_to_key(kw):
    return Str(kw.arg) if kw.arg is not None else None


class PyxTranspiler(NodeTransformer):
    def visit_Pyx(self, node):
        children = [self.visit(n) for n in node.children]
        return Call(
            func=Attribute(value=Name(id='react', ctx=Load()), attr='createElement', ctx=Load()),
            args=[
                Name(id=node.name, ctx=Load()) if node.name[0].isupper() else Str(node.name),
                Dict(keys=[_pyx_arg_to_key(kw) for kw in node.kwargs],
                     values=[kw.value for kw in node.kwargs]),
                *children
            ],
            keywords=[]
        )


def transpile_pyx(code: str):
    return unparse(PyxTranspiler().visit(parse(code)))
