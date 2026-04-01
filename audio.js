// audio.js

let rhythm = [];
let recording = false;
let startTime = 0;

// Instrument files
const instrumentFiles = {
  "piano": "piano.wav",  // or .mp3
  "drum": "drum.wav",
  "bell": "bell.wav"
};

// Play the instrument sound
function playAudio(instrument) {
  const audioFile = instrumentFiles[instrument];
  if (!audioFile) return;

  const audio = new Audio(audioFile);
  audio.currentTime = 0;
  audio.play().catch(err => console.error("Audio play error:", err));
}

// Tap function: plays sound, shows visual, and records rhythm
function tap(stressType) {
  const instrument = document.getElementById("instrument").value;
  const stressed = stressType === "1";

  playAudio(instrument);
  showTap(stressed);

  if (recording) {
    rhythm.push({
      type: stressType,
      time: Date.now() - startTime
    });
  }
}

// Show visual feedback
function showTap(stressed) {
  const visual = document.getElementById("tapVisual");
  const circle = document.createElement("div");

  circle.style.width = stressed ? "60px" : "40px";
  circle.style.height = stressed ? "60px" : "40px";
  circle.style.background = stressed ? "red" : "blue";
  circle.style.display = "inline-block";
  circle.style.margin = "5px";
  circle.style.borderRadius = "50%";
  circle.style.transform = "scale(0)";
  circle.style.transition = "transform 0.2s ease, opacity 0.5s ease";

  visual.appendChild(circle);

  setTimeout(() => circle.style.transform = "scale(1.2)", 10);
  setTimeout(() => circle.style.transform = "scale(1)", 210);
  setTimeout(() => circle.remove(), 500);
}

// Recording controls
function startRhythmRecording() {
  rhythm = [];
  recording = true;
  startTime = Date.now();
  alert("Recording started");
}

function stopRhythmRecording() {
  recording = false;
  alert("Recording stopped");
}

function playRhythm() {
  if (rhythm.length === 0) return;
  rhythm.forEach(evt => {
    setTimeout(() => tap(evt.type), evt.time);
  });
}
