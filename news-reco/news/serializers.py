from rest_framework import serializers
from news.models import Article, Category

class ArticleSerializer(serializers.ModelSerializer):
	class Meta:
		model = Article
		fields = ('id', 'category', 'title', 'slug', 'cover', 'height_field', 'width_field', 'content', 'publication_date', 'visible', 'tags')

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ('id', 'name')

