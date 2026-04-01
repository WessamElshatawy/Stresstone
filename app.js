function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function loadWord() {
  document.getElementById("wordTitle").innerText = currentWord.word;
  let container = document.getElementById("circles");
  container.innerHTML = "";
  currentWord.stress.split("").forEach(s => {
    let div = document.createElement("div");
    div.className = "circle";
    container.appendChild(div);
  });
}

function animateCircle(i, stressed) {
  let circles = document.querySelectorAll(".circle");
  if (stressed) circles[i].classList.add("stressed");
  setTimeout(() => circles[i].classList.remove("stressed"), 300);
}
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

  setTimeout(() => {
    circle.remove();
  }, 500);
}
function playWord() {
  playStress(currentWord.stress);
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
function nextWord() {
  currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  loadWord();
}
document.addEventListener("keydown", (e) => {
  if (e.key === "a") tap("0"); // unstressed
  if (e.key === "s") tap("1"); // stressed
});
loadWord();
