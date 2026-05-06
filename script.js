document.addEventListener("DOMContentLoaded", () => {
const elements = [
  { number: 1, symbol: "H", name: "水素" },
  { number: 2, symbol: "He", name: "ヘリウム" },
  { number: 3, symbol: "Li", name: "リチウム" },
  { number: 4, symbol: "Be", name: "ベリリウム" },
  { number: 5, symbol: "B", name: "ホウ素" },
  { number: 6, symbol: "C", name: "炭素" },
  { number: 7, symbol: "N", name: "窒素" },
  { number: 8, symbol: "O", name: "酸素" },
  { number: 9, symbol: "F", name: "フッ素" },
  { number: 10, symbol: "Ne", name: "ネオン" },
  { number: 11, symbol: "Na", name: "ナトリウム" },
  { number: 12, symbol: "Mg", name: "マグネシウム" },
  { number: 13, symbol: "Al", name: "アルミニウム" },
  { number: 14, symbol: "Si", name: "ケイ素" },
  { number: 15, symbol: "P", name: "リン" },
  { number: 16, symbol: "S", name: "硫黄" },
  { number: 17, symbol: "Cl", name: "塩素" },
  { number: 18, symbol: "Ar", name: "アルゴン" },
  { number: 19, symbol: "K", name: "カリウム" },
  { number: 20, symbol: "Ca", name: "カルシウム" },
  { number: 25, symbol: "Mn", name: "マンガン" },
  { number: 26, symbol: "Fe", name: "鉄" },
  { number: 29, symbol: "Cu", name: "銅" },
  { number: 30, symbol: "Zn", name: "亜鉛" },
  { number: 35, symbol: "Br", name: "臭素" },
  { number: 47, symbol: "Ag", name: "銀" },
  { number: 53, symbol: "I", name: "ヨウ素" },
  { number: 78, symbol: "Pt", name: "白金" },
  { number: 79, symbol: "Au", name: "金" },
  { number: 82, symbol: "Pb", name: "鉛" }
];

const questionTypes = [
  {
    label: "元素番号から元素名を答える",
    makeQuestion: (element) => `元素番号 ${element.number} の元素名は？`,
    answerKey: "name"
  },
  {
    label: "元素名から元素記号を答える",
    makeQuestion: (element) => `「${element.name}」の元素記号は？`,
    answerKey: "symbol"
  },
  {
    label: "元素記号から元素番号を答える",
    makeQuestion: (element) => `元素記号 ${element.symbol} の元素番号は？`,
    answerKey: "number"
  }
];

const normalTotalQuestions = 10;
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let currentQuestion = null;
let missedQuestions = [];
let reviewQuestions = [];
let isReviewMode = false;
let cardDeck = [];
let cardIndex = 0;
let isCardRevealed = false;

const modeScreen = document.getElementById("modeScreen");
const quizScreen = document.getElementById("quizScreen");
const cardScreen = document.getElementById("cardScreen");
const scoreBox = document.getElementById("scoreBox");
const progress = document.getElementById("progress");
const quizModeButton = document.getElementById("quizModeButton");
const cardModeButton = document.getElementById("cardModeButton");
const questionCount = document.getElementById("questionCount");
const scoreText = document.getElementById("scoreText");
const progressBar = document.getElementById("progressBar");
const questionType = document.getElementById("questionType");
const questionText = document.getElementById("questionText");
const choices = document.getElementById("choices");
const resultMessage = document.getElementById("resultMessage");
const nextButton = document.getElementById("nextButton");
const reviewButton = document.getElementById("reviewButton");
const restartButton = document.getElementById("restartButton");
const questionArea = document.getElementById("questionArea");
const flashCard = document.getElementById("flashCard");
const cardHint = document.getElementById("cardHint");
const cardSymbol = document.getElementById("cardSymbol");
const cardAnswer = document.getElementById("cardAnswer");
const cardNextButton = document.getElementById("cardNextButton");
const cardRestartButton = document.getElementById("cardRestartButton");

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  const copied = [...list];

  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }

  return copied;
}

function getChoices(correctElement, answerKey) {
  const correctAnswer = String(correctElement[answerKey]);
  const wrongAnswers = elements
    .filter((element) => element !== correctElement)
    .map((element) => String(element[answerKey]));

  return shuffle([correctAnswer, ...shuffle(wrongAnswers).slice(0, 3)]);
}

function makeQuestionData(element = randomItem(elements), type = randomItem(questionTypes)) {
  return {
    typeLabel: type.label,
    text: type.makeQuestion(element),
    answer: String(element[type.answerKey]),
    choices: getChoices(element, type.answerKey)
  };
}

function getTotalQuestions() {
  return isReviewMode ? reviewQuestions.length : normalTotalQuestions;
}

function showTopScreen() {
  modeScreen.classList.remove("hidden");
  quizScreen.classList.add("hidden");
  cardScreen.classList.add("hidden");
  scoreBox.classList.add("hidden");
  progress.classList.add("hidden");
  progressBar.style.width = "0";
}

function showQuizScreen() {
  modeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  cardScreen.classList.add("hidden");
  scoreBox.classList.remove("hidden");
  progress.classList.remove("hidden");
}

function showCardScreen() {
  modeScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  cardScreen.classList.remove("hidden");
  scoreBox.classList.remove("hidden");
  progress.classList.remove("hidden");
}

function updateStatus() {
  const totalQuestions = getTotalQuestions();
  questionCount.textContent = `${Math.min(currentQuestionIndex + 1, totalQuestions)} / ${totalQuestions}`;
  scoreText.textContent = `${score}点`;
  progressBar.style.width = `${(currentQuestionIndex / totalQuestions) * 100}%`;
}

