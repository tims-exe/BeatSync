from django.urls import path
from .views import RoomView

urlpatterns = [
    path('room', RoomView.as_view())     # calls the main function inside views of "api" at the given endpoint 
]