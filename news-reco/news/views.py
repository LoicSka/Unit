from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from news.models import Article
from news.serializers import ArticleSerializer
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse

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

@api_view(['GET'])
def api_root(request, format=None):
	return response({
		'articles': reverse('index', request=request, format=format)

		})

# def like(request):
# 	return render(request, 'news/show.html')

