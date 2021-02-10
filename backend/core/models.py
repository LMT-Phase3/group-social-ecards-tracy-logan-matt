from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    friends = models.ManyToManyField('User', symmetrical=False, related_name='followers', blank=True)
    avatar = models.CharField(max_length=500, null=True, blank=True)
    about = models.TextField(max_length=5000, null=True, blank=True)
    pass
    def __str__(self):
        return self.username

class Card(models.Model):
    updated_date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='cards')
    background = models.CharField(max_length=100, null=True)
    font = models.CharField(max_length=100, null=True)
    border = models.CharField(max_length=100, null=True)
    title = models.CharField(max_length=100, null=False)
    image_front = models.CharField(max_length=500, null=True)
    image_back = models.CharField(max_length=500, null=True)
    message = models.TextField(max_length=5000, blank=False)
    border_type = models.CharField(max_length=500, default='solid')
    font_color = models.CharField(max_length=500, default='white')
    justify = models.CharField(max_length=500, default='flex-start')



    def __str__(self):
        return self.title
