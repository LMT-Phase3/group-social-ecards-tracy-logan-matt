from rest_framework import serializers
from .models import User, Card

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'pk',
            'username',
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
        ]

        