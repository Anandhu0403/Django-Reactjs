from django.contrib import admin

# Register your models here.
from app.models import Recipe,Review
admin.site.register(Recipe)
admin.site.register(Review)