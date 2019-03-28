from django.shortcuts import render, render_to_response
from django.http import HttpResponse, Http404
from .models import Todo
from .serializers import TodoSerializer
from rest_framework import viewsets
from rest_framework import filters


class TodoList(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    # Refer to https://www.django-rest-framework.org/api-guide/filtering/#orderingfilter
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('priority', )
