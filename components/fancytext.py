from grzemplate import parser, Component, template

@parser.register()
class FancyText(Component):
    tag = "py-fancy"
    template_str = template(__file__)
