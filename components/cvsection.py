from grzemplate import parser, Component, template

@parser.register()
class CVsection(Component):
    tag = "py-cvsection"
    template_str = template(__file__)
