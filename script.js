const output = document.getElementById("output");
let finalTranscript = "";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.interimResults = true;

// Start listening automatically when the page loads
recognition.start();

recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results).map(result => result[0].transcript).join("");

    if (e.results[0].isFinal) {
        finalTranscript = transcript;
        output.textContent = finalTranscript;

        // Optionally, send the final transcript to the Python server or process it
        console.log(finalTranscript);
    }
});

// Automatically restart recognition when it ends
recognition.addEventListener("end", () => {
    recognition.start();
});

// Stop recognition when the Escape key is pressed
document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
        recognition.stop();
    }
});
