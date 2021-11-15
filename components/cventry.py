from grzemplate import parser, Component, template

@parser.register()
class CVentry(Component):
    tag = "py-cventry"
    template_str = template(__file__)
