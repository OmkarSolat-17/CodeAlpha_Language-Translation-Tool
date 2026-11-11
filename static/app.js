const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const sourceText = document.getElementById("sourceText");
const translatedText = document.getElementById("translatedText");
const translateBtn = document.getElementById("translateBtn");
const resultStatus = document.getElementById("resultStatus");
const charCount = document.getElementById("charCount");
const sourceBadge = document.getElementById("sourceBadge");
const targetBadge = document.getElementById("targetBadge");
const toast = document.getElementById("toast");

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}
function languageName(select) {
  return select.options[select.selectedIndex]?.text || "";
}
function updateLanguageBadges() {
  sourceBadge.textContent = languageName(sourceLang);
  targetBadge.textContent = languageName(targetLang);
}
function setStatus(message, active = false) {
  resultStatus.innerHTML = `<span class="tiny-dot" style="${active ? "background:#a69aff" : ""}"></span> ${message}`;
}
sourceText.addEventListener("input", () => {
  charCount.textContent = `${sourceText.value.length.toLocaleString()} / 5,000`;
});
sourceLang.addEventListener("change", updateLanguageBadges);
targetLang.addEventListener("change", updateLanguageBadges);

translateBtn.addEventListener("click", async () => {
  const text = sourceText.value.trim();
  if (!text) {
    showToast("Enter some text first.");
    sourceText.focus();
    return;
  }
  translateBtn.disabled = true;
  translateBtn.querySelector(".button-text").textContent = "Translating…";
  translatedText.className = "translated-text placeholder";
  translatedText.textContent = "Working on your translation…";
  setStatus("Translating", true);

  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({text, source: sourceLang.value, target: targetLang.value})
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Translation failed.");
    translatedText.className = "translated-text";
    translatedText.textContent = data.translatedText;
    if (sourceLang.value === "auto" && data.detectedLanguage) {
      sourceBadge.textContent = data.detectedLanguage;
    }
    setStatus("Translation complete");
  } catch (error) {
    translatedText.className = "translated-text error";
    translatedText.textContent = error.message || "Something went wrong. Please try again.";
    setStatus("Could not translate");
  } finally {
    translateBtn.disabled = false;
    translateBtn.querySelector(".button-text").textContent = "Translate now";
  }
});

document.getElementById("swapBtn").addEventListener("click", () => {
  if (sourceLang.value === "auto") {
    showToast("Choose a source language before swapping.");
    return;
  }
  const previousSource = sourceLang.value;
  sourceLang.value = targetLang.value;
  targetLang.value = previousSource;
  const result = translatedText.textContent;
  if (!translatedText.classList.contains("placeholder") && !translatedText.classList.contains("error") && result !== "Your translation will appear here.") {
    sourceText.value = result;
    charCount.textContent = `${sourceText.value.length.toLocaleString()} / 5,000`;
    translatedText.textContent = "Your translation will appear here.";
    translatedText.className = "translated-text placeholder";
    setStatus("Ready to translate");
  }
  updateLanguageBadges();
});
document.getElementById("clearBtn").addEventListener("click", () => {
  sourceText.value = "";
  charCount.textContent = "0 / 5,000";
  sourceText.focus();
  showToast("Text cleared.");
});
document.getElementById("copyBtn").addEventListener("click", async () => {
  const text = translatedText.textContent;
  if (!text || translatedText.classList.contains("placeholder") || translatedText.classList.contains("error") || text === "Your translation will appear here.") {
    showToast("There is no translation to copy yet.");
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    showToast("Translation copied to clipboard.");
  } catch {
    showToast("Clipboard access is unavailable in this browser.");
  }
});
function speak(text, languageCode) {
  if (!text.trim()) { showToast("Nothing to read aloud."); return; }
  if (!("speechSynthesis" in window)) { showToast("Text-to-speech is not supported in this browser."); return; }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageCode === "auto" ? "en" : languageCode;
  utterance.rate = 0.92;
  window.speechSynthesis.speak(utterance);
}
document.getElementById("sourceSpeakBtn").addEventListener("click", () => speak(sourceText.value, sourceLang.value));
document.getElementById("resultSpeakBtn").addEventListener("click", () => {
  const text = translatedText.textContent;
  if (translatedText.classList.contains("placeholder") || translatedText.classList.contains("error") || text === "Your translation will appear here.") {
    showToast("Translate some text first.");
    return;
  }
  speak(text, targetLang.value);
});
updateLanguageBadges();
