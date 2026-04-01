const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// unlock audio
document.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
});

function playTone(freq, duration) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  gain.gain.value = 0.3;

  osc.start();

  setTimeout(() => {
    osc.stop();
  }, duration);
}

// MAIN TAP FUNCTION
function tap(type) {
  if (type === "1") {
    playTone(600, 200); // stressed
  } else {
    playTone(250, 120); // unstressed
  }
}
