from django.urls import path
from .views import favourite_view, fetchScreenshots, login_view, signup_view

urlpatterns = [
    path('api/signup/', signup_view, name='signup'),
    path('api/login/', login_view, name='login'),
    path('api/favourite/', favourite_view, name='favourite'),
    path('fetch_screenshots/<str:user_id>/', fetchScreenshots, name='fetch_screenshots_user'),
    
]
