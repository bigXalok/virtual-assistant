const btn = document.querySelector("#btn");
const content = document.querySelector("#content");
const voice = document.querySelector("#voice");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "hi-GB";
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  const day = new Date();
  const hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Sir");
  } else {
    speak("Good Evening my master");
  }
}

window.addEventListener("load", wishMe);

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

function toggleUI(listening) {
  voice.style.display = listening ? "block" : "none";
  btn.style.display = listening ? "none" : "flex";
}

btn.addEventListener("click", () => {
  recognition.start();
  toggleUI(true);
});

function takeCommand(message) {
  toggleUI(false);

  if (message.includes("hello alina") || message.includes("hey alina")) {
    speak("Hello my master, what can I help you with?");
  } else if (message.includes("who are you")) {
    speak("I am a virtual assistant, created by Alok.");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://youtube.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google...");
    window.open("https://google.com/", "_blank");
  } else if (message.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://facebook.com/", "_blank");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://instagram.com/", "_blank");
  } else if (message.includes("open whatsapp")) {
    speak("Opening WhatsApp Web...");
    window.open("https://web.whatsapp.com/", "_blank");
  } else if (message.includes("open calculator")) {
    speak("Opening online calculator...");
    window.open("https://www.google.com/search?q=calculator", "_blank");
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric"
    });
    speak(`Current time is ${time}`);
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short"
    });
    speak(`Today's date is ${date}`);
  } else {
    const query = message.replace("alina", "").trim();
    const finalText = `This is what I found on the internet regarding ${query}`;
    speak(finalText);
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
  }
}
