from rest_framework import serializers
from library.models.console import Console, ConsoleVariation

class ConsoleVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsoleVariation
        fields = '__all__'

class ConsoleSerializer(serializers.ModelSerializer):
    manufacturer_display = serializers.SerializerMethodField()
    media_format_display = serializers.SerializerMethodField()
    variations = ConsoleVariationSerializer(many=True, read_only=True)

    class Meta:
        model = Console
        fields = '__all__'

    def get_manufacturer_display(self, obj):
        return obj.get_manufacturer_display()
    
    def get_media_format_display(self, obj):
        return obj.get_media_format_display()