from .models import Profile, Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("caption", "hashtags", "date", "is_logged_in")

class ProfileSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)

    class Meta:
        fields=("first_name", "last_name", "email", "picture", "posts")


