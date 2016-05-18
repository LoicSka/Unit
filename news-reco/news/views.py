from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from news.models import Article, Category
from news.serializers import ArticleSerializer, CategorySerializer
from django.contrib.auth.models import User
from usersessions.serializers import UserSerializer
from django.contrib.auth import get_user
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
import redis

r= redis.StrictRedis(host='localhost', port=6379, db=0)

class Index(APIView):
	def get(self, request, format=None):
		articles = Article.objects.all()
		serializer = ArticleSerializer(articles, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = ArticleSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		
class Show(APIView):
	def get_object(self, slug):
		try:
			return Article.objects.get(slug=slug)
		except Article.DoesNotExist:
			raise Http404

	def get(self, request, slug, format=None):
		article = self.get_object(slug=slug)
		user = request.user
		id = user.id
		if (not(r.hexists(id, article.id))):
			r.hset(id, article.id, 1)
		serializer = ArticleSerializer(article)
		return Response(serializer.data)

	def put(self, request, slug, format=None):
		article = self.get_object(slug)
		serializer = ArticleSerializer(article, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, slug, format=None):
		article = self.get_object(slug)
		article.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class Categories(APIView):
	def get(self, request, category, format=None):
		if (category == 'all'):
			articles = Article.objects.all()
		else:
			cat = Category.objects.get(name=category)
			articles = Article.objects.filter(category=cat.id)
		serializer = ArticleSerializer(articles, many=True)
		return Response(serializer.data)

class Rate(APIView):
	def post(self, request, id, format=None):
		slug = request.data.get('slug')
		article = Article.objects.get(slug=str(slug))
		if (r.hexists(id, article.id) and int(r.hget(id, article.id)) > 1):
			serializer = ArticleSerializer(article, data={"category": article.category,"title": article.title,"slug": article.slug,"cover": article.cover,"height_field": article.height_field,"width_field": article.width_field,"content": article.content,"publication_date": article.publication_date,"visible": article.visible,"tags": article.tags,"likes": article.likes})
		else:
			r.hset(id, article.id, 2)
			likes = request.data.get('likes')
			serializer = ArticleSerializer(article, data={"category": article.category,"title": article.title,"slug": article.slug,"cover": article.cover,"height_field": article.height_field,"width_field": article.width_field,"content": article.content,"publication_date": article.publication_date,"visible": article.visible,"tags": article.tags,"likes": article.likes + int(likes)})
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def api_root(request, format=None):
	return response({
		'articles': reverse('index', request=request, format=format)
		})

