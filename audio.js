document.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
});
document.body.addEventListener('click', () => {
  audioCtx.resume();
});
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

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

function playStress(pattern) {
  let time = 0;
  pattern.split("").forEach((s, i) => {
    setTimeout(() => {
      if (s === "1") {
        playTone(500, 400);
        animateCircle(i, true);
      } else {
        playTone(250, 200);
        animateCircle(i, false);
      }
    }, time);
    time += 500;
  });
}
