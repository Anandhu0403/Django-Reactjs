from rest_framework import serializers
from django.contrib.auth.models import User

from app.models import Recipe,Review
class Recipeserializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    image_url = serializers.SerializerMethodField('get_image_url')
    class Meta:
        model=Recipe
        fields=['id','image','recipe_name','ingredients','instructions','meal_type','cusine','created','updated','image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        photo_url = obj.image.url
        return request.build_absolute_uri(photo_url)

class Userserializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','password','email','first_name','last_name']

    def create(self, validated_data):
        username=validated_data['username']
        password=validated_data['password']
        email=validated_data['email']
        first_name=validated_data['first_name']
        last_name=validated_data['last_name']
        b=User.objects.create_user(username=username,password=password,email=email,first_name=first_name,last_name=last_name)
        return b

class ReviewSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField('get_user')
    recipe=serializers.SerializerMethodField('get_recipe')
    date=serializers.SerializerMethodField('get_date')
    class Meta:
        model=Review
        fields=['recipe_name','comment','rating','created','name','recipe','user','date']
    def get_user(self,obj):
        return obj.user.username
    def get_recipe(self,obj):
        return obj.recipe_name.recipe_name
    def get_date(self,obj):
        return obj.created.date()