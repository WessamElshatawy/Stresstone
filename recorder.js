let mediaRecorder;
let audioChunks = [];

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.start();
  mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
}

function stopRecording() {
  mediaRecorder.stop();
  mediaRecorder.onstop = () => {
    const blob = new Blob(audioChunks);
    const url = URL.createObjectURL(blob);
    document.getElementById("playback").src = url;
  };
}
