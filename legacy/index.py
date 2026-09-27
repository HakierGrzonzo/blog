from components import main
from grzemplate import parser, Component, template, render, pp

@parser.register()
class Index(Component):
    tag="py-index"
    template_str=template(__file__)

with open("./output/index.html", "w+") as f:
    f.write(render(Index(parser)))
