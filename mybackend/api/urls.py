from django.urls import path
from .views import HelloWorldAPIView, ModelAPIView

urlpatterns = [
    path('hello/', HelloWorldAPIView.as_view(), name='hello'),
    path('difflogic-models/', ModelAPIView.as_view(), name='model')
]
