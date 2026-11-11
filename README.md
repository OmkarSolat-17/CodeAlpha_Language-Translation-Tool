# CodeAlpha Language Translation Tool — Lingua

A professional, responsive language translation web application built for **CodeAlpha AI Internship Task 1**.

## Features

- Translate text between a broad selection of languages
- Automatic source language detection
- Clean, modern dark UI with responsive CSS
- Language swap control
- Character counter (5,000-character limit)
- Copy translated text
- Browser-based text-to-speech for source and translated text
- API error handling and loading feedback

## Tech stack

- Python + Flask (server/API bridge)
- HTML5, CSS3, JavaScript
- MyMemory Translation API (free demo endpoint)
- Web Speech API (browser text-to-speech)

## Run locally

1. Install Python 3.10 or newer.
2. Open a terminal in this project folder.
3. (Recommended) create and activate a virtual environment:

   **Windows**
   ```powershell
   python -m venv .venv
   .venv\\Scripts\\activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Start the app:
   ```bash
   python app.py
   ```

6. Open http://127.0.0.1:5000 in your browser.

Internet access is required for translation requests. Speech synthesis uses browser voices, which vary by device/browser.

## API note

This project uses MyMemory's public translation endpoint to keep the internship demo easy to run without credentials. Public free endpoints may have usage limits, variable availability, or translation quality differences. For production, integrate Google Cloud Translation or Microsoft Translator, configure credentials as environment variables, and never expose API keys in frontend code.

## Repository naming

For the internship, use the required repository name:

`CodeAlpha_LanguageTranslationTool`

## Suggested demo flow

1. Enter a short sentence in English.
2. Select Hindi or Gujarati as the target language.
3. Click **Translate now**.
4. Demonstrate copy and listen controls.
5. Show language swapping and responsive layout.

## Project structure

```text
CodeAlpha_LanguageTranslationTool/
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── app.js
```
