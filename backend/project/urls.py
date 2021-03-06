"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import include, path
from core import views
from core import views as core_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/test/', views.TestView.as_view()),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('api/cards/', core_views.CardListView.as_view(), name='card-list'),
    path('api/user-cards/', core_views.UserCardView.as_view(), name='user-card-list'),
    path('api/card-detail/<int:pk>/', core_views.CardDetailView.as_view(), name='card-detail'),
    path('api/users/', core_views.UserListView.as_view(), name='user-list'),
    path('api/users-detail/<username>/', core_views.UserDetailView.as_view(), name='user-list'),
    path('api/users/<username>/cards/', core_views.CardsForUserView.as_view()),
    path('api/friends-cards/', core_views.FriendsCardsView.as_view()),
    path('api/my-friends/', core_views.FriendsListView.as_view()),
    path('api/user-friends/', core_views.FriendsView.as_view()),
    path('api/my-favorites/', core_views.FavoritesListView.as_view()),
    path('api/user-favorites/', core_views.FavoritesView.as_view()),
    path('api/user-followers/', core_views.FollowersView.as_view()),
    
    
   
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),

        # For django versions before 2.0:
        # url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
