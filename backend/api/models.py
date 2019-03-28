from django.db import models


class Todo(models.Model):
    # Refer to https://docs.djangoproject.com/en/1.8/ref/models/fields/#choices
    # for the best practice of defining `choices`.
    HIGH_PRI = 0
    MID_PRI = 1
    LOW_PRI = 2
    # The first element in each tuple is the actual value to be set on the model,
    # and the second element is the human-readable name. By making the "actual
    # value" as an integer, we will be able to sort them in views.py.
    # Refer to https://docs.djangoproject.com/en/1.8/ref/models/instances/#django.db.models.Model.get_FOO_display
    # for displaying the second element, human-readale name.
    PRIORITY_CHOICES = (
        (HIGH_PRI, 'Urgent'),
        (MID_PRI, 'Normal'),
        (LOW_PRI, 'Low Pri'),
    )
    title = models.CharField(max_length=64)
    content = models.CharField(max_length=256)
    finished = models.BooleanField(default=False)
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=MID_PRI)