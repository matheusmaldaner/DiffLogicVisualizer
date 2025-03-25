import os
import torch
import numpy as np
from .difflogic_cpu import DiffLogic

MODEL_ROOT = "api/trained_models/mnist_trained_models" 
BUILTIN_MODELS = {"model_001", "model_002", "model_003"}

def load_difflogic_model(path: str) -> DiffLogic:

    checkpoint = torch.load(path, map_location='cpu')
    cfg = checkpoint['model_config']


    model = DiffLogic(
        layers_config=cfg['layers_config'],
        output_size=cfg['output_size'],
        tau=cfg['tau']
    )

    model.load_state_dict(checkpoint['model_state_dict'])

    conn_idx = 0
    for layer in model.logic_layers:
        if hasattr(layer, 'indices'):
            layer.indices = checkpoint['connections'][conn_idx]
            conn_idx += 1

    model.eval()
    return model

def store_user_model(uploaded_file) -> str:
    """
    Save an uploaded .pth as user_model.pth, overwriting any previous user model.
    Returns the full path to the saved file.
    """
    os.makedirs(MODEL_ROOT, exist_ok=True)
    user_path = os.path.join(MODEL_ROOT, "user_model.pth")
    with open(user_path, "wb") as f:
        for chunk in uploaded_file.chunks():
            f.write(chunk)
    return user_path

def choose_model_path(model_choice: str) -> str:
    """
    Given a model_choice (model_001, model_002, model_003, or user_model),
    return the .pth path or raise an error if it doesn't exist.
    """
    if model_choice in BUILTIN_MODELS:
        path = os.path.join(MODEL_ROOT, f"{model_choice}.pth")
    elif model_choice == "user_model":
        path = os.path.join(MODEL_ROOT, "user_model.pth")
    else:
        raise FileNotFoundError(f"Unknown model choice '{model_choice}'. "
                                f"Must be one of {BUILTIN_MODELS} or 'user_model'.")

    if not os.path.exists(path):
        raise FileNotFoundError(f"Model file '{path}' does not exist on the server.")
    return path

def process_image_with_model(model: DiffLogic, image_tensor: torch.Tensor) -> DiffLogic:
    """
    Simple forward pass example on CPU.
    """
    model.eval()
    with torch.no_grad():
        _ = model(image_tensor.unsqueeze(0))
    return model

def get_model_info(model: DiffLogic):
    info = {"layers": []}
    for i, layer in enumerate(model.logic_layers):
        layer_info = {
            "layer_index": i,
            "class_name": layer.__class__.__name__,
        }
        if hasattr(layer, "in_dim"):
            layer_info["in_dim"] = layer.in_dim
        if hasattr(layer, "out_dim"):
            layer_info["out_dim"] = layer.out_dim
        if hasattr(layer, "indices"):
            layer_info["indices_shape"] = (
                layer.indices[0].shape, 
                layer.indices[1].shape
            )
        info["layers"].append(layer_info)
    return info