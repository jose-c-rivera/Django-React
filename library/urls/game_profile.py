from django.urls import path
from library.views.game_profile import GameProfileListCreateView, GameProfileDetailView

urlpatterns = [
    path('gameprofiles/', GameProfileListCreateView.as_view(), name='gameprofile-list-create'),
    path('gameprofiles/<int:pk>/', GameProfileDetailView.as_view(), name='gameprofile-detail'),
]
