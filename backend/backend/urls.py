from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers 
from api import views 

router = routers.DefaultRouter() 
router.register(r'todos', views.TodoList, 'todo')

urlpatterns = [
    url(r'^', include('todolist.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/',  include(router.urls)),
]
