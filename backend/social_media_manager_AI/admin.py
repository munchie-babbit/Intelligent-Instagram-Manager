from django.contrib import admin
from .models import Profile, Post

class PostAdmin(admin.ModelAdmin):
    list_display = ('caption', 'hashtags', 'date', 'is_logged_in')

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'picture')

admin.site.register(Post, PostAdmin)
admin.site.register(Profile, ProfileAdmin)