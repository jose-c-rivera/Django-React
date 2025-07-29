from django.test import TestCase
from library.models.console import Console
from django.utils.text import slugify
from datetime import date

class ConsoleModelTest(TestCase):
    def setUp(self):
        self.console = Console.objects.create(
            name="PlayStation 4",
            manufacturer=Console.ConsoleManufacturer.SONY,
            media_format=Console.MediaFormat.DISC,
            max_resolution_width=1920,
            max_resolution_height=1080,
            release_date=date(2013, 11, 15),
            discontinued_date=date(2021, 7, 1),
            generation=8,
            handheld=False,
            online_capabilities=True,
            region_lock=False,
            description="Sony's eighth-generation home video game console.",
            image_url="https://example.com/ps4.jpg",
            na_game_count=1000,
            eu_game_count=900,
            jp_game_count=800,
        )

    def test_console_creation(self):
        self.assertEqual(self.console.name, "PlayStation 4")
        self.assertEqual(self.console.manufacturer, Console.ConsoleManufacturer.SONY)
        self.assertEqual(self.console.media_format, Console.MediaFormat.DISC)
        self.assertEqual(self.console.max_resolution_width, 1920)
        self.assertEqual(self.console.max_resolution_height, 1080)
        self.assertEqual(self.console.release_date, date(2013, 11, 15))
        self.assertEqual(self.console.discontinued_date, date(2021, 7, 1))
        self.assertEqual(self.console.generation, 8)
        self.assertFalse(self.console.handheld)
        self.assertTrue(self.console.online_capabilities)
        self.assertFalse(self.console.region_lock)
        self.assertEqual(self.console.description, "Sony's eighth-generation home video game console.")
        self.assertEqual(self.console.image_url, "https://example.com/ps4.jpg")
        self.assertEqual(self.console.na_game_count, 1000)
        self.assertEqual(self.console.eu_game_count, 900)
        self.assertEqual(self.console.jp_game_count, 800)

    def test_slug_is_created_on_save(self):
        self.assertEqual(self.console.slug, slugify(self.console.name))

    def test_str_method(self):
        self.assertEqual(str(self.console), self.console.name)
