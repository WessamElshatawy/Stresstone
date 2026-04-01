// audio.js

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Unlock audio
document.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
});

// Map instrument type to audio file
const instrumentFiles = {
  "bell": "bell.mp3",
  "drum": "drum.mp3",
  "piano": "piano.mp3"
};

// Rhythm recording
let rhythm = [];
let recording = false;
let startTime = 0;

// Play MP3 audio for selected instrument
function playAudio(type) {
  const audioFile = instrumentFiles[type];
  if (!audioFile) return;

  const audio = new Audio(audioFile);
  audio.currentTime = 0;
  audio.play();
}

// Tap function: plays audio and visual feedback, records if recording
function tap(stressType) {
  let instrument = document.getElementById("instrument").value;

  // Play the selected audio file
  playAudio(instrument);

  // Visual feedback
  showTap(stressType === "1");

  // Record rhythm if recording
  if (recording) {
    rhythm.push({
      type: stressType,
      time: Date.now() - startTime
    });
  }
}

// Visual feedback for tap
function showTap(stressed) {
  let visual = document.getElementById("tapVisual");
  let circle = document.createElement("div");

  circle.style.width = "30px";
  circle.style.height = stressed ? "60px" : "30px";
  circle.style.background = stressed ? "red" : "blue";
  circle.style.display = "inline-block";
  circle.style.margin = "5px";
  circle.style.borderRadius = "50%";

  visual.appendChild(circle);

  setTimeout(() => circle.remove(), 500);
}

// Rhythm recording functions
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

  rhythm.forEach(event => {
    setTimeout(() => {
      tap(event.type);
    }, event.time);
  });
}
