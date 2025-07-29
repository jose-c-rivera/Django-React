from django.test import TestCase
from django.contrib.auth import get_user_model
from library.models.game_profile import GameProfile
from datetime import date

User = get_user_model()

class GameProfileModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='modeluser', password='modelpass')
        self.profile = GameProfile.objects.create(
            user=self.user,
            rawg_id=12345,
            title='Test Game',
            cover_url='https://example.com/cover.jpg',
            ownership_status='owned',
            is_in_backlog=True,
            is_completed=False,
            is_mastered=False,
            progress='in_progress',
            dropped_reason='not_fun',
            dropped_reason_notes='Just not fun for me.'
        )

    def test_profile_creation(self):
        self.assertEqual(self.profile.user, self.user)
        self.assertEqual(self.profile.rawg_id, 12345)
        self.assertEqual(self.profile.title, 'Test Game')
        self.assertEqual(self.profile.cover_url, 'https://example.com/cover.jpg')
        self.assertEqual(self.profile.ownership_status, 'owned')
        self.assertTrue(self.profile.is_in_backlog)
        self.assertFalse(self.profile.is_completed)
        self.assertFalse(self.profile.is_mastered)
        self.assertEqual(self.profile.progress, 'in_progress')
        self.assertEqual(self.profile.dropped_reason, 'not_fun')
        self.assertEqual(self.profile.dropped_reason_notes, 'Just not fun for me.')

    def test_str_method(self):
        # Adjust this test if you have a __str__ method in your model
        self.assertIn('Test Game', str(self.profile))
