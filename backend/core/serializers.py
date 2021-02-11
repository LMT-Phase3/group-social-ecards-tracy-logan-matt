from rest_framework import serializers
from .models import User, Card

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'pk',
            'username',
            'email',
            "first_name",
            'last_name',
            'avatar'
        ]


class CardSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(read_only=True, slug_field='username')
    class Meta:
        model = Card
        fields = [
            'user',
            'pk',
            'background',
            'font',
            'border',
            'title',
            'image_front',
            'image_back',
            'message',
            'border_type',
            'font_color',
            'justify',
        ]

# Add 'likers' as a field on model Card in serializer and 'comments' potentially
        
class UserCreateSerializer(serializers.ModelSerializer):
    friends = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = User
        fields = [
            'pk',
            'username',
            "first_name",
            'last_name',
            'friends',
            "about",
            "avatar"
        ]
# Add 'followers' as a field in serializer

class FriendSerializer(serializers.ModelSerializer):
    friends = serializers.StringRelatedField(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = [
            'friends'
        ]


class FavoriteSerializer(serializers.ModelSerializer):
    favorites = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = Card
        fields = [
            'favorites'
        ]
    