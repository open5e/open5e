from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *
from api.serializers import *
from drf_haystack.serializers import HaystackSerializer
from drf_haystack.viewsets import HaystackViewSet

from api.models import Monster
from api.search_indexes import MonsterIndex


class SearchView(HaystackViewSet):

    # `index_models` is an optional list of which models you would like to include
    # in the search result. You might have several models indexed, and this provides
    # a way to filter out those of no interest for this particular view.
    # (Translates to `SearchQuerySet().models(*index_models)` behind the scenes.
    serializer_class = AggregateSerializer


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

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    filter_fields = (
        'title',
        'organization',
        'license',
        )

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

class PlaneViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing of Planes.
    """
    queryset = Plane.objects.all()
    serializer_class = PlaneSerializer
    filter_fields=(
        'name',
    )

class SectionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing of Sections.
    """
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    filter_fields=(
        'name',
        'parent',
    )

class FeatViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing of Feats.
    """
    queryset = Feat.objects.all()
    serializer_class = FeatSerializer
    filter_fields=('name','prerequisite')

class ConditionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing of Backgrounds.
    """
    queryset = Condition.objects.all()
    serializer_class = ConditionSerializer
    filter_fields=(
        'name',
    )

class RaceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing of Races and Subraces.
    """
    queryset = Race.objects.all()
    serializer_class = RaceSerializer
    filter_fields=(
        'name',
    )

class SubraceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing of Races and Subraces.
    """
    queryset = Subrace.objects.all()
    serializer_class = SubraceSerializer
    filter_fields=(
        'name',
    )

class CharClassViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing of Classes and Archetypes.
    """
    queryset = CharClass.objects.all()
    serializer_class = CharClassSerializer
    filter_fields=(
        'name',
    )

class ArchetypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing of Archetypes.
    """
    queryset = Archetype.objects.all()
    serializer_class = ArchetypeSerializer
    filter_fields=(
        'name',
    )

class MagicItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing of Archetypes.
    """
    queryset = MagicItem.objects.all()
    serializer_class = MagicItemSerializer
    filter_fields=(
        'name',
    )