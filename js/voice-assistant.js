// voice-assistant.js

const voiceBtn = document.createElement("button");
voiceBtn.id = "voiceBtn";
voiceBtn.innerHTML = "🎤";
voiceBtn.style = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 20px;
  background: #00b4d8;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  z-index: 9999;
`;
document.body.appendChild(voiceBtn);

// Check for browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Sorry, your browser does not support voice commands.");
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;

  voiceBtn.addEventListener('click', () => {
    recognition.start();
    voiceBtn.style.background = "#00ffb4"; // visual feedback that it's listening
  });

  recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log("Voice command:", command);
    voiceBtn.style.background = "#00b4d8"; // reset button color

    // Navigation commands
    if (command.includes("dive division")) window.location.href = "dive-division.html";
    else if (command.includes("marine division")) window.location.href = "marine-division.html";
    else if (command.includes("fisheries division")) window.location.href = "fisheries-division.html";
    else if (command.includes("home") || command.includes("index")) window.location.href = "index.html";

    // Slider commands (if swiper exists on page)
    if (typeof swiper !== "undefined") {
      if (command.includes("next slide")) swiper.slideNext();
      if (command.includes("previous slide") || command.includes("prev slide")) swiper.slidePrev();
    }
  };

  recognition.onerror = function(event) {
    console.error("Voice recognition error:", event.error);
    voiceBtn.style.background = "#00b4d8"; // reset color if error
  };
}
