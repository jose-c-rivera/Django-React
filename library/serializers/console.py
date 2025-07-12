from rest_framework import serializers
from library.models.console import Console, ConsoleVariation

class ConsoleVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsoleVariation
        fields = '__all__'

class ConsoleSerializer(serializers.ModelSerializer):
    variations = ConsoleVariationSerializer(many=True, read_only=True)

    class Meta:
        model = Console
        fields = '__all__'