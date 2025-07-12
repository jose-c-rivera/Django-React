from django.urls import include, path
from . import console

urlpatterns = [
    path('api/', include(console)),  # This adds /api/consoles/, etc.
]