from django.db import models
from django.contrib.auth.models import User

class DropReason(models.TextChoices):
    LOST_INTEREST = 'lost_interest', 'Lost Interest'
    TOO_DIFFICULT = 'too_difficult', 'Too Difficult'
    NOT_FUN = 'not_fun', 'Gameplay Not Fun'
    BUGS = 'bugs', 'Bugs or Technical Issues'
    POOR_STORY = 'poor_story', 'Poor Story/Plot'
    TIME = 'time', 'Time Constraints'
    PREFER_OTHER = 'prefer_other', 'Prefer Other Games'
    OTHER = 'other', 'Other'

class OwnershipStatus(models.TextChoices):
    NONE = 'none', 'None'
    OWNED = 'owned', 'Owned'
    WISHLIST = 'wishlist', 'Wishlist'

class ProgressState(models.TextChoices):
    NOT_STARTED = 'not_started', 'Not Started'
    IN_PROGRESS = 'in_progress', 'In Progress'
    COMPLETED = 'completed', 'Completed'
    DROPPED = 'dropped', 'Dropped'
    N_A = 'n/a', 'N/A'  # For non-backlog games

class GameProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rawg_id = models.BigIntegerField()
    title = models.CharField(max_length=255)
    cover_url = models.URLField(blank=True)

    ownership_status = models.CharField(
        max_length=10,
        choices=OwnershipStatus.choices,
        default=OwnershipStatus.NONE,
    )

    is_in_backlog = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    is_mastered = models.BooleanField(default=False)

    progress = models.CharField(
        max_length=20,
        choices=ProgressState.choices,
        default=ProgressState.NOT_STARTED,
    )

    dropped_reason = models.CharField(
        max_length=30,
        choices=DropReason.choices,
        blank=True,
        null=True,
        help_text="Reason for dropping the game (if progress is 'Dropped')"
    )

    dropped_reason_notes = models.TextField(
        blank=True,
        null=True,
        help_text="Optional additional notes about why the game was dropped"
    )

    notes = models.TextField(blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'rawg_id')

    def __str__(self):
        return f"{self.title} ({self.user.username})"

    def save(self, *args, **kwargs):
        if self.is_mastered:
            self.is_completed = True
        super().save(*args, **kwargs)