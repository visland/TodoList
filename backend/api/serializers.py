from rest_framework import serializers
from api.models import Todo

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ('id','title', 'content', 'finished', 'priority')
