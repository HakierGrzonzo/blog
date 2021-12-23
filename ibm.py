from components import main
from grzemplate import parser, Component, template, render, pp

@parser.register()
class Projects(Component):
    tag="py-index"
    template_str=template(__file__)

with open("./output/blog/ibm.html", "w+") as f:
    f.write(render(Projects(parser)))