function showQuestion() {
  answered = false;
  resultMessage.textContent = "";
  resultMessage.className = "result-message";
  nextButton.disabled = true;
  nextButton.textContent = "次の問題へ";
  reviewButton.classList.add("hidden");
  choices.innerHTML = "";
  questionArea.classList.remove("final-card");

  currentQuestion = isReviewMode
    ? reviewQuestions[currentQuestionIndex]
    : makeQuestionData();

  questionType.textContent = isReviewMode ? `復習：${currentQuestion.typeLabel}` : currentQuestion.typeLabel;
  questionText.textContent = currentQuestion.text;
  updateStatus();

  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => checkAnswer(button, choice));
    choices.appendChild(button);
  });
}

function checkAnswer(selectedButton, selectedChoice) {
  if (answered) {
    return;
  }

  answered = true;
  const isCorrect = selectedChoice === currentQuestion.answer;

  if (isCorrect) {
    score++;
    selectedButton.classList.add("correct");
    resultMessage.textContent = "実験成功！正解です。";
    resultMessage.classList.add("good");
  } else {
    selectedButton.classList.add("wrong");
    resultMessage.textContent = `再実験！正解は「${currentQuestion.answer}」です。`;
    resultMessage.classList.add("bad");

    if (!isReviewMode) {
      missedQuestions.push(currentQuestion);
    }
  }

  [...choices.children].forEach((button) => {
    button.disabled = true;
    if (button.textContent === currentQuestion.answer) {
      button.classList.add("correct");
    }
  });

  currentQuestionIndex++;
  scoreText.textContent = `${score}点`;
  progressBar.style.width = `${(currentQuestionIndex / getTotalQuestions()) * 100}%`;
  nextButton.disabled = false;

  if (currentQuestionIndex === getTotalQuestions()) {
    nextButton.textContent = isReviewMode ? "復習結果を見る" : "結果を見る";
  }
}

function showFinalScore() {
  questionArea.classList.add("final-card");
  questionType.textContent = isReviewMode ? "復習結果レポート" : "研究結果レポート";
  questionText.innerHTML = `${score} / ${getTotalQuestions()} 点`;
  choices.innerHTML = "";
  resultMessage.className = "result-message good";
  resultMessage.textContent = isReviewMode ? getReviewMessage() : getFinalMessage();
  nextButton.disabled = true;
  nextButton.textContent = "クイズ終了";
  questionCount.textContent = `${getTotalQuestions()} / ${getTotalQuestions()}`;
  progressBar.style.width = "100%";

  if (!isReviewMode && missedQuestions.length > 0) {
    reviewButton.classList.remove("hidden");
  }
}

function getFinalMessage() {
  if (score === normalTotalQuestions) {
    return "10問正解：元素マスター！";
  }

  if (score >= 7) {
    return "7〜9問正解：かなりいい感じ！間違えた問題は復習できます。";
  }

  if (score >= 4) {
    return "4〜6問正解：あと少し！実験ノートを見直そう。";
  }

  return "0〜3問正解：復習して再チャレンジ！";
}

function getReviewMessage() {
  if (score === reviewQuestions.length) {
    return "復習実験は全部成功！苦手をしっかり直せました。";
  }

  return "もう一度チャレンジして、研究結果を更新しよう。";
}

function startReview() {
  reviewQuestions = [...missedQuestions];
  currentQuestionIndex = 0;
  score = 0;
  isReviewMode = true;
  showQuizScreen();
  showQuestion();
}

function startQuizGame() {
  currentQuestionIndex = 0;
  score = 0;
  missedQuestions = [];
  reviewQuestions = [];
  isReviewMode = false;
  showQuizScreen();
  showQuestion();
}

function updateCardStatus() {
  questionCount.textContent = `${Math.min(cardIndex + 1, cardDeck.length)} / ${cardDeck.length}`;
  scoreText.textContent = "暗記中";
  progressBar.style.width = `${(cardIndex / cardDeck.length) * 100}%`;
}

function showCard() {
  const element = cardDeck[cardIndex];
  isCardRevealed = false;
  flashCard.classList.remove("revealed");
  cardHint.textContent = "クリックして答えを見る";
  cardSymbol.textContent = element.symbol;
  cardAnswer.textContent = "";
  cardNextButton.textContent = cardIndex === cardDeck.length - 1 ? "最後のカード" : "次へ";
  cardNextButton.disabled = false;
  updateCardStatus();
}

function revealCard() {
  if (isCardRevealed) {
    return;
  }

  const element = cardDeck[cardIndex];
  isCardRevealed = true;
  flashCard.classList.add("revealed");
  cardHint.textContent = "答え";
  cardAnswer.textContent = `元素番号 ${element.number}・${element.name}`;
}

function goToNextCard() {
  if (cardIndex < cardDeck.length - 1) {
    cardIndex++;
    showCard();
    return;
  }

  progressBar.style.width = "100%";
  cardHint.textContent = "暗記カード終了";
  cardSymbol.textContent = "完了";
  cardAnswer.textContent = "トップへ戻るか、もう一度カードモードを選んで復習しよう。";
  flashCard.classList.add("revealed");
  cardNextButton.disabled = true;
}

function startCardMode() {
  cardDeck = shuffle(elements);
  cardIndex = 0;
  showCardScreen();
  showCard();
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < getTotalQuestions()) {
    showQuestion();
  } else {
    showFinalScore();
  }
});

quizModeButton.addEventListener("click", startQuizGame);
cardModeButton.addEventListener("click", startCardMode);
reviewButton.addEventListener("click", startReview);
restartButton.addEventListener("click", showTopScreen);
flashCard.addEventListener("click", revealCard);
cardNextButton.addEventListener("click", goToNextCard);
cardRestartButton.addEventListener("click", showTopScreen);

showTopScreen();
});
