
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from social_media_manager_AI import views

router = routers.DefaultRouter()
router.register(r'profile', views.ProfileView, 'profile')
router.register(r'post', views.PostView, 'post')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
