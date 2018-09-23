"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
#router.register(r'users', views.UserViewSet)
#router.register(r'groups', views.GroupViewSet)
router.register(r'spells', views.SpellViewSet)
router.register(r'monsters', views.MonsterViewSet)
router.register(r'backgrounds', views.BackgroundViewSet)
router.register(r'planes', views.PlaneViewSet)
router.register(r'sections', views.SectionViewSet)
router.register(r'feats', views.FeatViewSet)
router.register(r'conditions', views.ConditionViewSet)
router.register(r'races',views.RaceViewSet)
#router.register(r'subraces',views.SubraceViewSet)
router.register(r'classes',views.CharClassViewSet)
#router.register(r'archetypes',views.ArchetypeViewSet)
router.register(r'magicitems',views.MagicItemViewSet)
router.register('search', views.SearchView, base_name="global-search")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^search/', include('haystack.urls')),
]
