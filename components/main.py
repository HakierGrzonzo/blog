from grzemplate import parser, Component, template

@parser.register()
class Main(Component):
    tag = "py-main"
    template_str = template(__file__)
