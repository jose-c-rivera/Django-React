from django.shortcuts import render
from .models.console import Console, ConsoleVariation
from .serializers.console import  ConsoleSerializer, ConsoleVariationSerializer
from rest_framework import generics

# Create your views here.

class ConsoleListCreate(generics.ListCreateAPIView):
    queryset = Console.objects.all()
    serializer_class = ConsoleSerializer

class ConsoleVariationListCreate(generics.ListCreateAPIView):
    queryset = ConsoleVariation.objects.all()
    serializer_class = ConsoleVariationSerializer

class VariationsByConsole(generics.ListAPIView):
    serializer_class = ConsoleVariationSerializer

    def get_queryset(self):
        return ConsoleVariation.objects.filter(console_id=self.kwargs['console_id'])

