from api.models import Monster, Spell, Section, Condition
from haystack import indexes
import datetime


class MonsterIndex(indexes.SearchIndex, indexes.Indexable):
  text = indexes.CharField(document=True, use_template=True)
  name = indexes.EdgeNgramField(model_attr='name', )
  desc = indexes.CharField(model_attr='desc')
  pub_date = indexes.DateTimeField(model_attr='created_at')
  url = indexes.CharField(model_attr='get_url', indexed=False)

  def get_model(self):
    return Monster

  def index_queryset(self, using=None):
    """Used when the entire index for model is updated."""
    return self.get_model().objects.filter(
      created_at__lte=datetime.datetime.now()
    )

class SpellIndex(indexes.SearchIndex, indexes.Indexable):
  text = indexes.CharField(document=True, use_template=True)
  name = indexes.EdgeNgramField(model_attr='name', )
  pub_date = indexes.DateTimeField(model_attr='created_at')
  desc = indexes.CharField(model_attr='desc')
  url = indexes.CharField(model_attr='get_url', indexed=False)

  def get_model(self):
    return Spell

  def index_queryset(self, using=None):
    """Used when the entire index for model is updated."""
    return self.get_model().objects.filter(
      created_at__lte=datetime.datetime.now()
    )

class SectionIndex(indexes.SearchIndex, indexes.Indexable):
  text = indexes.CharField(document=True, use_template=True)
  name = indexes.EdgeNgramField(model_attr='name', )
  pub_date = indexes.DateTimeField(model_attr='created_at')
  desc = indexes.CharField(model_attr='desc')
  url = indexes.CharField(model_attr='get_url', indexed=False)

  def get_model(self):
    return Section

  def index_queryset(self, using=None):
    """Used when the entire index for model is updated."""
    return self.get_model().objects.filter(
      created_at__lte=datetime.datetime.now()
    )

class ConditionIndex(indexes.SearchIndex, indexes.Indexable):
  text = indexes.CharField(document=True, use_template=True)
  name = indexes.EdgeNgramField(model_attr='name', )
  pub_date = indexes.DateTimeField(model_attr='created_at')
  desc = indexes.CharField(model_attr='desc')
  url = indexes.CharField(model_attr='get_url', indexed=False)

  def get_model(self):
    return Condition

  def index_queryset(self, using=None):
    """Used when the entire index for model is updated."""
    return self.get_model().objects.filter(
      created_at__lte=datetime.datetime.now()
    )