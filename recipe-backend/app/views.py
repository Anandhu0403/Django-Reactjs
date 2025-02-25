from django.db.models import Q
from django.shortcuts import render
from django.contrib.auth.models import User
# Create your views here.
from app.models import Recipe,Review
from app.serializers import Recipeserializer,Userserializer,ReviewSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class List(viewsets.ModelViewSet):
    queryset=Recipe.objects.all()
    serializer_class = Recipeserializer

class Search(APIView):
    def get(self,request):
        query=request.query_params.get('search')
        if query:
          b=Recipe.objects.filter(Q(recipe_name__icontains=query)|Q(ingredients__icontains=query))
          if not b.exists():
              return Response({'msg':'No results found'},status=status.HTTP_200_OK)
          search=Recipeserializer(b,many=True,context={"request":request})
          return Response(search.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg':'No results found'},status=status.HTTP_200_OK)
class Filterbycuisine(APIView):
    def get(self,request):
        query=request.query_params.get('cuisine')
        if query:
            b=Recipe.objects.filter(Q(cusine__icontains=query))
            if not b.exists():
                return Response({'msg':'No results found'},status=status.HTTP_200_OK)
            cuisine=Recipeserializer(b,many=True)
            return Response(cuisine.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg','No results found'},status=status.HTTP_200_OK)
class Filterbymealtype(APIView):
    def get(self,request):
        query=request.query_params.get('meal')
        if query:
            b=Recipe.objects.filter(Q(meal_type__icontains=query))
            if not b.exists():
                return Response({'msg':'No results found'},status=status.HTTP_200_OK)
            meal=Recipeserializer(b,many=True)
            return Response(meal.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg','No results found'},status=status.HTTP_200_OK)

class Filterbyingredients(APIView):
    def get(self,request):
        query=request.query_params.get('ingredients')
        if query:
            b=Recipe.objects.filter(Q(ingredients__icontains=query))
            if not b.exists():
                return Response({'msg':'No results found'},status=status.HTTP_200_OK)
            ingredients=Recipeserializer(b,many=True)
            return Response(ingredients.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg','No results found'},status=status.HTTP_200_OK)
class Userview(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,]
    queryset = User.objects.all()
    serializer_class = Userserializer

class LogoutView(APIView):
    def get(self,request):
        self.request.user.auth_token.delete()
        return Response({'msg':'Sucessfully logged out'},status=status.HTTP_200_OK)


class Create_review(APIView):
    permission_classes = [IsAuthenticated,]
    def post(self,request):
        u=request.user
        r=request.data['id']
        recipe_name=Recipe.objects.get(id=r)
        t=request.data['rating']
        c=request.data['comment']
        re=Review.objects.create(user=u,recipe_name=recipe_name,rating=t,comment=c)
        re.save()
        rcp=ReviewSerializer(re)
        return Response(rcp.data,status=status.HTTP_201_CREATED)

class Reviewdetails(APIView):
    def get(self,request,pk):
        r=Review.objects.filter(recipe_name__id=pk)
        rcp=ReviewSerializer(r,many=True)
        if rcp.data:
            return Response(rcp.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

