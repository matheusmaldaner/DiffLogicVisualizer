from django.urls import path
from .views import ModelAPIView, ImageAPIView


urlpatterns = [
    path('difflogic-models/', ModelAPIView.as_view(), name='model'),
    path('difflogic-images/', ImageAPIView.as_view(), name='image'),
]
