from components import main
from grzemplate import parser, Component, template, render, pp

@parser.register()
class Index(Component):
    tag="py-index"
    template_str=template(__file__)

print(render(Index(parser)))
