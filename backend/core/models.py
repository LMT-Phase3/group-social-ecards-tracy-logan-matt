from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    friends = models.ManyToManyField('User', symmetrical=False, related_name='followers', null=True, blank=True)
    pass
    def __str__(self):
        return self.username

class Card(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    background = models.CharField(max_length=100, null=True)
    font = models.CharField(max_length=100, null=True)
    border = models.CharField(max_length=100, null=True)
    title = models.CharField(max_length=100, null=False)
    image_front = models.CharField(max_length=500, null=True)
    image_back = models.CharField(max_length=500, null=True)
    message = models.TextField(max_length=5000, blank=False)


    def __str__(self):
        return self.title
