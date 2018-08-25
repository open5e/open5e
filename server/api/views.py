from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import Monster, Spell, Background
from api.serializers import UserSerializer, GroupSerializer, MonsterSerializer, SpellSerializer, BackgroundSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class SpellViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing of spells.
    """
    queryset = Spell.objects.all()
    serializer_class = SpellSerializer
    filter_fields = (
        'level',
        'school',
        'duration',
        'components',
        'concentration',
        'casting_time',
        'dnd_class',
    )

class MonsterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing of monsters.
    """
    queryset = Monster.objects.all()
    serializer_class = MonsterSerializer
    filter_fields=(
        'challenge_rating',
        'armor_class',
        'name',
    )

class BackgroundViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing of Backgrounds.
    """
    queryset = Background.objects.all()
    serializer_class = BackgroundSerializer
    filter_fields=(
        'name',
        'skill_proficiencies',
        'languages'
    )