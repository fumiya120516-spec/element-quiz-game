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

  const valueGetters = {
    number: (element) => `${element.number}番`,
    name: (element) => element.name,
    symbol: (element) => element.symbol
  };

  const valueLabels = {
    number: "元素番号",
    name: "元素名",
    symbol: "元素記号"
  };

  const questionTypes = [
    {
      id: "from-number",
      label: "番号から答える",
      question: (element) => `元素番号 ${element.number} の元素名と元素記号は？`,
      promptValue: (element) => `${element.number}番`,
      answerKeys: ["name", "symbol"]
    },
    {
      id: "from-name",
      label: "元素名から答える",
      question: (element) => `「${element.name}」の元素番号と元素記号は？`,
      promptValue: (element) => element.name,
      answerKeys: ["number", "symbol"]
    },
    {
      id: "from-symbol",
      label: "元素記号から答える",
      question: (element) => `元素記号 ${element.symbol} の元素番号と元素名は？`,
      promptValue: (element) => element.symbol,
      answerKeys: ["number", "name"]
    }
  ];

  const screens = {
    mode: document.getElementById("modeScreen"),
    type: document.getElementById("typeScreen"),
    review: document.getElementById("reviewScreen"),
    cardSetup: document.getElementById("cardSetupScreen"),
    periodic: document.getElementById("periodicScreen"),
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
  const answerButton = document.getElementById("answerButton");
  const nextButton = document.getElementById("nextButton");
  const quizBackButton = document.getElementById("quizBackButton");
  const reviewButton = document.getElementById("reviewButton");
  const reviewListButton = document.getElementById("reviewListButton");
  const resultBackButton = document.getElementById("resultBackButton");
  const resultTitle = document.getElementById("resultTitle");
  const finalScoreText = document.getElementById("finalScoreText");
  const finalComment = document.getElementById("finalComment");
  const missedListArea = document.getElementById("missedListArea");
  const typeChoices = document.getElementById("typeChoices");
  const practiceStartButton = document.getElementById("practiceStartButton");
  const typeBackButton = document.getElementById("typeBackButton");
  const weakListArea = document.getElementById("weakListArea");
  const weakListMessage = document.getElementById("weakListMessage");
  const reviewAllButton = document.getElementById("reviewAllButton");
  const reviewSelectedButton = document.getElementById("reviewSelectedButton");
  const reviewListBackButton = document.getElementById("reviewListBackButton");
  const weakResetButton = document.getElementById("weakResetButton");
  const cardSetupChoices = document.getElementById("cardSetupChoices");
  const cardStartButton = document.getElementById("cardStartButton");
  const cardSetupBackButton = document.getElementById("cardSetupBackButton");
  const periodicSearch = document.getElementById("periodicSearch");
  const periodicTableArea = document.getElementById("periodicTableArea");
  const periodicMessage = document.getElementById("periodicMessage");
  const periodicBackButton = document.getElementById("periodicBackButton");
  const bgmToggle = document.getElementById("bgmToggle");
  const sfxToggle = document.getElementById("sfxToggle");
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
    sfx: "elementQuizSfxOn"
  };

  const BGM_VOLUME = 0.15;
  const SFX_VOLUME = 0.45;

  const sounds = {
    click: createAudio("./assets/sounds/click.mp3", SFX_VOLUME),
    correct: createAudio("./assets/sounds/correct.mp3", SFX_VOLUME),
    wrong: createAudio("./assets/sounds/wrong.mp3", SFX_VOLUME),
    result: createAudio("./assets/sounds/result.mp3", SFX_VOLUME),
    bgm: createAudio("./assets/sounds/bgm.mp3", BGM_VOLUME, true)
  };

  let bgmOn = localStorage.getItem(storageKeys.bgm) === "true";
  let sfxOn = localStorage.getItem(storageKeys.sfx) !== "false";
  let weakList = loadWeakList();
  let activeQuiz = null;
  let cardDeck = [];
  let cardIndex = 0;
  let cardRevealed = false;
  let selectedWeakNumbers = [];

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

  function applyFixedVolumes() {
    sounds.bgm.volume = BGM_VOLUME;
    ["click", "correct", "wrong", "result"].forEach((name) => {
      sounds[name].volume = SFX_VOLUME;
    });
  }

  function applyBgmVolume() {
    sounds.bgm.volume = BGM_VOLUME;
  }

  function playSound(name) {
    if (!sfxOn || !sounds[name] || sounds[name].dataset.failed === "true") {
      return;
    }

    try {
      const sound = sounds[name].cloneNode(true);
      sound.volume = SFX_VOLUME;
      sound.currentTime = 0;
      sound.play().catch((error) => {
        console.warn(`効果音を再生できませんでした: ${name}`, error);
      });
    } catch (error) {
      console.warn(`効果音を準備できませんでした: ${name}`, error);
    }
  }

  function startBgm() {
    if (!bgmOn || sounds.bgm.dataset.failed === "true") {
      return;
    }

    try {
      applyBgmVolume();
      sounds.bgm.play().catch((error) => {
        console.warn("BGMを再生できませんでした", error);
      });
    } catch (error) {
      console.warn("BGMを準備できませんでした", error);
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
    applyFixedVolumes();
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

  function makeOptionSet(element, key) {
    const correct = valueGetters[key](element);
    const wrongOptions = elements
      .filter((candidate) => candidate.number !== element.number)
      .map((candidate) => valueGetters[key](candidate));

    return shuffle([correct, ...shuffle(wrongOptions).slice(0, 3)]);
  }

  function makeQuestion(element, type = randomItem(questionTypes)) {
    const groups = type.answerKeys.map((key, index) => ({
      key,
      label: valueLabels[key],
      step: `実験ステップ${index + 1}`,
      correct: valueGetters[key](element),
      options: makeOptionSet(element, key)
    }));

    return {
      element,
      type,
      prompt: type.question(element),
      promptValue: type.promptValue(element),
      groups,
      selected: {},
      userAnswers: {}
    };
  }

  function makeRandomQuestions(count, sourceElements = elements, typeSource = questionTypes) {
    const selectedElements = count <= sourceElements.length
      ? shuffle(sourceElements).slice(0, count)
      : Array.from({ length: count }, () => randomItem(sourceElements));
    return selectedElements.map((element) => makeQuestion(element, randomItem(typeSource)));
  }

  function makeElementSetQuestions({ count, ordered = false, typeSource = questionTypes }) {
    const orderedElements = [...elements].sort((a, b) => a.number - b.number);
    const sourceElements = ordered
      ? orderedElements.slice(0, count)
      : (count === elements.length ? shuffle(elements) : shuffle(elements).slice(0, count));
    const sortedElements = ordered ? sourceElements : sourceElements;

    return sortedElements.map((element) => makeQuestion(element, randomItem(typeSource)));
  }

  function showOnly(screenName) {
    Object.entries(screens).forEach(([name, screen]) => {
      screen.classList.toggle("hidden", name !== screenName);
    });

    const inQuiz = screenName === "quiz";
    const showStatus = inQuiz || screenName === "card";
    scoreBox.classList.toggle("hidden", !showStatus);
    progress.classList.toggle("hidden", !inQuiz && screenName !== "card");
  }

  function showTopScreen() {
    showOnly("mode");
    screenLead.textContent = "練習、本番、復習、暗記を選んで、小テスト対策を始めよう。";
    progressBar.style.width = "0";
    scoreText.textContent = "0点";
    questionCount.textContent = "";
    missedListArea.innerHTML = "";
    quizBackButton.classList.remove("hidden");
    reviewListButton.classList.add("hidden");
    updateSoundControls();
  }

  function showPracticeScreen() {
    showOnly("type");
    screenLead.textContent = "練習条件を選べます。初期設定のままなら、短時間のランダム10問です。";
    buildPracticeSettings();
  }

  function showPeriodicScreen() {
    showOnly("periodic");
    screenLead.textContent = "小テスト範囲の30元素を、周期表風の研究データカードで確認できます。";
    periodicSearch.value = "";
    periodicMessage.textContent = "";
    periodicMessage.className = "result-message";
    renderPeriodicTable(elements);
  }

  function renderPeriodicTable(sourceElements) {
    const sortedElements = [...sourceElements].sort((a, b) => a.number - b.number);
    if (sortedElements.length === 0) {
      periodicTableArea.innerHTML = "";
      periodicMessage.textContent = "見つかる元素がありません。";
      periodicMessage.className = "result-message bad";
      return;
    }

    periodicMessage.textContent = `${sortedElements.length}個の元素を表示中`;
    periodicMessage.className = "result-message good";
    periodicTableArea.innerHTML = sortedElements.map((element) => `
      <article class="periodic-cell">
        <span>${element.number}番</span>
        <strong>${element.symbol}</strong>
        <em>${element.name}</em>
      </article>
    `).join("");
  }

  function filterPeriodicTable() {
    const keyword = periodicSearch.value.trim().toLowerCase();
    const filtered = elements.filter((element) => {
      return String(element.number).includes(keyword)
        || element.symbol.toLowerCase().includes(keyword)
        || element.name.toLowerCase().includes(keyword);
    });
    renderPeriodicTable(filtered);
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
    question.selected = {};
    question.userAnswers = {};
    questionType.textContent = activeQuiz.mode === "review" ? `苦手復習：${question.type.label}` : question.type.label;
    questionText.textContent = question.prompt;
    resultMessage.textContent = "";
    resultMessage.className = "result-message";
    choices.innerHTML = "";
    answerButton.disabled = false;
    quizBackButton.classList.remove("hidden");
    nextButton.disabled = true;
    nextButton.textContent = activeQuiz.index === activeQuiz.questions.length - 1 ? "結果を見る" : "次の問題へ";

    const wrapper = document.createElement("div");
    wrapper.className = "answer-groups";

    question.groups.forEach((group) => {
      const groupBox = document.createElement("section");
      groupBox.className = "choice-group";
      groupBox.innerHTML = `
        <div class="choice-group-title">
          <span>${group.step}</span>
          <strong>${group.label}を選ぶ</strong>
        </div>
      `;

      const optionGrid = document.createElement("div");
      optionGrid.className = "group-options";

      group.options.forEach((option) => {
        const button = document.createElement("button");
        button.className = "choice-button";
        button.type = "button";
        button.textContent = option;
        button.addEventListener("click", () => selectOption(question, group.key, option, button, optionGrid));
        optionGrid.appendChild(button);
      });

      groupBox.appendChild(optionGrid);
      wrapper.appendChild(groupBox);
    });

    choices.appendChild(wrapper);
    updateQuizStatus();
  }

  function selectOption(question, key, option, selectedButton, optionGrid) {
    if (activeQuiz.answered) {
      return;
    }

    playSound("click");
    question.selected[key] = option;
    [...optionGrid.children].forEach((button) => button.classList.remove("selected"));
    selectedButton.classList.add("selected");
    resultMessage.textContent = "";
    resultMessage.className = "result-message";
  }

  function answerQuestion() {
    if (activeQuiz.answered) {
      return;
    }

    const question = activeQuiz.questions[activeQuiz.index];
    const selectedCount = question.groups.filter((group) => question.selected[group.key]).length;

    if (selectedCount === 0) {
      resultMessage.textContent = "2つ選んでね。";
      resultMessage.className = "result-message bad";
      return;
    }

    if (selectedCount === 1) {
      resultMessage.textContent = "もう1つ選んでね。";
      resultMessage.className = "result-message bad";
      return;
    }

    playSound("click");
    activeQuiz.answered = true;
    answerButton.disabled = true;

    question.groups.forEach((group) => {
      question.userAnswers[group.key] = question.selected[group.key];
    });

    const correct = question.groups.every((group) => question.selected[group.key] === group.correct);

    if (correct) {
      playSound("correct");
      activeQuiz.score++;
      resultMessage.textContent = "実験成功！2つとも正解です。";
      resultMessage.classList.add("good");
      if (activeQuiz.removeWeakOnCorrect) {
        removeWeakElement(question.element);
      }
    } else {
      playSound("wrong");
      resultMessage.textContent = activeQuiz.mode === "exam"
        ? "記録しました。結果画面で確認できます。"
        : `再実験！正解は ${formatCorrectAnswer(question)} です。`;
      resultMessage.classList.add("bad");
      activeQuiz.missed.push(question);
      if (activeQuiz.saveMistakes) {
        addWeakElement(question.element);
      }
    }

    markAnsweredChoices(question);
    activeQuiz.index++;
    nextButton.disabled = false;
    updateQuizStatus();
  }

  function markAnsweredChoices(question) {
    choices.querySelectorAll(".choice-button").forEach((button) => {
      button.disabled = true;
      question.groups.forEach((group) => {
        if (button.textContent === group.correct) {
          button.classList.add("correct");
        }
        if (button.textContent === question.selected[group.key] && question.selected[group.key] !== group.correct) {
          button.classList.add("wrong");
        }
      });
    });
  }

  function formatCorrectAnswer(question) {
    return question.groups.map((group) => `${group.label}：${group.correct}`).join("、");
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
    reviewListButton.classList.toggle("hidden", activeQuiz.mode !== "review");
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

    const items = missed.map((question) => {
      const correctRows = question.groups
        .map((group) => `<em>${group.label}：${group.correct}</em>`)
        .join("");
      const userRows = question.groups
        .map((group) => `<em>${group.label}：${question.userAnswers[group.key] || "未回答"}</em>`)
        .join("");

      return `
        <li>
          <span>${question.type.label}</span>
          <strong>問題：${question.promptValue}</strong>
          <div class="answer-report">
            <b>正解</b>
            ${correctRows}
          </div>
          <div class="answer-report user-answer-report">
            <b>あなたの答え</b>
            ${userRows}
          </div>
        </li>
      `;
    }).join("");

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
    showReviewListScreen();
  }

  function startReviewQuiz(reviewElements) {
    const questions = shuffle(reviewElements).map((element) => makeQuestion(element, randomItem(questionTypes)));
    startQuiz({
      mode: "review",
      title: "苦手復習",
      questions,
      removeWeakOnCorrect: true,
      saveMistakes: true
    });
  }

  function showReviewListScreen() {
    showOnly("review");
    screenLead.textContent = "苦手リストを確認して、まとめて復習するか、元素を選んで復習できます。";
    selectedWeakNumbers = [];
    weakListMessage.textContent = "";
    weakListMessage.className = "result-message";
    renderWeakList();
  }

  function renderWeakList() {
    const weakElements = weakList.map(getElementByNumber).filter(Boolean).sort((a, b) => a.number - b.number);

    if (weakElements.length === 0) {
      weakListArea.innerHTML = `
        <div class="weak-empty">
          <strong>苦手な元素はまだありません</strong><br>
          クイズで間違えるとここに追加されます。
        </div>
      `;
      reviewAllButton.disabled = true;
      reviewSelectedButton.disabled = false;
      weakResetButton.disabled = true;
      weakResetButton.classList.add("hidden");
      return;
    }

    reviewAllButton.disabled = false;
    reviewSelectedButton.disabled = false;
    weakResetButton.disabled = false;
    weakResetButton.classList.remove("hidden");
    const cards = weakElements.map((element) => `
      <button class="weak-card" type="button" data-number="${element.number}">
        <span>${element.number}番</span>
        <strong>${element.name}</strong>
        <em>${element.symbol}</em>
      </button>
    `).join("");

    weakListArea.innerHTML = `<div class="weak-card-grid">${cards}</div>`;
    weakListArea.querySelectorAll(".weak-card").forEach((card) => {
      card.addEventListener("click", () => {
        playSound("click");
        const number = Number(card.dataset.number);
        if (selectedWeakNumbers.includes(number)) {
          selectedWeakNumbers = selectedWeakNumbers.filter((selectedNumber) => selectedNumber !== number);
          card.classList.remove("selected");
        } else {
          selectedWeakNumbers.push(number);
          card.classList.add("selected");
        }
        weakListMessage.textContent = "";
        weakListMessage.className = "result-message";
      });
    });
  }

  function buildPracticeSettings() {
    typeChoices.innerHTML = "";
    const practiceSettings = {
      type: "random",
      count: 10,
      order: "random"
    };

    const typeOptions = [
      {
        id: "random",
        label: "完全ランダム",
        random: true
      },
      ...questionTypes
    ];

    const countOptions = [
      { id: 10, label: "10問" },
      { id: 30, label: "30問" }
    ];

    const orderOptions = [
      { id: "random", label: "ランダム" },
      { id: "ordered", label: "元素番号順" }
    ];

    const typeSection = document.createElement("section");
    typeSection.className = "type-section";
    typeSection.innerHTML = "<h3>1. 出題タイプを選ぶ</h3>";

    const typeGrid = document.createElement("div");
    typeGrid.className = "type-option-grid";

    typeOptions.forEach((type) => {
      const button = document.createElement("button");
      button.className = "type-button";
      button.type = "button";
      button.textContent = type.label;
      button.classList.toggle("selected", type.id === practiceSettings.type);
      button.addEventListener("click", () => {
        practiceSettings.type = type.id;
        screenLead.textContent = "出題タイプを選びました。問題数と出題順も確認してスタートできます。";
        typeGrid.querySelectorAll(".type-button").forEach((typeButton) => typeButton.classList.remove("selected"));
        button.classList.add("selected");
      });
      typeGrid.appendChild(button);
    });

    typeSection.appendChild(typeGrid);

    const countSection = document.createElement("section");
    countSection.className = "type-section";
    countSection.innerHTML = "<h3>2. 問題数を選ぶ</h3>";

    const countGrid = document.createElement("div");
    countGrid.className = "count-option-grid";

    countOptions.forEach((countOption) => {
      const button = document.createElement("button");
      button.className = "type-button";
      button.type = "button";
      button.textContent = countOption.label;
      button.classList.toggle("selected", countOption.id === practiceSettings.count);
      button.addEventListener("click", () => {
        practiceSettings.count = countOption.id;
        screenLead.textContent = "問題数を選びました。スタートで練習を始められます。";
        countGrid.querySelectorAll(".type-button").forEach((countButton) => countButton.classList.remove("selected"));
        button.classList.add("selected");
      });
      countGrid.appendChild(button);
    });

    countSection.appendChild(countGrid);

    const orderSection = document.createElement("section");
    orderSection.className = "type-section";
    orderSection.innerHTML = "<h3>3. 出題順を選ぶ</h3>";

    const orderGrid = document.createElement("div");
    orderGrid.className = "order-option-grid";

    orderOptions.forEach((orderOption) => {
      const button = document.createElement("button");
      button.className = "type-button";
      button.type = "button";
      button.textContent = orderOption.label;
      button.classList.toggle("selected", orderOption.id === practiceSettings.order);
      button.addEventListener("click", () => {
        practiceSettings.order = orderOption.id;
        screenLead.textContent = "出題順を選びました。スタートで練習を始められます。";
        orderGrid.querySelectorAll(".type-button").forEach((orderButton) => orderButton.classList.remove("selected"));
        button.classList.add("selected");
      });
      orderGrid.appendChild(button);
    });

    orderSection.appendChild(orderGrid);
    typeChoices.appendChild(typeSection);
    typeChoices.appendChild(countSection);
    typeChoices.appendChild(orderSection);

    practiceStartButton.onclick = () => {
      const selectedType = typeOptions.find((type) => type.id === practiceSettings.type);
      const typeSource = selectedType.random ? questionTypes : [selectedType];
      const questions = makeElementSetQuestions({
        count: practiceSettings.count,
        ordered: practiceSettings.order === "ordered",
        typeSource
      });
      startQuiz({
        mode: "practice",
        title: "練習モード",
        questions
      });
    };
  }

  function startCardMode() {
    playSound("click");
    startBgm();
    showCardSetupScreen();
  }

  function showCardSetupScreen() {
    showOnly("cardSetup");
    screenLead.textContent = "暗記カードは30枚固定です。表示する順番を選んで始めましょう。";
    buildCardSetup();
  }

  function buildCardSetup() {
    cardSetupChoices.innerHTML = "";
    let selectedOrder = "random";

    const section = document.createElement("section");
    section.className = "type-section";
    section.innerHTML = "<h3>カードの順番を選ぶ</h3>";

    const grid = document.createElement("div");
    grid.className = "card-order-grid";

    [
      { id: "random", label: "ランダム順" },
      { id: "ordered", label: "元素番号順" }
    ].forEach((option) => {
      const button = document.createElement("button");
      button.className = "type-button";
      button.type = "button";
      button.textContent = option.label;
      button.classList.toggle("selected", option.id === selectedOrder);
      button.addEventListener("click", () => {
        playSound("click");
        selectedOrder = option.id;
        grid.querySelectorAll(".type-button").forEach((orderButton) => orderButton.classList.remove("selected"));
        button.classList.add("selected");
      });
      grid.appendChild(button);
    });

    section.appendChild(grid);
    cardSetupChoices.appendChild(section);

    cardStartButton.onclick = () => {
      startCardDeck(selectedOrder);
    };
  }

  function startCardDeck(order) {
    playSound("click");
    cardDeck = order === "ordered"
      ? [...elements].sort((a, b) => a.number - b.number)
      : shuffle(elements);
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
      if (mode === "practice") {
        playSound("click");
        startBgm();
        showPracticeScreen();
      }
      if (mode === "review") {
        startReviewMode();
      }
      if (mode === "cards") {
        startCardMode();
      }
      if (mode === "periodic") {
        playSound("click");
        showPeriodicScreen();
      }
      if (mode === "exam") {
        startQuiz({
          mode: "exam",
          title: "小テスト本番",
          questions: makeElementSetQuestions({ count: elements.length }),
          showScoreDuringQuiz: false
        });
      }
    });
  });

  answerButton.addEventListener("click", answerQuestion);

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
    if (activeQuiz && activeQuiz.mode === "exam") {
      const confirmed = window.confirm("小テスト本番を終了してトップに戻りますか？");
      if (!confirmed) {
        return;
      }
    }
    showTopScreen();
  });

  resultBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
  });

  reviewAllButton.addEventListener("click", () => {
    playSound("click");
    const weakElements = weakList.map(getElementByNumber).filter(Boolean);
    if (weakElements.length === 0) {
      weakListMessage.textContent = "苦手な元素はまだありません。";
      weakListMessage.className = "result-message bad";
      return;
    }
    startReviewQuiz(weakElements);
  });

  reviewSelectedButton.addEventListener("click", () => {
    playSound("click");
    const reviewElements = selectedWeakNumbers.map(getElementByNumber).filter(Boolean);
    if (reviewElements.length === 0) {
      weakListMessage.textContent = "復習する元素を選んでください。";
      weakListMessage.className = "result-message bad";
      return;
    }
    startReviewQuiz(reviewElements);
  });

  reviewButton.addEventListener("click", startReviewMode);
  reviewListButton.addEventListener("click", () => {
    playSound("click");
    showReviewListScreen();
  });
  reviewListBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
  });
  weakResetButton.addEventListener("click", () => {
    playSound("click");
    const confirmed = window.confirm("苦手リストをすべて削除しますか？この操作は元に戻せません。");
    if (!confirmed) {
      return;
    }

    weakList = [];
    selectedWeakNumbers = [];
    saveWeakList();
    renderWeakList();
    weakListMessage.textContent = "苦手リストをリセットしました。";
    weakListMessage.className = "result-message good";
  });
  typeBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
  });
  flashCard.addEventListener("click", revealCard);
  cardRevealButton.addEventListener("click", revealCard);
  cardNextButton.addEventListener("click", nextCard);
  cardBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
  });
  cardSetupBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
  });
  periodicSearch.addEventListener("input", filterPeriodicTable);
  periodicBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
  });
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

  applyFixedVolumes();
  updateSoundControls();
  showTopScreen();
});
