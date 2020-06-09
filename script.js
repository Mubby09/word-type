const settingButton = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingForm = document.getElementById("settings-form");
const difficultyEl = document.getElementById("difficulty");
const wordEl = document.getElementById("word");
const textEL = document.getElementById("text");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const endGame = document.getElementById("endgame-container");
const runningOut = document.getElementById("running-out");

//list of words for game
const words = [
  "leggos",
  "android",
  "imaginary",
  "psychology",
  "antagonize",
  "protagonist",
  "demistify",
  "leverage",
  "tunnel",
  "staple",
  "radiant",
  "fertile",
  "development",
  "python",
  "javascript",
  "adequate",
  "google",
  "vison",
  "dangerous",
  "symptom"
];

// function getRandomWord() {
//   fetch("https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf", {
//     method: "GET",
//     headers: {
//       "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
//       "x-rapidapi-key": "e4fe7bfb7fmsh76996e99c8353abp16e2adjsnee33573ff050"
//     }
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

let randonWord;

//initialize score
let score = 0;

//init time
let time = 10;

//set difficulty to value in local storage or easy
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : easy;

//difficulty select value
difficultyEl.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : easy;

const timeInterval = setInterval(updateTime, 1000);

//Get random Word from the array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  wordEl.innerHTML = randomWord;
}

function updateScore() {
  score = score + 5;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  if (time < 5) {
    document.body.style.backgroundColor = "red";
    document.body.style.transition = "0.6s all ease-in";
    runningOut.innerHTML = `HURRY UP!!!`;
  } else {
    document.body.style.backgroundColor = "bisque";
    runningOut.innerHTML = `Word Type`;
  }

  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    // clearInterval(time);
    gameOver();
  }
}

function gameOver() {
  endGame.innerHTML = `
  <h1>Ooops, The Time ran out on you..</h1>
  <p>Your score is : ${score}</p>
  <button onclick ='playAgain()'>Play Again!</button>
  `;
  endGame.style.display = "block";
}

function playAgain() {
  window.location.reload();
}

function hideDifficulty() {
  settings.classList.toggle("hide");
}

addWordToDOM();

textEL.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    if (difficulty === "easy") {
      time += 7;
    } else if (difficulty === "medium") {
      time += 4;
    } else if (difficulty === "hard") {
      time += 3;
    }

    textEL.value = "";
  }
});

settingButton.addEventListener("click", hideDifficulty);

settingForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
