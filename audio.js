const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

document.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
});

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

  if (recording) {
    rhythm.push({
      type: type,
      time: Date.now() - startTime
    });
  }
}
