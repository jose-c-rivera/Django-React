import json
from pathlib import Path
from django.utils.text import slugify
from django.core.management.base import BaseCommand
from library.models.console import Console  # Adjust if in a different module


class Command(BaseCommand):
    help = "Imports consoles from JSON"

    def handle(self, *args, **kwargs):
        json_path = Path("complete_console_data_full.json")
        if not json_path.exists():
            self.stderr.write(f"File {json_path} not found.")
            return

        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        created, skipped = 0, 0
        for entry in data:
            slug = entry.get("slug") or slugify(entry["name"])

            if Console.objects.filter(slug=slug).exists():
                self.stdout.write(f"Skipping existing console: {slug}")
                skipped += 1
                continue

            Console.objects.create(
                name=entry["name"],
                slug=slug,
                manufacturer=entry["manufacturer"],
                media_format=entry["media_format"],
                max_resolution_width=entry.get("max_resolution_width"),
                max_resolution_height=entry.get("max_resolution_height"),
                release_date=entry.get("release_date") or None,
                discontinued_date=entry.get("discontinued_date") or None,
                generation=entry.get("generation"),
                handheld=entry.get("handheld", False),
                online_capabilities=entry.get("online_capabilities", False),
                region_lock=entry.get("region_lock", False),
                description=entry.get("description", ""),
                image_url=entry.get("image_url", ""),
                na_game_count=entry.get("na_game_count", 0),
                eu_game_count=entry.get("eu_game_count", 0),
                jp_game_count=entry.get("jp_game_count", 0),
            )
            created += 1

        self.stdout.write(self.style.SUCCESS(f"Import complete. Created: {created}, Skipped: {skipped}"))
