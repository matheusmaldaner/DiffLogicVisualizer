from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os

MODEL_DIR = "uploaded_models"
IMAGE_DIR = "uploaded_images"

class ModelAPIView(APIView):

    def post(self, request, *args, **kwargs):
       

    def get(self, request, *args, **kwargs):
        

class ImageAPIView(APIView):

    def post(self, request, *args, **kwargs):  

    def get(self, request, *args, **kwargs):
