from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import torch
from PIL import Image

import os

from .difflogic_setup import (
    load_difflogic_model,
    store_user_model,
    choose_model_path,
    process_image_with_model,
    get_model_info
)

class ModelAPIView(APIView):
    """
    1) If POST includes a .pth under 'model_file', store as user_model.
       Return JSON of the loaded model's layers/edges.
    2) Else, read 'model_choice' in request.data to pick one of the builtin models
       or 'user_model'. Return that model's layers/edges in JSON.
    3) If neither is provided, return an error.
    """

    def post(self, request, *args, **kwargs):
        uploaded_file = request.FILES.get('model_file')
        if uploaded_file:
            # Store as user_model.pth, overwriting any existing one
            try:
                path_user_model = store_user_model(uploaded_file)
                model = load_difflogic_model(path_user_model)
                info = get_model_info(model)
                return Response({
                    "message": "User model uploaded and loaded successfully.",
                    "model_choice": "user_model",
                    "model_info": info
                }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # No file uploaded => must specify which model to load
        model_choice = request.data.get('model_choice')
        if not model_choice:
            return Response({
                "error": "No 'model_file' uploaded and no 'model_choice' provided."
            }, status=status.HTTP_400_BAD_REQUEST)

        # Attempt to load the chosen model
        try:
            path = choose_model_path(model_choice)
            model = load_difflogic_model(path)
            info = get_model_info(model)
            return Response({
                "message": f"Model '{model_choice}' loaded successfully.",
                "model_choice": model_choice,
                "model_info": info
            }, status=status.HTTP_200_OK)
        except FileNotFoundError as fe:
            return Response({"error": str(fe)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ImageAPIView(APIView):
    """
    Expects:
    - 'image_file': The image to process.
    - 'model_choice': Which model to load (model_001, model_002, model_003, or user_model).
      If missing, return an error. We do not fallback to any default.
    Then returns the updated model's info (or whatever JSON you need).
    """

    def post(self, request, *args, **kwargs):
        image_file = request.FILES.get('image_file')
        if not image_file:
            return Response({"error": "No 'image_file' provided."}, status=status.HTTP_400_BAD_REQUEST)

        model_choice = request.data.get('model_choice')
        if not model_choice:
            return Response({
                "error": "No 'model_choice' specified. Must be one of model_001, model_002, model_003, or user_model."
            }, status=status.HTTP_400_BAD_REQUEST)

        path = choose_model_path(model_choice)
        model = load_difflogic_model(path)

       
        pil_img = Image.open(image_file).convert('L')
        image_tensor = torch.tensor(list(pil_img.getdata()), dtype=torch.float32)
        # Example for 20x20:
        image_tensor = image_tensor.view(1, 400)

        # Process the image (inference or partial training)
        updated_model = process_image_with_model(model, image_tensor)

        info = get_model_info(updated_model)
        return Response({
            "message": f"Image processed with '{model_choice}'.",
            "model_info": info
        }, status=status.HTTP_200_OK)
