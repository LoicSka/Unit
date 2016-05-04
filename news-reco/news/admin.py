from django.contrib import admin
from .models import Category, Article

# Register your models here.

class ArticleAdmin(admin.ModelAdmin):
	list_display = ('title', 'publication_date', 'visible')
	list_filter = ('publication_date', 'visible')
	class Meta:
		model = Article

admin.site.register(Category)
admin.site.register(Article, ArticleAdmin)
