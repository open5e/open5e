from rest_framework.pagination import PageNumberPagination
from haystack.utils import Highlighter
import markdown2 as mkdn

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'limit'

class NewHighlighter(Highlighter):
    def render_html(self, highlight_locations=None, start_offset=None, end_offset=None):
        highlighted_chunk = self.text_block[start_offset:end_offset]

        for word in self.query_words:
            highlighted_chunk = highlighted_chunk.replace(word, '<b>' + word + '</b>')

        return highlighted_chunk