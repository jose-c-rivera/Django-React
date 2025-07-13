from rest_framework import serializers
from library.models.game_profile import GameProfile

class GameProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameProfile
        fields = '__all__'
        read_only_fields = ('user', 'date_added')

    def validate(self, data):
        # Ensure is_completed is True if is_mastered is True
        if data.get('is_mastered') and not data.get('is_completed'):
            data['is_completed'] = True
        return data
