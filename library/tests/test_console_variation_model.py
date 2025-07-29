from django.test import TestCase
from library.models.console import Console, ConsoleVariation
from datetime import date

class ConsoleVariationModelTest(TestCase):
    def setUp(self):
        self.console = Console.objects.create(
            name="Super Nintendo Entertainment System",
            manufacturer=Console.ConsoleManufacturer.NINTENDO,
            media_format=Console.MediaFormat.CARTRIDGE,
            max_resolution_width=256,
            max_resolution_height=224,
            release_date=date(1990, 11, 21),
            generation=4,
            handheld=False,
            online_capabilities=False,
            region_lock=True,
            description="Nintendo's 16-bit home video game console.",
            image_url="https://example.com/snes.jpg",
            na_game_count=700,
            eu_game_count=500,
            jp_game_count=1400,
        )
        self.variation = ConsoleVariation.objects.create(
            console=self.console,
            name="Super Famicom",
            release_date=date(1990, 11, 21),
            description="Japanese version of the SNES.",
            image_url="https://example.com/superfamicom.jpg"
        )

    def test_variation_creation(self):
        self.assertEqual(self.variation.console, self.console)
        self.assertEqual(self.variation.name, "Super Famicom")
        self.assertEqual(self.variation.release_date, date(1990, 11, 21))
        self.assertEqual(self.variation.description, "Japanese version of the SNES.")
        self.assertEqual(self.variation.image_url, "https://example.com/superfamicom.jpg")

    def test_console_variation_relationship(self):
        self.assertIn(self.variation, self.console.variations.all())
