from rest_framework import serializers
from app.models import Book
from django.contrib.auth.models import User
class Libraryserializers(serializers.ModelSerializer):
    image=serializers.ImageField(required=False)
    image_url=serializers.SerializerMethodField('get_image_url')

    class Meta:
        model=Book
        fields="__all__"
    def get_image_url(self,obj):
        request=self.context.get('request')
        photo_url=obj.image.url
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
        user=User.objects.create_user(username=username,password=password,email=email,first_name=first_name,last_name=last_name)
        return user