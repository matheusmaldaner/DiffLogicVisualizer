<div align="center">

<!-- Replace with your own banner/logo path -->
<img src="banner.svg" alt="DiffLogic Visualizer Logo">

*Interactive visualization of Differentiable Logic Gate Networks (DiffLogic) — structure, activations, and decision paths.*

<!-- Badges (edit links as needed) -->
![Python](https://img.shields.io/badge/python-3.9%2B-orange)
[![Backend](https://img.shields.io/badge/backend-Django-0C4B33?logo=django&logoColor=white)](https://www.djangoproject.com/)
[![ML](https://img.shields.io/badge/ML-PyTorch-EE4C2C?logo=pytorch&logoColor=white)](https://pytorch.org/)
[![Frontend](https://img.shields.io/badge/frontend-Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
<a href="https://devpost.com/software/neural-network-visualizer">
  <img alt="🏆 SwampHacks X - Best AI Hack" src="https://img.shields.io/badge/🏆%20SwampHacks%20X-Best%20AI%20Hack-yellow">
</a>
</div>

---

### 🎥 Watch the Demo

<div align="center">
  <a href="https://www.youtube.com/watch?v=QbDwbOWFjFY" target="_blank">
    <img
      src="https://i.ytimg.com/vi/QbDwbOWFjFY/hqdefault.jpg"
      alt="Watch the demo video"
      width="600"
      style="border-radius: 8px;"
    />
  </a>

  <br><br>

  <a href="https://www.youtube.com/watch?v=QbDwbOWFjFY" target="_blank">
    <img
      src="https://img.shields.io/badge/%20Watch%20Demo%20Video-red?logo=youtube"
      alt="Watch on YouTube"
    />
  </a>
</div>

---

### 🔎 Overview

**DiffLogic Visualizer** is an interactive web-based tool designed to make **Differentiable Logic Gate Networks (DiffLogic)** more interpretable by visualizing:

1. The **structure and connectivity** of a trained DiffLogic network.
2. The **forward pass** on user-provided input images.
3. The **activation paths** that explain how the model arrives at a classification.

<div align="center">
  <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWY5b2I4MW5pZjh3cmRnY3Z1NTE5a3o4emdtaWVyaGFyc3poajFtcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pvQdvmsOrx9Xt3joHZ/giphy.gif" alt="Workflow" style="width:800px; height:auto; display:block; margin:0; padding:0;">
</div>


## Quick Start

You have to run the backend and frontend in **two** separate terminal sessions.

### (1) 🧰 Prerequisites

- Python **3.9+**
- Node.js + npm
- A modern browser (Chrome / Firefox)

### (2) 🖥️ Backend Setup (Django)

```bash
git clone https://github.com/matheusmaldaner/DiffLogicVisualizer.git
cd logic-gate-visualizer
cd backend

python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Start the backend:

```bash
python manage.py runserver
```

### (3) 🪶 Frontend Setup (Next.js)

In a new terminal (while the backend is running):

```bash
cd frontend
npm install
npm run dev
```

Open: `http://localhost:3000`

## 🧩 Tech Stack

| Component   | Technology |
| ----------- | ---------- |
| 🧠 Backend  | Django, PyTorch |
| 🖥️ Frontend | Next.js, React |
| 📈 Visualization | D3.js |


## 🧭 Usage

1. Upload a trained DiffLogic model (`.pth`) in the web interface.
2. Visualize the model structure and learned connections as an interactive graph.
3. Upload an image to view activation paths + classification results.
4. Explore layers and analyze the network’s decision-making process.


## 👥 Authors

- Pranav Bhargava — [GitHub](https://github.com/pranavb05)  
- Danush Singla — [GitHub](https://github.com/danushsingla)  
- Kristian O'Connor — [GitHub](https://github.com/kroc99)  
- Matheus Kunzler Maldaner — [GitHub](https://github.com/matheusmaldaner)  
