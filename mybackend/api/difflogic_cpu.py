import os
import torch
import torch.nn as nn

# ----------------------------------------------------
# Bin Op
# ----------------------------------------------------
def bin_op(a, b, i):
    """
    a, b are Tensors; i is an integer in [0..15], selecting which binary function to apply.
    """
    # Note: This matches your CPU-based logic ops
    if i == 0:
        return torch.zeros_like(a)
    elif i == 1:
        return a * b
    elif i == 2:
        return a - a * b
    elif i == 3:
        return a
    elif i == 4:
        return b - a * b
    elif i == 5:
        return b
    elif i == 6:
        return a + b - 2 * a * b
    elif i == 7:
        return a + b - a * b
    elif i == 8:
        return 1 - (a + b - a * b)
    elif i == 9:
        return 1 - (a + b - 2 * a * b)
    elif i == 10:
        return 1 - b
    elif i == 11:
        return 1 - b + a * b
    elif i == 12:
        return 1 - a
    elif i == 13:
        return 1 - a + a * b
    elif i == 14:
        return 1 - a * b
    elif i == 15:
        return torch.ones_like(a)

def bin_op_s(a, b, i_s):
    """
    Applies a *weighted mixture* of the 16 bin_ops,
    as specified by i_s, which has shape [..., 16].
    """
    device = a.device  # keep on same device as input
    r = torch.zeros_like(a, device=device)
    for i in range(16):
        u = bin_op(a, b, i)
        r = r + i_s[..., i] * u
    return r

# ----------------------------------------------------
# LogicLayer (CPU version)
# ----------------------------------------------------
class LogicLayer(nn.Module):
    def __init__(self, in_dim, out_dim, device="cpu", grad_factor=1.0, implementation="cpu", connections="random"):
        super().__init__()
        self.in_dim = in_dim
        self.out_dim = out_dim
        self.grad_factor = grad_factor
        self.device = "cpu"
        self.implementation = "python"

        # Learned weights for each possible operation (16 ops)
        self.weights = nn.Parameter(torch.randn(out_dim, 16, device=self.device))

        # Connection pattern
        self.connections = connections
        self.indices = self.get_connections(self.connections, self.device)

    def forward(self, x, return_soft_probs=False):
        x = x.to("cpu").float()
        all_soft_probs = []  # We'll store the distribution per layer

        out = x
        for layer in self.logic_layers:
            if isinstance(layer, LogicLayer) and return_soft_probs:
                out, layer_probs = layer(out, return_soft_probs=True)
                all_soft_probs.append(layer_probs)
            else:
                out = layer(out)

        final_output = self.group(out)
        if return_soft_probs:
            return final_output, all_soft_probs
        else:
            return final_output


    



    def get_connections(self, connections, device='cpu'):
        """
        Generate or retrieve the input wiring for each of the out_dim neurons.
        Each neuron picks 2 inputs from the in_dim.
        """
        # ... same code as before ...
        # (not repeated for brevity)
        ...


    def get_connections(self, connections, device='cpu'):
        """
        Generate or retrieve the input wiring for each of the out_dim neurons.
        Each neuron picks 2 inputs from the in_dim.
        """
        assert self.out_dim * 2 >= self.in_dim, (
            f"The number of neurons ({self.out_dim}) must not be smaller than half "
            f"the number of inputs ({self.in_dim})."
        )
        if connections == 'random':
            c = torch.randperm(2 * self.out_dim) % self.in_dim
            c = torch.randperm(self.in_dim)[c]
            c = c.reshape(2, self.out_dim)
            a, b = c[0], c[1]
            return a.to(device), b.to(device)
        elif connections == 'unique':
            # Implementation or your custom unique logic, e.g.:
            # from some_module import get_unique_connections
            # return get_unique_connections(self.in_dim, self.out_dim, device)
            raise NotImplementedError("unique connections not implemented here.")
        else:
            raise ValueError(f"Unknown connections mode: {connections}")

    def extra_repr(self):
        return f"LogicLayer(in_dim={self.in_dim}, out_dim={self.out_dim}, device=CPU)"

