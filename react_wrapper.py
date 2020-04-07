class RCMeta(type):
    def __getattr__(self, item):
        try:
            return super(RCMeta, self).__getattr__(item)
        except AttributeError:
            return RC.from_comp(item)


class RC(metaclass=RCMeta):
    def __init__(self, comp, **kwargs):
        self.comp = comp
        self.kwargs = kwargs

    @classmethod
    def from_comp(cls, comp):
        obj = cls(comp)
        obj.kwargs = None
        return obj

    def compile(self):
        return createElement(self.comp, self.kwargs or {})

    def __call__(self, *args, **kwargs):
        if self.comp is not None and self.kwargs is None and kwargs:
            if args:
                raise TypeError
            return RC(self.comp, **kwargs)
        if kwargs:
            raise TypeError
        args = [item.compile() if isinstance(item, RC) else item for item in args]
        return createElement(self.comp, self.kwargs or {}, args)


# example

def app(props, ref):
    name = props['name']

    return RC.div(
        RC(Welcome, name=name),
        RC(description)
    )
)