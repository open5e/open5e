from api.models import *
from haystack import indexes
import datetime


class MonsterIndex(indexes.SearchIndex, indexes.Indexable):
  text = indexes.CharField(document=True, use_template=True)
  name = indexes.EdgeNgramField(model_attr='name', )
  route = indexes.CharField(model_attr='route', indexed=False)
  slug = indexes.CharField(model_attr='slug', indexed=False)
  armor_class = indexes.CharField(model_attr='armor_class', indexed=False)
  hit_points = indexes.CharField(model_attr='hit_points', indexed=False)
  hit_dice = indexes.CharField(model_attr='hit_dice', indexed=False)
  strength = indexes.CharField(model_attr='strength', indexed=False)
  dexterity = indexes.CharField(model_attr='dexterity', indexed=False)
  constitution = indexes.CharField(model_attr='constitution', indexed=False)
  intelligence = indexes.CharField(model_attr='intelligence', indexed=False)
  wisdom = indexes.CharField(model_attr='wisdom', indexed=False)
  charisma = indexes.CharField(model_attr='charisma', indexed=False)
  challenge_rating = indexes.CharField(model_attr='challenge_rating', indexed=False)

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
  route = indexes.CharField(model_attr='route', indexed=False)
  slug = indexes.CharField(model_attr='slug', indexed=False)
  ritual = indexes.CharField(model_attr='ritual', indexed=False)
  level = indexes.CharField(model_attr='level', indexed=False)
  school = indexes.CharField(model_attr='school', indexed=False)
  dnd_class = indexes.CharField(model_attr='dnd_class', indexed=False)
  route = indexes.CharField(model_attr='route', indexed=False)


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
  route = indexes.CharField(model_attr='route', indexed=False)
  slug = indexes.CharField(model_attr='slug', indexed=False)


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
  route = indexes.CharField(model_attr='route', indexed=False)
  slug = indexes.CharField(model_attr='slug', indexed=False)


  def get_model(self):
    return Condition

  def index_queryset(self, using=None):
    """Used when the entire index for model is updated."""
    return self.get_model().objects.filter(
      created_at__lte=datetime.datetime.now()
    )

class CharClassIndex(indexes.SearchIndex, indexes.Indexable):
  text = indexes.CharField(document=True, use_template=True)
  name = indexes.EdgeNgramField(model_attr='name', )
  route = indexes.CharField(model_attr='route', indexed=False)
  slug = indexes.CharField(model_attr='slug', indexed=False)

  def get_model(self):
    return CharClass

  def index_queryset(self, using=None):
    """Used when the entire index for model is updated."""
    return self.get_model().objects.filter(
      created_at__lte=datetime.datetime.now()
    )

class RaceIndex(indexes.SearchIndex, indexes.Indexable):
  text = indexes.CharField(document=True, use_template=True)
  name = indexes.EdgeNgramField(model_attr='name')
  route = indexes.CharField(model_attr='route', indexed=False)
  slug = indexes.CharField(model_attr='slug', indexed=False)

  def get_model(self):
    return Race

  def index_queryset(self, using=None):
    """Used when the entire index for model is updated."""
    return self.get_model().objects.filter(
      created_at__lte=datetime.datetime.now()
    )

class MagicItemIndex(indexes.SearchIndex, indexes.Indexable):
  text = indexes.CharField(document=True, use_template=True)
  name = indexes.EdgeNgramField(model_attr='name')
  route = indexes.CharField(model_attr='route', indexed=False)
  slug = indexes.CharField(model_attr='slug', indexed=False)
  type = indexes.CharField(model_attr='type')
  rarity = indexes.CharField(model_attr='rarity')
  requires_attunement = indexes.CharField(model_attr='requires_attunement', indexed=False)

  def get_model(self):
    return MagicItem

  def index_queryset(self, using=None):
    """Used when the entire index for model is updated."""
    return self.get_model().objects.filter(
      created_at__lte=datetime.datetime.now()
    )
