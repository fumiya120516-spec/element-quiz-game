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
      id: "from-number",
      label: "番号から答える",
      promptLabel: "元素番号",
      question: (element) => `元素番号 ${element.number} の元素名と元素記号は？`,
      promptValue: (element) => String(element.number),
      answer: (element) => `${element.name}・${element.symbol}`
    },
    {
      id: "from-name",
      label: "元素名から答える",
      promptLabel: "元素名",
      question: (element) => `「${element.name}」の元素番号と元素記号は？`,
      promptValue: (element) => element.name,
      answer: (element) => `${element.number}番・${element.symbol}`
    },
    {
      id: "from-symbol",
      label: "元素記号から答える",
      promptLabel: "元素記号",
      question: (element) => `元素記号 ${element.symbol} の元素番号と元素名は？`,
      promptValue: (element) => element.symbol,
      answer: (element) => `${element.number}番・${element.name}`
    }
  ];

  const screens = {
    mode: document.getElementById("modeScreen"),
    type: document.getElementById("typeScreen"),
    quiz: document.getElementById("quizScreen"),
    result: document.getElementById("resultScreen"),
    card: document.getElementById("cardScreen")
  };

  const screenLead = document.getElementById("screenLead");
  const scoreBox = document.getElementById("scoreBox");
  const progress = document.getElementById("progress");
  const progressBar = document.getElementById("progressBar");
  const questionCount = document.getElementById("questionCount");
  const scoreText = document.getElementById("scoreText");
  const questionArea = document.getElementById("questionArea");
  const questionType = document.getElementById("questionType");
  const questionText = document.getElementById("questionText");
  const choices = document.getElementById("choices");
  const resultMessage = document.getElementById("resultMessage");
  const nextButton = document.getElementById("nextButton");
  const quizBackButton = document.getElementById("quizBackButton");
  const reviewButton = document.getElementById("reviewButton");
  const resultBackButton = document.getElementById("resultBackButton");
  const resultTitle = document.getElementById("resultTitle");
  const finalScoreText = document.getElementById("finalScoreText");
  const finalComment = document.getElementById("finalComment");
  const missedListArea = document.getElementById("missedListArea");
  const typeChoices = document.getElementById("typeChoices");
  const typeBackButton = document.getElementById("typeBackButton");
  const bgmToggle = document.getElementById("bgmToggle");
  const sfxToggle = document.getElementById("sfxToggle");
  const bgmVolume = document.getElementById("bgmVolume");
  const bgmVolumeLabel = document.getElementById("bgmVolumeLabel");
  const sfxVolume = document.getElementById("sfxVolume");
  const sfxVolumeLabel = document.getElementById("sfxVolumeLabel");
  const cardFrontSelect = document.getElementById("cardFrontSelect");
  const flashCard = document.getElementById("flashCard");
  const cardHint = document.getElementById("cardHint");
  const cardFrontText = document.getElementById("cardFrontText");
  const cardAnswer = document.getElementById("cardAnswer");
  const cardRevealButton = document.getElementById("cardRevealButton");
  const cardNextButton = document.getElementById("cardNextButton");
  const cardBackButton = document.getElementById("cardBackButton");

  const storageKeys = {
    weak: "elementQuizWeakElements",
    bgm: "elementQuizBgmOn",
    sfx: "elementQuizSfxOn",
    bgmVolume: "elementQuizBgmVolume",
    sfxVolume: "elementQuizSfxVolume"
  };

  const sounds = {
    click: createAudio("./assets/sounds/click.mp3", 0.5),
    correct: createAudio("./assets/sounds/correct.mp3", 0.5),
    wrong: createAudio("./assets/sounds/wrong.mp3", 0.5),
    result: createAudio("./assets/sounds/result.mp3", 0.5),
    bgm: createAudio("./assets/sounds/bgm.mp3", 0.3, true)
  };

  let bgmOn = localStorage.getItem(storageKeys.bgm) === "true";
  let sfxOn = localStorage.getItem(storageKeys.sfx) !== "false";
  let bgmVolumeValue = getSavedVolume(storageKeys.bgmVolume, 30);
  let sfxVolumeValue = getSavedVolume(storageKeys.sfxVolume, 50);
  let weakList = loadWeakList();
  let activeQuiz = null;
  let cardDeck = [];
  let cardIndex = 0;
  let cardRevealed = false;

  function createAudio(src, volume, loop = false) {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = volume;
    audio.loop = loop;
    audio.addEventListener("error", () => {
      audio.dataset.failed = "true";
    });
    return audio;
  }

  function playSound(name) {
    if (!sfxOn || !sounds[name] || sounds[name].dataset.failed === "true") {
      return;
    }

    try {
      sounds[name].volume = sfxVolumeValue / 100;
      sounds[name].currentTime = 0;
      sounds[name].play().catch(() => {});
    } catch (error) {
      // Missing audio files should never stop the game.
    }
  }

  function startBgm() {
    if (!bgmOn || sounds.bgm.dataset.failed === "true") {
      return;
    }

    try {
      sounds.bgm.volume = bgmVolumeValue / 100;
      sounds.bgm.play().catch(() => {});
    } catch (error) {
      // iPhone may block audio until user interaction.
    }
  }

  function stopBgm() {
    sounds.bgm.pause();
  }

  function updateSoundControls() {
    bgmToggle.textContent = bgmOn ? "BGM ON" : "BGM OFF";
    bgmToggle.classList.toggle("active", bgmOn);
    sfxToggle.textContent = sfxOn ? "効果音 ON" : "効果音 OFF";
    sfxToggle.classList.toggle("active", sfxOn);
    bgmVolume.value = String(bgmVolumeValue);
    sfxVolume.value = String(sfxVolumeValue);
    bgmVolumeLabel.textContent = `BGM音量：${bgmVolumeValue}%`;
    sfxVolumeLabel.textContent = `効果音音量：${sfxVolumeValue}%`;
    sounds.bgm.volume = bgmVolumeValue / 100;
    setSfxVolume();
  }

  function setSfxVolume() {
    ["click", "correct", "wrong", "result"].forEach((name) => {
      sounds[name].volume = sfxVolumeValue / 100;
    });
  }

  function getSavedVolume(key, defaultValue) {
    const saved = Number(localStorage.getItem(key));
    if (Number.isFinite(saved)) {
      return Math.min(100, Math.max(0, Math.round(saved)));
    }
    return defaultValue;
  }

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

  function getElementByNumber(number) {
    return elements.find((element) => element.number === Number(number));
  }

  function loadWeakList() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKeys.weak) || "[]");
      return Array.isArray(saved) ? saved.map(Number).filter(Boolean) : [];
    } catch (error) {
      return [];
    }
  }

  function saveWeakList() {
    localStorage.setItem(storageKeys.weak, JSON.stringify(weakList));
  }

  function addWeakElement(element) {
    if (!weakList.includes(element.number)) {
      weakList.push(element.number);
      saveWeakList();
    }
  }

  function removeWeakElement(element) {
    weakList = weakList.filter((number) => number !== element.number);
    saveWeakList();
  }

  function makeQuestion(element, type = randomItem(questionTypes)) {
    const answer = type.answer(element);
    const wrongAnswers = elements
      .filter((candidate) => candidate.number !== element.number)
      .map((candidate) => type.answer(candidate));

    return {
      element,
      type,
      prompt: type.question(element),
      promptValue: type.promptValue(element),
      answer,
      choices: shuffle([answer, ...shuffle(wrongAnswers).slice(0, 3)])
    };
  }

  function makeRandomQuestions(count, sourceElements = elements, typeSource = questionTypes) {
    return Array.from({ length: count }, () => makeQuestion(randomItem(sourceElements), randomItem(typeSource)));
  }

  function makeAllElementQuestions(typeSource = questionTypes) {
    return shuffle(elements).map((element) => makeQuestion(element, randomItem(typeSource)));
  }

  function showOnly(screenName) {
    Object.entries(screens).forEach(([name, screen]) => {
      screen.classList.toggle("hidden", name !== screenName);
    });

    const inQuiz = screenName === "quiz";
    scoreBox.classList.toggle("hidden", !inQuiz);
    progress.classList.toggle("hidden", !inQuiz && screenName !== "card");
  }

  function showTopScreen() {
    showOnly("mode");
    screenLead.textContent = "問題に出ていない2つの情報をセットで答えて、小テスト前に確認しよう。";
    progressBar.style.width = "0";
    scoreText.textContent = "0点";
    questionCount.textContent = "";
    missedListArea.innerHTML = "";
    updateSoundControls();
  }

  function showTypeScreen() {
    showOnly("type");
    screenLead.textContent = "問題に出す情報を選んで、残り2つをセットで答える練習ができます。";
  }

  function startQuiz(config) {
    playSound("click");
    startBgm();
    activeQuiz = {
      mode: config.mode,
      title: config.title,
      questions: config.questions,
      index: 0,
      score: 0,
      missed: [],
      answered: false,
      showScoreDuringQuiz: config.showScoreDuringQuiz !== false,
      saveMistakes: config.saveMistakes !== false,
      removeWeakOnCorrect: Boolean(config.removeWeakOnCorrect)
    };
    showOnly("quiz");
    questionArea.classList.remove("final-card");
    showQuestion();
  }

  function showQuestion() {
    const question = activeQuiz.questions[activeQuiz.index];
    activeQuiz.answered = false;
    questionType.textContent = activeQuiz.mode === "review" ? `苦手復習：${question.type.label}` : question.type.label;
    questionText.textContent = question.prompt;
    resultMessage.textContent = "";
    resultMessage.className = "result-message";
    choices.innerHTML = "";
    nextButton.disabled = true;
    nextButton.textContent = activeQuiz.index === activeQuiz.questions.length - 1 ? "結果を見る" : "次の問題へ";

    question.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.type = "button";
      button.textContent = choice;
      button.addEventListener("click", () => answerQuestion(button, choice));
      choices.appendChild(button);
    });

    updateQuizStatus();
  }

  function answerQuestion(selectedButton, selectedChoice) {
    if (activeQuiz.answered) {
      return;
    }

    playSound("click");
    const question = activeQuiz.questions[activeQuiz.index];
    const correct = selectedChoice === question.answer;
    activeQuiz.answered = true;
    question.userAnswer = selectedChoice;

    if (correct) {
      playSound("correct");
      activeQuiz.score++;
      selectedButton.classList.add("correct");
      resultMessage.textContent = "実験成功！正解です。";
      resultMessage.classList.add("good");
      if (activeQuiz.removeWeakOnCorrect) {
        removeWeakElement(question.element);
      }
    } else {
      playSound("wrong");
      selectedButton.classList.add("wrong");
      resultMessage.textContent = activeQuiz.mode === "exam"
        ? "記録しました。結果画面で確認できます。"
        : `再実験！正解は「${question.answer}」です。`;
      resultMessage.classList.add("bad");
      activeQuiz.missed.push(question);
      if (activeQuiz.saveMistakes) {
        addWeakElement(question.element);
      }
    }

    [...choices.children].forEach((button) => {
      button.disabled = true;
      if (button.textContent === question.answer) {
        button.classList.add("correct");
      }
    });

    activeQuiz.index++;
    nextButton.disabled = false;
    updateQuizStatus();
  }

  function updateQuizStatus() {
    const current = Math.min(activeQuiz.index + 1, activeQuiz.questions.length);
    questionCount.textContent = `${current} / ${activeQuiz.questions.length}`;
    scoreText.textContent = activeQuiz.showScoreDuringQuiz ? `${activeQuiz.score}点` : "本番中";
    progressBar.style.width = `${(activeQuiz.index / activeQuiz.questions.length) * 100}%`;
  }

  function showResult() {
    playSound("result");
    showOnly("result");
    const total = activeQuiz.questions.length;
    const percent = Math.round((activeQuiz.score / total) * 100);
    resultTitle.textContent = activeQuiz.mode === "exam" ? "小テスト結果レポート" : "研究結果レポート";
    finalScoreText.textContent = `${activeQuiz.score} / ${total} 点`;
    finalComment.textContent = getScoreComment(activeQuiz.score, total, percent);
    renderMissedList(activeQuiz.missed, total, percent);
    reviewButton.classList.toggle("hidden", weakList.length === 0);
    progressBar.style.width = "100%";
  }

  function getScoreComment(score, total, percent) {
    if (score === total) {
      return `正答率 ${percent}%：元素マスター！`;
    }
    if (percent >= 70) {
      return `正答率 ${percent}%：かなりいい感じ！`;
    }
    if (percent >= 40) {
      return `正答率 ${percent}%：あと少し！実験ノートを見直そう。`;
    }
    return `正答率 ${percent}%：復習して再チャレンジ！`;
  }

  function renderMissedList(missed, total, percent) {
    if (missed.length === 0) {
      missedListArea.innerHTML = `<div class="missed-list"><h3>間違えた問題一覧</h3><p>間違えた問題はありません。すばらしい実験結果です。</p></div>`;
      return;
    }

    const items = missed.map((question) => `
      <li>
        <span>${question.type.label}</span>
        <strong>問題：${question.promptValue}</strong>
        <em>正解：${question.answer}</em>
        <em>あなたの答え：${question.userAnswer || "未回答"}</em>
      </li>
    `).join("");

    missedListArea.innerHTML = `
      <div class="missed-list">
        <h3>間違えた問題一覧</h3>
        <p>${total}問中 ${missed.length}問の元素を苦手リストに保存しました。正答率は ${percent}% です。</p>
        <ul>${items}</ul>
      </div>
    `;
  }

  function startReviewMode() {
    playSound("click");
    const weakElements = weakList.map(getElementByNumber).filter(Boolean);
    const questions = weakElements.map((element) => makeQuestion(element, randomItem(questionTypes)));
    if (questions.length === 0) {
      showOnly("result");
      resultTitle.textContent = "苦手復習";
      finalScoreText.textContent = "苦手な問題はまだありません";
      finalComment.textContent = "ランダム10問や全30問チェックで間違えた元素が、ここに保存されます。";
      missedListArea.innerHTML = "";
      reviewButton.classList.add("hidden");
      return;
    }

    startQuiz({
      mode: "review",
      title: "苦手復習",
      questions: shuffle(questions),
      removeWeakOnCorrect: true,
      saveMistakes: true
    });
  }

  function buildTypeButtons() {
    typeChoices.innerHTML = "";
    const options = [
      ...questionTypes,
      {
        id: "random",
        label: "完全ランダム",
        random: true
      }
    ];

    options.forEach((type) => {
      const button = document.createElement("button");
      button.className = "type-button";
      button.type = "button";
      button.textContent = type.label;
      button.addEventListener("click", () => {
        const questions = type.random
          ? makeRandomQuestions(10)
          : makeRandomQuestions(10, elements, [type]);
        startQuiz({
          mode: "type",
          title: type.label,
          questions
        });
      });
      typeChoices.appendChild(button);
    });
  }

  function startCardMode() {
    playSound("click");
    startBgm();
    cardDeck = shuffle(elements);
    cardIndex = 0;
    showOnly("card");
    screenLead.textContent = "カードをタップして、表に出ていない2つの情報を確認できます。";
    showCard();
  }

  function showCard() {
    const element = cardDeck[cardIndex];
    const frontKey = cardFrontSelect.value;
    cardRevealed = false;
    flashCard.classList.remove("revealed");
    cardHint.textContent = "タップして答えを見る";
    cardFrontText.textContent = getCardValue(element, frontKey);
    cardAnswer.textContent = "";
    cardRevealButton.disabled = false;
    cardNextButton.disabled = false;
    cardNextButton.textContent = cardIndex === cardDeck.length - 1 ? "終了する" : "次へ";
    questionCount.textContent = `${cardIndex + 1} / ${cardDeck.length}`;
    scoreText.textContent = "暗記中";
    progressBar.style.width = `${(cardIndex / cardDeck.length) * 100}%`;
  }

  function getCardValue(element, key) {
    if (key === "number") {
      return `元素番号 ${element.number}`;
    }
    return element[key];
  }

  function getCardAnswer(element, frontKey) {
    if (frontKey === "number") {
      return `${element.name}・${element.symbol}`;
    }
    if (frontKey === "name") {
      return `${element.number}番・${element.symbol}`;
    }
    return `${element.number}番・${element.name}`;
  }

  function revealCard() {
    if (cardRevealed) {
      return;
    }
    playSound("click");
    const element = cardDeck[cardIndex];
    cardRevealed = true;
    flashCard.classList.add("revealed");
    cardHint.textContent = "答え";
    cardAnswer.textContent = getCardAnswer(element, cardFrontSelect.value);
    cardRevealButton.disabled = true;
  }

  function nextCard() {
    playSound("click");
    if (cardIndex < cardDeck.length - 1) {
      cardIndex++;
      showCard();
      return;
    }

    progressBar.style.width = "100%";
    flashCard.classList.add("revealed");
    cardHint.textContent = "暗記カード終了";
    cardFrontText.textContent = "完了";
    cardAnswer.textContent = "トップへ戻るか、もう一度暗記カードを選んで復習しよう。";
    cardRevealButton.disabled = true;
    cardNextButton.disabled = true;
  }

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.mode;
      if (mode === "random") {
        startQuiz({ mode: "random", title: "ランダム10問", questions: makeRandomQuestions(10) });
      }
      if (mode === "all") {
        startQuiz({ mode: "all", title: "全30問チェック", questions: makeAllElementQuestions() });
      }
      if (mode === "review") {
        startReviewMode();
      }
      if (mode === "cards") {
        startCardMode();
      }
      if (mode === "type") {
        playSound("click");
        startBgm();
        showTypeScreen();
      }
      if (mode === "exam") {
        startQuiz({
          mode: "exam",
          title: "小テスト本番",
          questions: makeAllElementQuestions(),
          showScoreDuringQuiz: false
        });
      }
    });
  });

  nextButton.addEventListener("click", () => {
    playSound("click");
    if (activeQuiz.index < activeQuiz.questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  quizBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
  });

  resultBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
  });

  reviewButton.addEventListener("click", startReviewMode);
  typeBackButton.addEventListener("click", showTopScreen);
  flashCard.addEventListener("click", revealCard);
  cardRevealButton.addEventListener("click", revealCard);
  cardNextButton.addEventListener("click", nextCard);
  cardBackButton.addEventListener("click", showTopScreen);
  cardFrontSelect.addEventListener("change", showCard);

  bgmToggle.addEventListener("click", () => {
    bgmOn = !bgmOn;
    localStorage.setItem(storageKeys.bgm, String(bgmOn));
    updateSoundControls();
    if (bgmOn) {
      startBgm();
    } else {
      stopBgm();
    }
  });

  sfxToggle.addEventListener("click", () => {
    sfxOn = !sfxOn;
    localStorage.setItem(storageKeys.sfx, String(sfxOn));
    updateSoundControls();
    playSound("click");
  });

  bgmVolume.addEventListener("input", () => {
    bgmVolumeValue = Number(bgmVolume.value);
    localStorage.setItem(storageKeys.bgmVolume, String(bgmVolumeValue));
    bgmVolumeLabel.textContent = `BGM音量：${bgmVolumeValue}%`;
    sounds.bgm.volume = bgmVolumeValue / 100;
  });

  sfxVolume.addEventListener("input", () => {
    sfxVolumeValue = Number(sfxVolume.value);
    localStorage.setItem(storageKeys.sfxVolume, String(sfxVolumeValue));
    sfxVolumeLabel.textContent = `効果音音量：${sfxVolumeValue}%`;
    setSfxVolume();
  });

  buildTypeButtons();
  updateSoundControls();
  showTopScreen();
});
