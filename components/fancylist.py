from grzemplate import parser, Component, template

@parser.register()
class FancyList(Component):
    tag = "py-fancy-list"
    template_str = template(__file__)
