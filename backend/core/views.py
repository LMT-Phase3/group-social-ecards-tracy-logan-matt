from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from .serializers import UserSerializer, CardSerializer, UserCreateSerializer, FriendSerializer, FavoriteSerializer
from rest_framework.response import Response 
from core.models import Card, User
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination
from project import settings

# Create your views here.
class TestView(APIView):
    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response(data=serializer.data)





class UserCardView(APIView):
    def get(self, request):
        queryset = self.request.user.cards.all().order_by('-updated_date')
        
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(queryset, request, view=self)
        serializer = CardSerializer(page, many=True, context={
            'request': request
        })
        return paginator.get_paginated_response(serializer.data)

class IsUserOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class CardDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = CardSerializer
    permission_classes = (permissions.IsAuthenticated, IsUserOrReadOnly)

    def get_queryset(self):
        return Card.objects.all().order_by('-updated_date')
        # return self.request.user.cards.all()
    
    

class CardListView(ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Card.objects.all().order_by('-updated_date')
    serializer_class = CardSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserListView(APIView):
    def get(self, request):
        queryset = User.objects.all()
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(queryset, request, view=self)
        serializer = UserSerializer(page, many=True, context={
            'request': request
        })
        return paginator.get_paginated_response(serializer.data)


# class FollowersView(APIView):
#     def get(self,request):
#         queryset = self.request.user()
#         paginator = PageNumberPagination()
#         page = paginator.paginate_queryset(queryset, request, view=self)
#         serializer = UserCreateSerializer(page, many=True, context={
#             'request':request
#         })
#         return paginator.get_paginated_response(serializer.data)


class UserDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserCreateSerializer
    # permission_classes = (permissions.IsAuthenticated, IsUserOrReadOnly)
    lookup_field = 'username'
    def get_queryset(self):
        return User.objects.all()


class CardsForUserView(APIView):
    def get(self,request, username):
        user = get_object_or_404(User, username=username)
        queryset = user.cards.all().order_by('-updated_date')
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(queryset, request, view=self)
        serializer = CardSerializer(page, many=True, context={
            'request': request
        })

        return paginator.get_paginated_response(data=serializer.data)


class FriendsCardsView(ListAPIView):
    
    serializer_class = CardSerializer

    def get_queryset(self):
        current_user = self.request.user
        return Card.objects.filter(user__followers=current_user).order_by('-updated_date')


class FriendsListView(APIView):
    
    def get(self, request):
        user = self.request.user
        serializer = FriendSerializer(user)
        return Response(serializer.data)

    def post(self, request):
        new_friend_username = request.data.get('username')
        
        # case 1: no username sent
        if not new_friend_username:
            raise ParseError("No username provided")
        
        # case 2: your own username sent
        if new_friend_username == self.request.user.username:
            raise ParseError("You cannot be your own friend :(")
        
        # case 3: bad username sent
        user = User.objects.filter(username=new_friend_username).first()
        if user is None:
            raise ParseError(f"User {new_friend_username} does not exist")
        
        # case 4: good username sent
        self.request.user.friends.add(user)
        
        serializer = FriendSerializer(self.request.user)
        return Response(serializer.data)





    def delete(self, request):
        delete_friend_username = request.data.get('username')

        if not delete_friend_username:
            raise ParseError("No username provided")

        user = User.objects.filter(username=delete_friend_username).first()
        if user is None:
            raise ParseError(f"User {delete_friend_username} does not exist")

        self.request.user.friends.remove(user)
        
        serializer = FriendSerializer(self.request.user)
        return Response(serializer.data)

        
class FriendsView(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        current_user = self.request.user
        return User.objects.filter(followers__username=current_user)
       

class FavoritesListView(APIView):
    
    def get(self, request):
        user = self.request.user
        serializer = FavoriteSerializer(user)
        return Response(serializer.data)

    def post(self, request):
        new_favorite_card = request.data.get('title')
        card = Card.objects.filter(title=new_favorite_card).first()

        self.request.user.favorites.add(card)
        
        serializer = FavoriteSerializer(self.request.user)
        return Response(serializer.data)

    def delete(self, request):
        new_favorite_card = request.data.get('title')
        card = Card.objects.filter(title=new_favorite_card).first()

        self.request.user.favorites.remove(card)
        
        serializer = FavoriteSerializer(self.request.user)
        return Response(serializer.data)


class FavoritesView(ListAPIView):
    serializer_class = CardSerializer

    def get_queryset(self):
        current_user = self.request.user
        return Card.objects.filter(favorite_cards__username=current_user)


class FollowersView(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        current_user = self.request.user
        return User.objects.filter(friends__username=current_user)


class LikeCountView(APIView):
    

    def get(self, request, format=None):
        like_count = User.objects.favorites.count()
        content = {'like_count': like_count}
        return Response(content)