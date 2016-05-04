from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserList, Login, Register

urlpatterns = [
	url(r'^$', UserList.as_view()),
	url(r'^login$', Login.as_view()),
	url(r'register$', Register.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)