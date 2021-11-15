from components import main
from grzemplate import parser, Component, template, render, pp

@parser.register()
class About(Component):
    tag="py-index"
    template_str=template(__file__)

with open("./output/about.html", "w+") as f:
    f.write(render(About(parser)))
