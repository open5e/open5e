from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Spell, Monster, Background, Document

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
                'desc', 
                'license',
                'author',
                'organization',
                'version',
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
    class Meta:
        model = Background
        fields = (
            'id',
            'name',
            'desc',
            'slug',
            'skill_proficiencies',
            'languages',
            'equipment',
            'feature',
            'suggested_characteristics',
            'document',
        )
