"""
URL configuration for recipe project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import SimpleRouter
from rest_framework.authtoken.views import obtain_auth_token
from app import views
from django.conf.urls.static import static
from django.conf import settings
routers=SimpleRouter()
routers.register('recipe',views.List)
routers.register('users',views.Userview)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(routers.urls)),
    path('api-token-auth/',obtain_auth_token),
    path('search/',views.Search.as_view()),
    path('cuisine',views.Filterbycuisine.as_view()),
    path('meal',views.Filterbymealtype.as_view()),
    path('ingredients',views.Filterbyingredients.as_view()),
    path('create/',views.Create_review.as_view()),
    path('allreviews/<int:pk>',views.Reviewdetails.as_view()),
    path('logout',views.LogoutView.as_view()),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)