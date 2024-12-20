from django.db import models

# Create your models here.

class User(models.Model):
    userId = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    age = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Favourite(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favourites')  # Link to User
    game_id = models.BigIntegerField()  
    game_name = models.CharField(max_length=255) 
    game_screenshots = models.JSONField()  

    def __str__(self):
        return f"{self.game_name} (Favourite of {self.user.name})"
    
