from grzemplate import parser, Component, template

@parser.register()
class Main(Component):
    tag = "py-main"
    template_str = template(__file__)
    def __init__(self, parser, content, image=None, blog_title=None, **kwargs):
        self.image = image
        self.blog_title = blog_title
        super().__init__(parser, content, **kwargs)
