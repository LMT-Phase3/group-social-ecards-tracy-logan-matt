from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer, CardSerializer, UserCreateSerializer
from rest_framework.response import Response 
from core.models import Card, User
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView

# Create your views here.
class TestView(APIView):
    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response(data=serializer.data)



class UserCardView(APIView):
    def get(self, request):
        cards = self.request.user.cards.all().order_by('-created_date')
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)

class IsUserOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class CardDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = CardSerializer
    permission_classes = (permissions.IsAuthenticated, IsUserOrReadOnly)

    def get_queryset(self):
        return Card.objects.all()
        # return self.request.user.cards.all()
    
    

class CardListView(ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class FollowersView(APIView):
    def get(self,request):
        user = self.request.user()
        serializer = UserCreateSerializer(user)


class UserDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserCreateSerializer
    # permission_classes = (permissions.IsAuthenticated, IsUserOrReadOnly)
    lookup_field = 'username'
    def get_queryset(self):
        return User.objects.all()



