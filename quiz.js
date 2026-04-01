let score = 0;
let quizWord;

function startQuiz() {
  quizWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  playStress(quizWord.stress);

  let choices = ["10", "01", "010", "100"];
  let container = document.getElementById("choices");
  container.innerHTML = "";

  choices.forEach(c => {
    let btn = document.createElement("button");
    btn.innerText = c;
    btn.onclick = () => checkAnswer(c);
    container.appendChild(btn);
  });
}

function checkAnswer(choice) {
  if (choice === quizWord.stress) {
    score++;
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
  document.getElementById("score").innerText = "Score: " + score;
}
