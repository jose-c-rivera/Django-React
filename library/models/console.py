from django.db import models
from django.utils.text import slugify


class Console(models.Model):

    class ConsoleManufacturer(models.TextChoices):
        NONE = 'NO', 'None'
        AMAZON = 'AZ', 'Amazon'
        ANBERNIC = 'AN', 'Anbernic'
        APPLE = 'AP', 'Apple'
        ATARI = 'AT', 'Atari'
        BANDAI = 'BD', 'Bandai'
        COLECO = 'CL', 'Coleco'
        INTELLIVISION = 'IN', 'Intellivision Entertainment'
        LOGITECH = 'LG', 'Logitech'
        MATTEL = 'MT', 'Mattel'
        MICROSOFT = 'MS', 'Microsoft'
        NEC = 'NC', 'NEC'
        NINTENDO = 'NT', 'Nintendo'
        NUBIA = 'NB', 'Nubia'
        OUYA = 'OY', 'Ouya'
        PANASONIC = 'PN', 'Panasonic'
        PHILIPS = 'PH', 'Philips'
        SEGA = 'SG', 'Sega'
        SNK = 'SN', 'SNK'
        SONY = 'SY', 'Sony'
        TIGER = 'TG', 'Tiger Electronics'
        VALVE = 'VL', 'Valve'

    class MediaFormat(models.TextChoices):
        NONE = 'NO', 'None'
        CARTRIDGE = 'CT', 'Cartridge'
        DISC = 'DS', 'Optical Disc (CD/DVD/BD)'
        DIGITAL = 'DG', 'Digital Only'
        GAME_CARD = 'GC', 'Game Card'
        CASSETTE = 'CS', 'Cassette Tape'
        MINI_DISC = 'MD', 'MiniDisc'
        HU_CARD = 'HC', 'HuCard'
        UMD = 'UM', 'UMD (PSP)'
        SD_CARD = 'SD', 'SD Card'
        INTERNAL = 'IN', 'Internal Storage'
        FLASH_MEMORY = 'FM', 'Flash Memory'
        MEMORY_CARD = 'MC', 'Memory Card'
        CLOUD = 'CL', 'Cloud Streaming'


    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    manufacturer = models.CharField(
        max_length=2,
        choices=ConsoleManufacturer.choices,
        default=ConsoleManufacturer.NONE,
    )

    media_format = models.CharField(
        max_length=2,
        choices=MediaFormat.choices,
        default=MediaFormat.NONE,
    )

    max_resolution_width = models.PositiveIntegerField(null=True, blank=True)
    max_resolution_height = models.PositiveIntegerField(null=True, blank=True)
    release_date = models.DateField(null=True, blank=True)
    discontinued_date = models.DateField(null=True, blank=True)
    generation = models.PositiveIntegerField(null=True, blank=True)  # 8 for PS4, Switch, etc.
    handheld = models.BooleanField(default=False)
    online_capabilities = models.BooleanField(default=False)
    region_lock = models.BooleanField(default=False)
    description = models.TextField(blank=True)  # Encyclopedia-style summary
    image_url = models.URLField(blank=True, help_text="Link to an image of the console")

    na_game_count = models.PositiveIntegerField(default=0, verbose_name="North America game count")
    eu_game_count = models.PositiveIntegerField(default=0, verbose_name="Europe game count")
    jp_game_count = models.PositiveIntegerField(default=0, verbose_name="Japan game count")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
class ConsoleVariation(models.Model):
    console = models.ForeignKey(Console, related_name='variations', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)  # e.g., 'Slim', 'Famicom'
    release_date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)