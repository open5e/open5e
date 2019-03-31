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
    class Meta:
        model = Monster
        fields = (
            'slug',
            'name',
            'size',
            'type',
            'subtype',
            'group',
            'alignment',
            'armor_class',
            'armor_desc',
            'hit_points',
            'hit_dice',
            'speed',
            'strength',
            'dexterity',
            'constitution',
            'intelligence',
            'wisdom',
            'charisma',
            'strength_save',
            'dexterity_save',
            'constitution_save',
            'intelligence_save',
            'wisdom_save',
            'charisma_save',
            'perception',
            'damage_vulnerabilities',
            'damage_resistances',
            'damage_immunities',
            'condition_immunities',
            'senses',
            'languages',
            'challenge_rating',
            'actions',
            'reactions',
            'legendary_actions',
            'special_abilities',
            'document_slug'
        )

class SpellSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Spell
        fields = (
            'slug',
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
            'document_slug',
        )

class BackgroundSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Background
        fields = (
            'name',
            'desc',
            'slug',
            'skill_proficiencies',
            'languages',
            'equipment',
            'feature',
            'feature_desc',
            'suggested_characteristics',
            'document_slug',
        )

class PlaneSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Plane
        fields = ('slug','name','desc','document_slug')

class SectionSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Section
        fields = ('slug','name','desc','document_slug','parent')

class FeatSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Feat
        fields = ('slug','name','desc','prerequisite','document_slug')

class ConditionSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Condition
        fields = ('slug','name','desc','document_slug')

class SubraceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Subrace
        fields = ('name',
        'slug',
        'desc',
        'asi',
        'asi_desc',
        'document_slug')

class RaceSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    subraces = SubraceSerializer(many=True,read_only=True)
    class Meta:
        model = Race
        fields = (
            'name',
            'slug',
            'desc',
            'document_slug',
            'asi_desc',
            'asi',
            'age',
            'alignment',
            'size',
            'speed',
            'speed_desc',
            'languages',
            'vision',
            'traits',
            'subraces',
        )

class ArchetypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Archetype
        fields = ('name','slug','desc','document_slug')

class CharClassSerializer(serializers.HyperlinkedModelSerializer):
    archetypes = ArchetypeSerializer(many=True,read_only=True)
    class Meta:
        model = CharClass
        fields = (
            'name',
            'slug',
            'desc',
            'document_slug',
            'hit_dice',
            'hp_at_1st_level',
            'hp_at_higher_levels',
            'prof_armor',
            'prof_weapons',
            'prof_tools',
            'prof_saving_throws',
            'prof_skills',
            'equipment',
            'table',
            'spellcasting_ability',
            'subtypes_name',
            'archetypes',)

class MagicItemSerializer(DynamicFieldsModelSerializer, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MagicItem
        fields = ('slug','name','type','desc','rarity','requires_attunement','document_slug')

class AggregateSerializer(HighlighterMixin, HaystackSerializer):

    class Meta:
        index_classes = [MonsterIndex, 
            SpellIndex, 
            SectionIndex, 
            ConditionIndex, 
            CharClassIndex, 
            RaceIndex,
            MagicItemIndex,]
        fields = ['name',
            'text',
            'route',
            'slug',
            'level',
            'school',
            'dnd_class',
            'ritual',
            'armor_class',
            'hit_points',
            'hit_dice',
            'challenge_rating',
            'strength',
            'dexterity',
            'constitution',
            'intelligence',
            'wisdom',
            'charisma',
            'rarity',
            'type',
            'source',
            'requires_attunement',]