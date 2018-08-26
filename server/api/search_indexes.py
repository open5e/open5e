from api.models import Monster
from haystack import indexes
import datetime


class MonsterIndex(indexes.SearchIndex, indexes.Indexable):
  text = indexes.NgramField(document=True, use_template=True)
  title = indexes.EdgeNgramField(model_attr='name', )
  pub_date = indexes.DateTimeField(model_attr='created_at')

  def get_model(self):
    return Monster

  def index_queryset(self, using=None):
    """Used when the entire index for model is updated."""
    return self.get_model().objects.filter(
      created_at__lte=datetime.datetime.now()
    )