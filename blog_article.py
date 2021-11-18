import components
from grzemplate import parser, Component, template, render
import os


#open blog files
posts = [(fname[:-3], open(os.path.join(os.getcwd(), "posts", fname), "r").read()) for fname in os.listdir("./posts")]

@parser.register()
class BlogArticle(Component):
    tag="py-index"
    template_str=template(__file__)
    def __init__(self, parser, title, post):
        self.title = title
        self.post = post
        super().__init__(parser)

for title, post in posts:
    with open(f"./output/blog/{title}.html", "w+") as f:
        f.write(render(BlogArticle(parser, title, post)))
