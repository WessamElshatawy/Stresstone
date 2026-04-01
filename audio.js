// audio.js

// Create AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Unlock audio on first click
document.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
});

// Map instruments to single WAV files
const instrumentFiles = {
  "piano": "piano.wav",
  "drum": "drum.wav",
  "bell": "bell.wav"
};

// Rhythm recording
let rhythm = [];
let recording = false;
let startTime = 0;

// Play audio (single WAV per instrument)
function playAudio(instrument) {
  const audioFile = instrumentFiles[instrument];
  if (!audioFile) return;

  fetch(audioFile)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
    })
    .catch(err => console.error("Audio error:", err));
}

// Tap function: plays audio, visual feedback, and records rhythm
function tap(stressType) {
  const instrument = document.getElementById("instrument").value;
  const stressed = stressType === "1";

  // Play selected instrument
  playAudio(instrument);

  // Show visual feedback
  showTap(stressed);

  // Record rhythm if recording
  if (recording) {
    rhythm.push({
      type: stressType,
      time: Date.now() - startTime
    });
  }
}

// Visual feedback function: bouncing circle
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

  // Bounce animation
  setTimeout(() => { circle.style.transform = "scale(1.2)"; }, 10);
  setTimeout(() => { circle.style.transform = "scale(1)"; }, 210);
  setTimeout(() => circle.remove(), 500);
}

// Start rhythm recording
function startRhythmRecording() {
  rhythm = [];
  recording = true;
  startTime = Date.now();
  alert("Recording started");
}

// Stop rhythm recording
function stopRhythmRecording() {
  recording = false;
  alert("Recording stopped");
}

// Play recorded rhythm
function playRhythm() {
  if (rhythm.length === 0) return;

  rhythm.forEach(event => {
    setTimeout(() => {
      tap(event.type);
    }, event.time);
  });
}
