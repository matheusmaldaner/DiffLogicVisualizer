import os
import torch
import numpy as np
from difflogic import LogicLayer, GroupSum
import difflogic_cuda

MODEL_ROOT = ".../model-training/trained_models/mnist_trained_models"
BUILTIN_MODELS = {"model_001", "model_002", "model_003"}

class DiffLogic(torch.nn.Module):
    def __init__(self, layers_config, output_size, tau=30):
        super(DiffLogic, self).__init__()
        layers = []
        for layer_name, cfg in layers_config.items():
            layer = LogicLayer(
                in_dim=cfg['in_dim'],
                out_dim=cfg['out_dim'],
                device=cfg['device'],
                implementation=cfg['implementation'],
                connections=cfg['connections'],
                grad_factor=cfg['grad_factor']
            )
            layers.append(layer)
        self.logic_layers = torch.nn.Sequential(*layers)
        self.group = GroupSum(k=output_size, tau=tau)

    def forward(self, x):
        device = 'cuda' if torch.cuda.is_available() else 'cpu'
        x = x.to(device)
        logits = self.logic_layers(x)
        group = self.group(logits)
        return group

def load_difflogic_model(path: str) -> DiffLogic:
    """Load a model from .pth and rebuild its layers/connections."""
    checkpoint = torch.load(path, map_location='cuda' if torch.cuda.is_available() else 'cpu')
    cfg = checkpoint['model_config']
    # Recreate the DiffLogic architecture
    model = DiffLogic(
        layers_config=cfg['layers_config'],
        output_size=cfg['output_size'],
        tau=cfg['tau']
    )
    model.load_state_dict(checkpoint['model_state_dict'])
    # Restore connections
    for idx, layer in enumerate(model.logic_layers):
        if isinstance(layer, LogicLayer):
            layer.indices = checkpoint['connections'][idx]
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
        raise FileNotFoundError(f"Unknown model choice '{model_choice}'. Must be one of {BUILTIN_MODELS} or 'user_model'.")

    if not os.path.exists(path):
        raise FileNotFoundError(f"Model file '{path}' does not exist on the server.")
    return path

def process_image_with_model(model: DiffLogic, image_tensor: torch.Tensor) -> DiffLogic:
    """
    Example forward pass or partial training step. 
    Here, we only do inference, but you can add training code if needed.
    """
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    model = model.to(device)
    image_tensor = image_tensor.to(device)
    with torch.no_grad():
        _ = model(image_tensor.unsqueeze(0).float())
    return model

def get_model_info(model: DiffLogic):
    """
    Return a dict of relevant info: shapes of each layer, etc.
    """
    info = {"layers": []}
    for i, layer in enumerate(model.logic_layers):
        if isinstance(layer, LogicLayer):
            layer_info = {
                "layer_index": i,
                "in_dim": layer.in_dim,
                "out_dim": layer.out_dim,
            }
            if layer.indices is not None:
                layer_info["indices_shape"] = layer.indices.shape
            info["layers"].append(layer_info)
    return info