# ----------------------------------------------------
# GroupSum
# ----------------------------------------------------
class GroupSum(nn.Module):
    """
    The grouping layer that sums subgroups of the output (k = number of classes).
    """
    def __init__(self, k: int, tau: float = 1.):
        super().__init__()
        self.k = k
        self.tau = tau

    def forward(self, x):
        # x shape: [batch_size, n], with n multiple of k
        assert x.shape[-1] % self.k == 0, f"{x.shape} not divisible by k={self.k}"
        return x.reshape(*x.shape[:-1], self.k, x.shape[-1] // self.k).sum(-1) / self.tau

    def extra_repr(self):
        return f"GroupSum(k={self.k}, tau={self.tau})"

# ----------------------------------------------------
# DiffLogic model
# ----------------------------------------------------
class DiffLogic(nn.Module):
    def __init__(self, layers_config, output_size, tau=30):
        super(DiffLogic, self).__init__()

        layers = []
        for layer_name, cfg in layers_config.items():
            layer = LogicLayer(
                in_dim=cfg['in_dim'],
                out_dim=cfg['out_dim'],
                device='cpu',
                implementation='python',
                connections=cfg['connections'],
                grad_factor=cfg['grad_factor']
            )
            layers.append(layer)

        self.logic_layers = nn.Sequential(*layers)
        self.group = GroupSum(k=output_size, tau=tau)
        self.log_text = ""

  
    def forward(self, x, return_soft_probs=False):
        # a, b => shape [batch_size, out_dim]
        a, b = x[..., self.indices[0]], x[..., self.indices[1]]

        if self.training:
            # Use purely softmax in training
            weight_probs = torch.nn.functional.softmax(self.weights, dim=-1)
            out = bin_op_s(a, b, weight_probs)
            if return_soft_probs:
                return out, weight_probs  # they match the actual usage
            return out
        else:
            # EVAL mode => physically apply "hard gating"
            #  (one-hot picks exactly one gate)
            chosen_indices = self.weights.argmax(dim=-1) 
            # shape [out_dim], each is [0..15]
            one_hot_probs = torch.nn.functional.one_hot(chosen_indices, 16).float()
            out = bin_op_s(a, b, one_hot_probs)  

            if return_soft_probs:
                # We ALSO compute the soft distribution for logging/visualization
                soft_probs = torch.nn.functional.softmax(self.weights, dim=-1)
                return out, soft_probs  
            return out

    # ------------------------------------------------
    #  Checkpoint Save/Load
    # ------------------------------------------------
    def save(self, file_path, model_name='model', model_cfg=None):
        """
        Saves the model state_dict plus relevant architecture info to the specified path.
        """
        os.makedirs(file_path, exist_ok=True)
        checkpoint_data = {
            'model_state_dict': self.state_dict(),
            'connections': [
                layer.indices for layer in self.logic_layers if isinstance(layer, LogicLayer)
            ],
            'model_config': {
                'layers_config': model_cfg['layers_config'],
                'output_size': model_cfg['output_size'],
                'tau': model_cfg['tau'],
                'learning_rate': model_cfg.get('learning_rate', None),
            }
        }
        torch.save(checkpoint_data, os.path.join(file_path, f"{model_name}.pth"))
        self.log_text += f"Model saved to: {os.path.join(file_path, f'{model_name}.pth')}\n"

    def load(self, file_path):
        """
        Load the model from a .pth checkpoint on CPU.
        """
        checkpoint = torch.load(file_path, map_location='cpu')
        self.load_state_dict(checkpoint['model_state_dict'])
        # restore connections
        conn_idx = 0
        for layer in self.logic_layers:
            if isinstance(layer, LogicLayer):
                layer.indices = checkpoint['connections'][conn_idx]
                conn_idx += 1
        self.eval()
        self.log_text += f"Model loaded from: {file_path}\n"
     
    # ------------------------------------------------
    #  Utilities
    # ------------------------------------------------
    def get_accuracy(self, data_loader):
        """
        Compute accuracy over a data_loader (CPU).
        """
        correct = 0
        total = 0
        self.eval()

        with torch.no_grad():
            for batch_inputs, batch_targets in data_loader:
                outputs = self(batch_inputs)
                _, predicted = torch.max(outputs, dim=1)
                total += batch_targets.size(0)
                correct += (predicted == batch_targets).sum().item()

        accuracy = correct / total
        return accuracy

    def get_log(self):
        """
        Retrieve the log text and clear it.
        """
        log_copy = self.log_text
        self.log_text = ""
        return log_copy
