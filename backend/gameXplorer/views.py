from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from gameXplorer.models import User
from .serializers import LoginSerializer, SignupSerializer





currentId = None


@api_view(['POST'])
def signup_view(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():

        newId =  request.data.get("userId")

        if User.objects.filter(userId = newId).exists():
            return Response({"message":"User Id already exists - Try New "}, status=409)

        serializer.save()
        return Response({"message": "Signup data saved successfully!"}, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        newId =  request.data.get("userId")
        newPwd = request.data.get("password")

        if User.objects.filter(userId = newId).exists():
            userObj = User.objects.get(userId=newId)

            if (userObj.password == newPwd):
                currentId = newId
                return Response({"message": "Login Successful"}, status=200)
            
            else:
                return Response({"message":"Incorrect password"}, status=409)           
        else:
            return Response({"message":"User ID not found"}, status=409)
    return Response(serializer.errors, status=400)



@api_view(['POST'])
def favourite_view(request):
    pass