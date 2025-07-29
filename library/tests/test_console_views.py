from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from library.models.console import Console, ConsoleVariation
from datetime import date

class ConsoleViewTests(APITestCase):
    def setUp(self):
        self.console = Console.objects.create(
            name="PlayStation 5",
            manufacturer=Console.ConsoleManufacturer.SONY,
            media_format=Console.MediaFormat.DISC,
            max_resolution_width=3840,
            max_resolution_height=2160,
            release_date=date(2020, 11, 12),
            generation=9,
            handheld=False,
            online_capabilities=True,
            region_lock=False,
            description="Sony's ninth-generation home video game console.",
            image_url="https://example.com/ps5.jpg",
            na_game_count=100,
            eu_game_count=90,
            jp_game_count=80,
        )
        self.variation = ConsoleVariation.objects.create(
            console=self.console,
            name="PS5 Digital Edition",
            release_date=date(2020, 11, 12),
            description="Digital-only version of PS5.",
            image_url="https://example.com/ps5digital.jpg"
        )

    def test_console_list(self):
        url = reverse('console-list-create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_console_create(self):
        url = reverse('console-list-create')
        data = {
            "name": "Xbox Series X",
            "manufacturer": Console.ConsoleManufacturer.MICROSOFT,
            "media_format": Console.MediaFormat.DISC,
            "max_resolution_width": 3840,
            "max_resolution_height": 2160,
            "release_date": "2020-11-10",
            "generation": 9,
            "handheld": False,
            "online_capabilities": True,
            "region_lock": False,
            "description": "Microsoft's ninth-generation console.",
            "image_url": "https://example.com/xboxseriesx.jpg",
            "na_game_count": 90,
            "eu_game_count": 80,
            "jp_game_count": 70
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Xbox Series X")

    def test_console_variation_list(self):
        url = reverse('console-variation-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_console_variation_create(self):
        url = reverse('console-variation-list')
        data = {
            "console": self.console.id,
            "name": "PS5 Slim",
            "release_date": "2023-11-10",
            "description": "Slim version of PS5.",
            "image_url": "https://example.com/ps5slim.jpg"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "PS5 Slim")

    def test_variations_by_console(self):
        url = reverse('console-variations', kwargs={'console_id': self.console.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "PS5 Digital Edition")
