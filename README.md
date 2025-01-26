# Neural Network Visualizer

A tool to visualize the internal structure and activation paths of logic gate neural networks. This project aims to make neural networks more interpretable and user-friendly by providing an interactive graph-based visualization of their operations.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Overview

**Neural Network Visualizer** is an interactive web-based tool designed to:
1. Visualize the structure and connections within a trained logic gate neural network.
2. Demonstrate the forward pass of the model on user-provided input images.
3. Highlight the activation paths and provide insights into how the model arrives at a classification.

This project was developed as part of **SwampHacks X** (2025), a 24-hour hackathon hosted at the University of Florida.

## Features

- Upload trained model files (`.pth` format).
- Generate a graph-based visualization of nodes (neurons) and edges (connections).
- Display activation paths for user-uploaded images during the forward pass.
- Support for real-time interaction with the visualization (zoom, filter, highlight).
- Educational insights on neural network operations.

## Getting Started

### Prerequisites

To run this project locally, you will need:

- Python 3.9+ installed
- Node.js and npm installed
- A modern web browser (Google Chrome, Firefox, etc.)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/matheusmaldaner/DiffLogicVisualizer.git
   cd logic-gate-visualizer
   ```

2. **Backend Setup (Django):**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Use venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

3. **Frontend Setup (Next.js):**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the Backend:**
   ```bash
   python manage.py runserver
   ```

2. **Start the Frontend:**
   ```bash
   npm run dev
   ```
   
3. Open your browser and navigate to `http://localhost:3000`.

## Technologies Used

- **Backend:** Django, PyTorch (for processing `.pth` files)
- **Frontend:** Next.js, React, D3.js (for visualization)

## Usage

1. Upload your trained neural network model (`.pth` file) through the web interface.
2. Visualize the model's structure and learned connections as an interactive graph.
3. Upload an image to see the activated paths and classification results.
4. Explore different layers and analyze the neural network's decision-making process.

## Future Enhancements

- Add support for more model formats (e.g., TensorFlow, ONNX).
- Enable graph export to PDF or image format.
- Incorporate generative AI for natural language explanations.
- Optimize performance for large models.
- Create a demo mode with preloaded models and images.

## Contributing

While this project was coded for the SwampHacks hackathon, we also welcome contributions from the community! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Commit your changes (`git commit -m "Add a new feature"`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a Pull Request.

## Acknowledgments

- SwampHacks X organizers and sponsors
- [MLH](https://mlh.io) for hackathon guidance
