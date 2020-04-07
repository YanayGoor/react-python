from react import createElement
from .welcome import Welcome
from .description import description


def app(props, ref):
    name = props['name']

    return createElement('div', {},
        createElement(Welcome, {'name': name}),
        createElement(description, {}),
    )
)