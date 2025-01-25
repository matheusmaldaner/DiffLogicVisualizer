from django.urls import path
from .views import HelloWorldAPIView, ModelAPIView

urlpatterns = [
    path('difflogic-models/', ModelAPIView.as_view(), name='model')
]
