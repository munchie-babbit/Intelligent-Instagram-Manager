from django.db import models

class Post(models.Model):
    caption = models.CharField(max_length=1000)
    hashtags = models.CharField(max_length=1000)
    date = models.DateField()
    is_logged_in = models.BooleanField(default=False)

    def _str_(self):
        return self.date
class Profile(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    picture = models.CharField(max_length=600)
    access_token = models.CharField(max_length=100, default="")
    posts = models.ForeignKey(Post, on_delete=models.CASCADE, default=None)

    def _str_(self):
        return self.first_name
    
    
    




