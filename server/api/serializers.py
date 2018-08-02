from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Spell, Monster

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class MonsterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Monster
        fields = (
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
        )

class SpellSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Spell
        fields = (
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
        )
