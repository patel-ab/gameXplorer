from django.urls import path
from .views import favourite_view, login_view, signup_view

urlpatterns = [
    path('api/signup/', signup_view, name='signup'),
    path('api/login/', login_view, name='login'),
     path('api/favourite/', favourite_view, name='favourite'),
    
]
