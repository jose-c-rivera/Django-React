from django.urls import include, path
from . import console, game_profile

urlpatterns = [
    path('api/', include(console)),
    path('api/', include(game_profile)),
]