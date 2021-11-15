from grzemplate import parser, Component, template
from markdown import markdown

@parser.register()
class Article(Component):
    tag = "py-article"
    template_str = template(__file__)

    def get_content(self):
        return markdown(self._attrs['article'], extensions=['extra', 'codehilite', 'markdown_katex'])

