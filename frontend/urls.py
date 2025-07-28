from django.urls import re_path
from . import views

urlpatterns = [
    # Catch all paths and serve React index.html
    re_path(r'^.*$', views.index),
]