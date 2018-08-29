from django.template.defaultfilters import stringfilter
from django import template
import markdown

register = template.Library()

@register.filter(is_safe=True)
@stringfilter
def custom_markdown(value):
    extensions=['markdown.extensions.extra', 'markdown.extensions.nl2br' ]
 
    return (markdown.markdown(value, extensions=extensions))