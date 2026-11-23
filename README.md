# 🌐 Language Translation Tool

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/API-Google_Translate-4285F4?style=flat-square" alt="Translation API">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License">
</p>

<p align="center">
  <b>Multilingual text translation web app with language detection, copy, and text-to-speech.</b><br>
  <sub>Built with Python, Flask, and translation APIs. Clean, interactive interface.</sub>
</p>

---

## ✨ Features

- Translate text between multiple languages
- Source and target language selection
- Automatic source language detection
- Copy translated text to clipboard
- Text-to-speech functionality
- Clean and user-friendly interface

## 🛠️ Tech Stack

| Component | Technology |
|:----------|:-----------|
| **Backend** | Python, Flask |
| **Translation** | Translation API (Google Translate) |
| **Speech** | Text-to-Speech API |
| **Frontend** | HTML5, CSS3, JavaScript |

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/OmkarSolat-17/CodeAlpha_Language-Translation-Tool.git
cd CodeAlpha_Language-Translation-Tool
```

### 2. Create virtual environment

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the application

```bash
python app.py
```

### 5. Open in browser

Visit: `http://127.0.0.1:5000`

## 🧠 How It Works

```
User Text → Language Detection → Translation API → Translated Text → TTS / Copy
```

1. User enters text and selects source/target languages (or uses auto-detect)
2. Text is sent to the translation API
3. Translated text is returned and displayed
4. User can copy the result or listen via text-to-speech

## 📂 Project Structure

```
CodeAlpha_Language-Translation-Tool/
├── app.py               # Flask application and translation logic
├── requirements.txt     # Python dependencies
├── templates/
│   └── index.html       # Web interface template
├── static/
│   ├── style.css        # Styling
│   └── script.js        # Frontend logic
└── README.md
```

## 🎯 Project Objective

Develop a practical multilingual translation application demonstrating API integration, Flask web development, and interactive frontend functionality.

## 👨‍💻 Internship

This project was developed as part of the **Artificial Intelligence Internship at CodeAlpha**.

---

<p align="center">
  <sub>Built by <a href="https://github.com/OmkarSolat-17">Omkar Solat</a> · B.Tech CSE (AI/ML)</sub>
</p>
