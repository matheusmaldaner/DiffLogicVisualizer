from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import torch
from PIL import Image
import io

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
    2) Else, read 'model_choice' from request.data to pick one of the builtin models
       or 'user_model'. Return that model's layers/edges in JSON.
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

        # No file => must specify which model to load
        model_choice = request.data.get('model_choice')
        if not model_choice:
            return Response({
                "error": "No 'model_file' uploaded and no 'model_choice' provided."
            }, status=status.HTTP_400_BAD_REQUEST)

        # Attempt to load chosen model
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
    def post(self, request, *args, **kwargs):
        image_file = request.FILES.get('image_file')
        if not image_file:
            return Response({"error": "No 'image_file' provided."},
                            status=status.HTTP_400_BAD_REQUEST)

        model_choice = request.data.get('model_choice')
        if not model_choice:
            return Response({
                "error": "No 'model_choice' specified. Must be one of model_001, model_002, model_003, or user_model."
            }, status=status.HTTP_400_BAD_REQUEST)

        # 1. Load the requested model (CPU)
        path = choose_model_path(model_choice)
        model = load_difflogic_model(path)

        # 2. Convert the uploaded image to a flat tensor
        pil_img = Image.open(image_file).convert('L')
        width, height = pil_img.size
        image_tensor = torch.tensor(list(pil_img.getdata()), dtype=torch.float32)

        # 3. (Optional) Resize/check shape. For a 20x20 model:
        if width * height != 400:
            return Response({
                "error": f"Expected 20x20=400 pixels, got {width}x{height}."
            }, status=status.HTTP_400_BAD_REQUEST)

        # 4. Forward pass to get model outputs
        #    Make sure we use [batch_size=1, in_dim=400]
        with torch.no_grad():
            outputs = model(image_tensor.unsqueeze(0))  # shape: [1, 10]
        
        # 5. Determine predicted class (argmax along dimension=1)
        _, predicted_class = torch.max(outputs, dim=1)
        predicted_class = predicted_class.item()

        # 6. (Optional) retrieve model structure info for the response
        info = get_model_info(model)

        return Response({
            "message": f"Image processed with '{model_choice}' on CPU.",
            "predicted_class": predicted_class,  # <--- The top-1 predicted class
            "model_info": info
        }, status=status.HTTP_200_OK)
