from rest_framework import serializers
from news.models import Article, Category

class ArticleSerializer(serializers.ModelSerializer):
	category = serializers.SlugRelatedField(
		read_only=True,
		slug_field='name'
	)
	class Meta:
		model = Article
		fields = ('id', 'category', 'title', 'slug', 'cover', 'height_field', 'width_field', 'content', 'publication_date', 'visible', 'tags', 'likes')

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ('id', 'name')
