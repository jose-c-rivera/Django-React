from rest_framework import generics, permissions
from library.models.game_profile import GameProfile
from library.serializers.game_profile import GameProfileSerializer

class GameProfileListCreateView(generics.ListCreateAPIView):
    serializer_class = GameProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only this user's game profiles
        return GameProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GameProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GameProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only allow access to user's own game profiles
        return GameProfile.objects.filter(user=self.request.user)
