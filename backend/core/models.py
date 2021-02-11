from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    friends = models.ManyToManyField('User', symmetrical=False, related_name='followers', blank=True)
    avatar = models.CharField(max_length=500, null=True, blank=True)
    about = models.TextField(max_length=5000, null=True, blank=True)
    favorites = models.ManyToManyField('Card', related_name='favorite_cards', blank=True)

    # call related_name something like "likers" since it refers to users who have favorited that card 
  
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



#create a method on the card model that is a count of likers ... this would be available in a card 
# view as card.likers

#     likers = get all users who have this card in favorites 
# same thing for followers ... get card.followers and calc count of followers
# for comments have card.comments which has all comments for that card
# add card.likers, user.followers, and card.comments to serializer

# class Comment(models.Model):
#     created_date = models.DateTimeField(auto_now_add=True)
#     card = models.ForeignKey('Card', on_delete=models.CASCADE, related_name='comments')
#     user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='user_comments')
#     body = models.CharField(max_length=250, null=True, blank=True)

#     def __str__(self):
#         return self.body

