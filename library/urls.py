from django.urls import path
from .views import ConsoleListCreate, ConsoleVariationListCreate, VariationsByConsole

urlpatterns = [
    path('api/consoles/', ConsoleListCreate.as_view(), name='console-list-create'),
    path('api/consoles/variations/', ConsoleVariationListCreate.as_view(), name='console-variation-list'),
    path('api/consoles/<int:console_id>/variations/', VariationsByConsole.as_view(), name='console-variations')
]