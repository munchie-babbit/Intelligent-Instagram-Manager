
from rest_framework import viewsets

from .models import Profile, Post
from .serializers import ProfileSerializer, PostSerializer

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()



