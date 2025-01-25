import torch
from torchvision import transforms, datasets
from torch.utils.data import DataLoader
from utils.mnist_dataset import MNISTRemoveBorderTransform

# defines the dataset loader function
def get_dataset(dataset_name, batch_size=64, data_dir='./data', bpp=8, crop=None):
    """
    loads and prepares the specified dataset with preprocessing and returns data loaders.

    args:
        dataset_name (str): name of the dataset ('mnist', 'fashion_mnist').
        batch_size (int): size of batches for data loading.
        data_dir (str): path to store or load dataset files.
        bpp (int): bits per pixel for data transformation.
        crop (tuple): cropping dimensions (width, height) or none to skip cropping.

    returns:
        tuple: train and validation data loaders, input dimension, output dimension.
    """
    # defines constants and transformations
    max_value = (2 ** bpp) - 1
    crop_transform = (
        [transforms.Lambda(lambda img: img.crop(((img.size[0] - crop[0]) / 2, 
                                                (img.size[1] - crop[1]) / 2, 
                                                (img.size[0] + crop[0]) / 2, 
                                                (img.size[1] + crop[1]) / 2)))]
        if crop else []
    )

    transform_pipeline = transforms.Compose(
        crop_transform + [
            transforms.Grayscale(num_output_channels=1),  # converts to grayscale
            transforms.ToTensor(),  # converts image to tensor
            transforms.Lambda(lambda x: (x * max_value + 0.5).to(torch.uint8)),  # scales and converts to uint8
            transforms.Lambda(lambda x: torch.tensor(
                [
                    [int(bit) for bit in f'{int(pixel.item()):0{bpp}b}'] 
                    for pixel in x.flatten()
                ]).flatten())  # converts pixel values to binary representation
        ]
    )

    # selects and configures the dataset
    if dataset_name.lower() == 'mnist':
        train_dataset = datasets.MNIST(root=data_dir, train=True, download=True, transform=transform_pipeline)
        val_dataset = datasets.MNIST(root=data_dir, train=False, download=True, transform=transform_pipeline)
        input_dim = 28 * 28 * bpp  # calculates input dimension for 28x28 images with bpp bits per pixel
        output_dim = 10  # defines output dimension as 10 classes for classification
    elif dataset_name.lower() == 'fashion_mnist':
        train_dataset = datasets.FashionMNIST(root=data_dir, train=True, download=True, transform=transform_pipeline)
        val_dataset = datasets.FashionMNIST(root=data_dir, train=False, download=True, transform=transform_pipeline)
        input_dim = 28 * 28 * bpp
        output_dim = 10
    else:
        raise ValueError("unsupported dataset. please choose 'mnist' or 'fashion_mnist'.")

    # creates data loaders for batch processing
    train_loader = DataLoader(dataset=train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(dataset=val_dataset, batch_size=batch_size, shuffle=False)

    return train_loader, val_loader, input_dim, output_dim