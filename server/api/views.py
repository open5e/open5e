from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *
from api.serializers import *


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