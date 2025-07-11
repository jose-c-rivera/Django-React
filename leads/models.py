from django.core.validators import RegexValidator
from django.db import models

phone_validator = RegexValidator(
    regex=r'^\+?1?\d{9,15}$',
    message="Phone number must be entered in the format: '+15555555555'. Up to 15 digits allowed."
)

# Create your models here.
class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.CharField(max_length=400)
    phone_number = models.CharField(validators=[phone_validator], max_length=17, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)