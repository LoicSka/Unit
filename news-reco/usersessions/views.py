from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from django.contrib.auth.models import User
from usersessions.serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from django.contrib.auth import authenticate
from rest_framework import exceptions
from django.contrib.auth.hashers import make_password


class UserList(APIView):
	def get(self, request, format=None):
		users = User.objects.all()
		serializer = UserSerializer(users, many=True)
		return Response(serializer.data)
		
class Register(APIView):
	def post(self, request, format=None):
		username = request.data.get('username')
		password = make_password(request.data.get('password'))
		email = request.data.get('email')
		user = User(username=username, password=password, email=email)
		serializer = UserSerializer(user, data={'username': username, 'password': password, 'email': email})
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
	def post(self, request, format=None):
		username = request.data.get('username')
		password = request.data.get('password')
		user = authenticate(username=username, password=password)
		serializer = UserSerializer(user)
		if user is not None:
			if user.is_active:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			else:
				raise exceptions.AuthenticationFailed('No such user')
		else:
			raise exceptions.AuthenticationFailed('No such user')
