from django.urls import path
from auth_app.views import login_view, logout_view, home_view, SignupView, current_user

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('home/', home_view, name='home'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('user/', current_user, name='current_user'),
]
