from django.urls import path
from library.views import ConsoleListCreate, ConsoleVariationListCreate, VariationsByConsole

urlpatterns = [
    path('consoles/', ConsoleListCreate.as_view(), name='console-list-create'),
    path('consoles/variations/', ConsoleVariationListCreate.as_view(), name='console-variation-list'),
    path('consoles/<int:console_id>/variations/', VariationsByConsole.as_view(), name='console-variations')
]