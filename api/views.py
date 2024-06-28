from django.shortcuts import render
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room


# Create your views here.

# function that handles http req and res.....endpoint at urls
"""
def main(request)
    return HttpResponse('<h1>Hello</h1>')
"""

#returns all the room objects and converts it using the serializer
#preifined rest framework view
class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

