from grzemplate import parser, Component, template

@parser.register()
class ProjectCard(Component):
    tag = "py-project"
    template_str = template(__file__)
