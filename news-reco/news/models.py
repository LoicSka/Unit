from __future__ import unicode_literals
from django.core.urlresolvers import reverse
from django.db import models 
from django.db.models.signals import pre_save
from django.utils.text import slugify

# Create your models here.
def upload_location(instance, filename):
	ArticleModel = instance.__class__
	new_id = ArticleModel.objects.order_by("id").last().id + 1
	return "%s/%s" %(new_id, filename)

class Category(models.Model):
	name = models.CharField(max_length=128)

	def __unicode__(self):
		return self.name

	def __str__(self):
		return self.name

class Article(models.Model):
	category = models.ForeignKey(Category)
	title = models.CharField(max_length=200)
	slug = models.SlugField(unique=True)
	cover = models.ImageField(upload_to=upload_location, 
            null=True, 
            blank=True, 
            width_field="width_field", 
            height_field="height_field")
	height_field = models.IntegerField(default=0)
	width_field = models.IntegerField(default=0)
	content = models.TextField()
	publication_date = models.DateTimeField()
	visible = models.BooleanField(default=False)
	tags = models.TextField(default="all")
	likes = models.IntegerField(default=0)

	def __unicode__(self):
		return self.title

	def __str__(self):
		return self.title
    
	def get_absolute_url(self):
	    return reverse("article:detail", kwargs={"slug": self.slug})
	class Meta:
		ordering = ["-publication_date"]

def create_slug(instance, new_slug=None):
	slug = slugify(instance.title)
	if new_slug is not None:
		slug = new_slug
	qs = Article.objects.filter(slug=slug).order_by("-id")
	exists = qs.exists()
	if exists:
		new_slug = "%s-%s" %(slug, qs.first.id)
		return create_slug(instance, new_slug=new_slug)
def pre_save_article_receiver(sender, instance, *args, **kwargs):
	if not instance.slug:
		instance.slug = create_slug(instance)

pre_save.connect(pre_save_article_receiver, sender=Article)