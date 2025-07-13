from django.urls import path
from .views import login_view, logout_view, home_view

urlpatterns = [
    path('login/', login_view),
    path('logout/', logout_view),
    path('home/', home_view),
]
