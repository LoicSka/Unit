from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from django.views.generic import ListView, DetailView
from .views import Index, Show, Rate, Categories

urlpatterns = [
    url(r'^$', Index.as_view()),
    url(r'^/(?P<slug>[\w-]+)/$', Show.as_view()),
    url(r'^/category/(?P<category>[\w-]+)/$', Categories.as_view()),
    url(r'^/rate/(?P<id>[\w-]+)/$', Rate.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)