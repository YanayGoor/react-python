import react
from .welcome import Welcome
from .description import Description


def App(props, ref):
    name = props['name']

    return (
        <div>
            <Welcome name={name} />
            <Description />
        </div>
    )
