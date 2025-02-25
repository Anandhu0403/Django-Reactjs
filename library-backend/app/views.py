from django.shortcuts import render
from app.models import Book
from app.serializers import Libraryserializers,Userserializer
# Create your views here.
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from django.contrib.auth.models import User


class Library(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,]
    queryset=Book.objects.all()
    serializer_class = Libraryserializers

class SearchView(APIView):
   permission_classes = [IsAuthenticated,]
   def get(self,request):
        query=request.query_params.get('search')
        if query:
            b=Book.objects.filter(Q(title__icontains=query)| Q(language__icontains=query)| Q(author__icontains=query))
            if not b.exists():
                return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)
            book=Libraryserializers(b,many=True,context={"request":request})
            return Response(book.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg':'no results found'},status=status.HTTP_200_OK)

class Filterbytitle(APIView):
    def get(self,request):
        query=request.query_params.get('title')
        if query:
            b=Book.objects.filter(Q(title__icontains=query))
            if not b.exists():
                return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)
            book=Libraryserializers(b,many=True)
            return Response(book.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg':'no results found'},status=status.HTTP_200_OK)


class Filterbyauthor(APIView):
    def get(self,request):
        query=request.query_params.get('author')
        if query:
            b=Book.objects.filter(Q(author__icontains=query))
            if not b.exists():
                return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)
            book=Libraryserializers(b,many=True)
            return Response(book.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg':'no results found'},status=status.HTTP_200_OK)

class Filterbyprice(APIView):
    def get(self,request):
        query=request.query_params.get('price')
        if query:
            b=Book.objects.filter(Q(price__lte=query))
            if not b.exists():
                return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)
            book=Libraryserializers(b,many=True)
            return Response(book.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg':'no results found'},status=status.HTTP_200_OK)


class UserAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = Userserializer

class LogoutView(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self,request):
        self.request.user.auth_token.delete()
        return Response({'msg':'Sucessfully logged out'},status=status.HTTP_200_OK)

