from components import main
from grzemplate import parser, Component, template, render, pp
import os


#open blog files
posts = [(fname[:-3], open(os.path.join(os.getcwd(), "posts", fname), "r")) for fname in os.listdir("./posts")]

@parser.register()
class Blog(Component):
    tag="py-index"
    template_str=template(__file__)
    def __init__(self, parser, posts):
        self.posts = []
        for post in posts:
            name, content = post
            self.posts.append({
                "name": name,
                "preview": "\n".join(content.read().split("\n")[:3]) + "..."
            })
        super().__init__(parser)

with open("./output/blog.html", "w+") as f:
    f.write(render(Blog(parser, posts)))
