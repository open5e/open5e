from django.contrib.auth.models import User, Group
from rest_framework import serializers
from drf_haystack.serializers import HighlighterMixin, HaystackSerializer
from drf_haystack.viewsets import HaystackViewSet
from api.models import *
from .search_indexes import *

class DynamicFieldsModelSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        fields = self.context['request'].query_params.get('fields')
        if fields:
            fields = fields.split(',')
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
            model = Document
            fields = (
                'title', 
                'slug', 
                'url',)

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class MonsterSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    
    document = DocumentSerializer()
    class Meta:
        model = Monster
        fields = (
            'slug',
            'get_url',
            'name',
            'size',
            'type',
            'subtype',
            'alignment',
            'armor_class',
            'hit_points',
            'hit_dice',
            'speed',
            'strength',
            'dexterity',
            'constitution',
            'intelligence',
            'wisdom',
            'charisma',
            'constitution_save',
            'intelligence_save',
            'wisdom_save',
            'perception',
            'damage_vulnerabilities',
            'damage_resistances',
            'damage_immunities',
            'condition_immunities',
            'senses',
            'languages',
            'challenge_rating',
            'document',

        )

class SpellSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    document = DocumentSerializer()
    class Meta:
        model = Spell
        fields = (
            'slug',
            'get_url',
            'name',
            'desc',
            'higher_level',
            'page',
            'range',
            'components',
            'material',
            'ritual',
            'duration',
            'concentration',
            'casting_time',
            'level',
            'school',
            'dnd_class',
            'archetype',
            'circles',
            'document',
        )

class BackgroundSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    document = DocumentSerializer()
    class Meta:
        model = Background
        fields = (
            'name',
            'get_url',
            'desc',
            'slug',
            'skill_proficiencies',
            'languages',
            'equipment',
            'feature',
            'suggested_characteristics',
            'document',
        )

class PlaneSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    document = DocumentSerializer()
    class Meta:
        model = Plane
        fields = ('slug','get_url','name','desc','document')

class SectionSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    document = DocumentSerializer()
    class Meta:
        model = Section
        fields = ('slug','get_url','name','desc','document')

class FeatSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    document = DocumentSerializer()
    class Meta:
        model = Feat
        fields = ('slug','get_url','name','desc','prerequisite','document')

class ConditionSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    document = DocumentSerializer()
    class Meta:
        model = Condition
        fields = ('slug','get_url','name','desc','document')

class AggregateSerializer(HighlighterMixin, HaystackSerializer):

    class Meta:
        index_classes = [MonsterIndex, SpellIndex, SectionIndex, ConditionIndex]
        fields = ["name",'url', "text"]