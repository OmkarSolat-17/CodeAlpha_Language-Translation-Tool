from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# MyMemory provides a free translation endpoint for small/demo projects.
# For production-scale usage, switch to a paid provider such as Google Cloud
# Translation or Microsoft Translator and keep API keys on the server.

LANGUAGES = {
    "auto": "Auto Detect",
    "en": "English", "hi": "Hindi", "gu": "Gujarati", "mr": "Marathi",
    "bn": "Bengali", "ta": "Tamil", "te": "Telugu", "kn": "Kannada",
    "ml": "Malayalam", "pa": "Punjabi", "ur": "Urdu", "es": "Spanish",
    "fr": "French", "de": "German", "it": "Italian", "pt": "Portuguese",
    "ru": "Russian", "ja": "Japanese", "ko": "Korean", "zh": "Chinese",
    "ar": "Arabic", "tr": "Turkish", "nl": "Dutch", "pl": "Polish",
    "th": "Thai", "vi": "Vietnamese", "id": "Indonesian", "uk": "Ukrainian"
}

@app.route("/")
def index():
    return render_template("index.html", languages=LANGUAGES)

@app.post("/api/translate")
def translate():
    payload = request.get_json(silent=True) or {}
    text = (payload.get("text") or "").strip()
    source = payload.get("source") or "auto"
    target = payload.get("target") or "en"

    if not text:
        return jsonify({"error": "Please enter text to translate."}), 400
    if len(text) > 5000:
        return jsonify({"error": "Please keep your text under 5,000 characters."}), 400
    if source not in LANGUAGES or target not in LANGUAGES:
        return jsonify({"error": "Please choose valid languages."}), 400
    if source == target:
        return jsonify({"translatedText": text, "detectedLanguage": LANGUAGES[source]})

    source_code = "autodetect" if source == "auto" else source
    langpair = f"{source_code}|{target}"

    try:
        response = requests.get(
            "https://api.mymemory.translated.net/get",
            params={"q": text, "langpair": langpair},
            timeout=20
        )
        response.raise_for_status()
        data = response.json()

        translated = data.get("responseData", {}).get("translatedText")
        status = data.get("responseStatus", 200)
        if not translated or int(status) != 200:
            detail = data.get("responseDetails") or "The translation service could not process this text."
            return jsonify({"error": detail}), 502

        detected = data.get("responseData", {}).get("detectedLanguage")
        return jsonify({
            "translatedText": translated,
            "detectedLanguage": detected or (LANGUAGES[source] if source != "auto" else "Auto-detected")
        })
    except requests.Timeout:
        return jsonify({"error": "The translation service took too long. Please try again."}), 504
    except requests.RequestException:
        return jsonify({"error": "Could not connect to the translation service. Check your internet connection."}), 502
    except (ValueError, TypeError):
        return jsonify({"error": "Unexpected response from the translation service. Please try again."}), 502

if __name__ == "__main__":
    app.run(debug=True)
