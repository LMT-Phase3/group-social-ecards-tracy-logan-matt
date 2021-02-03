from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer, CardSerializer
from rest_framework.response import Response 
from core.models import Card, User
from rest_framework.generics import RetrieveUpdateDestroyAPIView

# Create your views here.
class TestView(APIView):
    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response(data=serializer.data)


class CardListView(APIView):
    def get(self, request):
        cards = Card.objects.all()
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)


class UserCardView(APIView):
    def get(self, request):
        cards = self.request.user.cards.all()
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)


class CardDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = CardSerializer

    def get_queryset(self):
        # return Card.objects.all()
        return self.request.user.cards.all()
    
    
