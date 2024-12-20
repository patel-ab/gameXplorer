from django.contrib import admin
from .models import Favourite, User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    
    list_display = ('userId', 'name', 'password', 'age', 'city', 'pincode') 
    
    search_fields = ('name', 'userId')   



@admin.register(Favourite)
class FavouriteAdmin(admin.ModelAdmin):
    list_display = ('userId', 'game_id', 'game_name', 'game_screenshots')  
