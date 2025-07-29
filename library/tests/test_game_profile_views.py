from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from library.models.game_profile import GameProfile
from datetime import date

User = get_user_model()

class GameProfileViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.login(username='testuser', password='testpass')
        self.profile = GameProfile.objects.create(
            user=self.user,
            rawg_id=111,
            title='Test Game',
            cover_url='https://example.com/cover.jpg',
            ownership_status='owned',
            is_in_backlog=True,
            is_completed=False,
            is_mastered=False,
            progress='in_progress',
            dropped_reason='not_fun',
            dropped_reason_notes='Not fun for me.'
        )

    def test_list_game_profiles(self):
        url = reverse('gameprofile-list-create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Game')

    def test_create_game_profile(self):
        url = reverse('gameprofile-list-create')
        data = {
            'rawg_id': 222,
            'title': 'Another Game',
            'cover_url': 'https://example.com/another.jpg',
            'ownership_status': 'wishlist',
            'is_in_backlog': False,
            'is_completed': False,
            'is_mastered': False,
            'progress': 'not_started',
            'dropped_reason': '',
            'dropped_reason_notes': ''
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'Another Game')
        self.assertEqual(response.data['user'], self.user.id)

    def test_retrieve_game_profile(self):
        url = reverse('gameprofile-detail', kwargs={'pk': self.profile.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Game')

    def test_update_game_profile(self):
        url = reverse('gameprofile-detail', kwargs={'pk': self.profile.pk})
        data = {
            'rawg_id': 111,
            'title': 'Updated Game',
            'cover_url': 'https://example.com/updated.jpg',
            'ownership_status': 'owned',
            'is_in_backlog': False,
            'is_completed': True,
            'is_mastered': True,
            'progress': 'completed',
            'dropped_reason': '',
            'dropped_reason_notes': ''
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Game')

    def test_delete_game_profile(self):
        url = reverse('gameprofile-detail', kwargs={'pk': self.profile.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(GameProfile.objects.filter(pk=self.profile.pk).exists())
