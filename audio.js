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

// Play selected instrument
function playAudio(type) {
  const audioFile = instrumentFiles[type];
  if (!audioFile) return;

  const audio = new Audio(audioFile);
  audio.currentTime = 0;
  audio.play();
}

let rhythm = [];
let recording = false;
let startTime = 0;

function playTone(freq, duration, type="sine") {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  gain.gain.value = 0.3;

  osc.start();
  setTimeout(() => osc.stop(), duration);
}

function tap(type) {
  let instrument = document.getElementById("instrument").value;

  if (type === "1") {
    playTone(600, 200, instrument);
    showTap(true);
  } else {
    playTone(250, 120, instrument);
    showTap(false);
  }
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
  if (recording) {
    rhythm.push({
      type: type,
      time: Date.now() - startTime
    });
  }
}
