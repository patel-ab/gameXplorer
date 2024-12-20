from rest_framework import serializers
from .models import User

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

        
class LoginSerializer(serializers.Serializer):
    userId = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=128)
