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
    finalSetup: document.getElementById("finalSetupScreen"),
    examConfirm: document.getElementById("examConfirmScreen"),
    settings: document.getElementById("settingsScreen"),
    guide: document.getElementById("guideScreen"),
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
  const retryMissedButton = document.getElementById("retryMissedButton");
  const reviewListButton = document.getElementById("reviewListButton");
  const resultBackButton = document.getElementById("resultBackButton");
  const resultTitle = document.getElementById("resultTitle");
  const finalScoreText = document.getElementById("finalScoreText");
  const finalComment = document.getElementById("finalComment");
  const missedListArea = document.getElementById("missedListArea");
  const todayStats = document.getElementById("todayStats");
  const typeChoices = document.getElementById("typeChoices");
  const practiceStartButton = document.getElementById("practiceStartButton");
  const typeBackButton = document.getElementById("typeBackButton");
  const finalSetupChoices = document.getElementById("finalSetupChoices");
  const finalStartButton = document.getElementById("finalStartButton");
  const finalSetupBackButton = document.getElementById("finalSetupBackButton");
  const examConfirmPanel = document.getElementById("examConfirmPanel");
  const examStartButton = document.getElementById("examStartButton");
  const examConfirmBackButton = document.getElementById("examConfirmBackButton");
  const settingsResetWeakButton = document.getElementById("settingsResetWeakButton");
  const settingsResetDailyButton = document.getElementById("settingsResetDailyButton");
  const settingsResetAllButton = document.getElementById("settingsResetAllButton");
  const settingsMessage = document.getElementById("settingsMessage");
  const settingsBackButton = document.getElementById("settingsBackButton");
  const guideBackButton = document.getElementById("guideBackButton");
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
  const periodicListViewButton = document.getElementById("periodicListViewButton");
  const periodicTableViewButton = document.getElementById("periodicTableViewButton");
  const periodicTableArea = document.getElementById("periodicTableArea");
  const periodicMessage = document.getElementById("periodicMessage");
  const periodicActionPanel = document.getElementById("periodicActionPanel");
  const periodicBackButton = document.getElementById("periodicBackButton");
  const quizMeta = document.getElementById("quizMeta");
  const timerBox = document.getElementById("timerBox");
  const timerText = document.getElementById("timerText");
  const comboBox = document.getElementById("comboBox");
  const comboText = document.getElementById("comboText");
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
    sfx: "elementQuizSfxOn",
    daily: "elementQuizDailyStats"
  };
  const managedStorageKeys = Object.values(storageKeys);

  const kanjiNotes = {
    16: "「硫」の字に注意",
    17: "「塩」の字に注意",
    29: "金属名の漢字に注意",
    30: "「亜」と「鉛」の組み合わせに注意",
    35: "「臭」の字に注意",
    47: "「銀」は金属の名前にも使う漢字",
    78: "「しろがね」ではなく「はっきん」と読む",
    82: "読みは「なまり」"
  };

  const periodicPositions = {
    1: { period: 1, group: 1 },
    2: { period: 1, group: 18 },
    3: { period: 2, group: 1 },
    4: { period: 2, group: 2 },
    5: { period: 2, group: 13 },
    6: { period: 2, group: 14 },
    7: { period: 2, group: 15 },
    8: { period: 2, group: 16 },
    9: { period: 2, group: 17 },
    10: { period: 2, group: 18 },
    11: { period: 3, group: 1 },
    12: { period: 3, group: 2 },
    13: { period: 3, group: 13 },
    14: { period: 3, group: 14 },
    15: { period: 3, group: 15 },
    16: { period: 3, group: 16 },
    17: { period: 3, group: 17 },
    18: { period: 3, group: 18 },
    19: { period: 4, group: 1 },
    20: { period: 4, group: 2 },
    25: { period: 4, group: 7 },
    26: { period: 4, group: 8 },
    29: { period: 4, group: 11 },
    30: { period: 4, group: 12 },
    35: { period: 4, group: 17 },
    47: { period: 5, group: 11 },
    53: { period: 5, group: 17 },
    78: { period: 6, group: 10 },
    79: { period: 6, group: 11 },
    82: { period: 6, group: 14 }
  };

  const fullPeriodicElements = [
    { number: 1, symbol: "H", name: "水素", period: 1, group: 1 },
    { number: 2, symbol: "He", name: "ヘリウム", period: 1, group: 18 },
    { number: 3, symbol: "Li", name: "リチウム", period: 2, group: 1 },
    { number: 4, symbol: "Be", name: "ベリリウム", period: 2, group: 2 },
    { number: 5, symbol: "B", name: "ホウ素", period: 2, group: 13 },
    { number: 6, symbol: "C", name: "炭素", period: 2, group: 14 },
    { number: 7, symbol: "N", name: "窒素", period: 2, group: 15 },
    { number: 8, symbol: "O", name: "酸素", period: 2, group: 16 },
    { number: 9, symbol: "F", name: "フッ素", period: 2, group: 17 },
    { number: 10, symbol: "Ne", name: "ネオン", period: 2, group: 18 },
    { number: 11, symbol: "Na", name: "ナトリウム", period: 3, group: 1 },
    { number: 12, symbol: "Mg", name: "マグネシウム", period: 3, group: 2 },
    { number: 13, symbol: "Al", name: "アルミニウム", period: 3, group: 13 },
    { number: 14, symbol: "Si", name: "ケイ素", period: 3, group: 14 },
    { number: 15, symbol: "P", name: "リン", period: 3, group: 15 },
    { number: 16, symbol: "S", name: "硫黄", period: 3, group: 16 },
    { number: 17, symbol: "Cl", name: "塩素", period: 3, group: 17 },
    { number: 18, symbol: "Ar", name: "アルゴン", period: 3, group: 18 },
    { number: 19, symbol: "K", name: "カリウム", period: 4, group: 1 },
    { number: 20, symbol: "Ca", name: "カルシウム", period: 4, group: 2 },
    { number: 21, symbol: "Sc", name: "スカンジウム", period: 4, group: 3 },
    { number: 22, symbol: "Ti", name: "チタン", period: 4, group: 4 },
    { number: 23, symbol: "V", name: "バナジウム", period: 4, group: 5 },
    { number: 24, symbol: "Cr", name: "クロム", period: 4, group: 6 },
    { number: 25, symbol: "Mn", name: "マンガン", period: 4, group: 7 },
    { number: 26, symbol: "Fe", name: "鉄", period: 4, group: 8 },
    { number: 27, symbol: "Co", name: "コバルト", period: 4, group: 9 },
    { number: 28, symbol: "Ni", name: "ニッケル", period: 4, group: 10 },
    { number: 29, symbol: "Cu", name: "銅", period: 4, group: 11 },
    { number: 30, symbol: "Zn", name: "亜鉛", period: 4, group: 12 },
    { number: 31, symbol: "Ga", name: "ガリウム", period: 4, group: 13 },
    { number: 32, symbol: "Ge", name: "ゲルマニウム", period: 4, group: 14 },
    { number: 33, symbol: "As", name: "ヒ素", period: 4, group: 15 },
    { number: 34, symbol: "Se", name: "セレン", period: 4, group: 16 },
    { number: 35, symbol: "Br", name: "臭素", period: 4, group: 17 },
    { number: 36, symbol: "Kr", name: "クリプトン", period: 4, group: 18 },
    { number: 37, symbol: "Rb", name: "ルビジウム", period: 5, group: 1 },
    { number: 38, symbol: "Sr", name: "ストロンチウム", period: 5, group: 2 },
    { number: 39, symbol: "Y", name: "イットリウム", period: 5, group: 3 },
    { number: 40, symbol: "Zr", name: "ジルコニウム", period: 5, group: 4 },
    { number: 41, symbol: "Nb", name: "ニオブ", period: 5, group: 5 },
    { number: 42, symbol: "Mo", name: "モリブデン", period: 5, group: 6 },
    { number: 43, symbol: "Tc", name: "テクネチウム", period: 5, group: 7 },
    { number: 44, symbol: "Ru", name: "ルテニウム", period: 5, group: 8 },
    { number: 45, symbol: "Rh", name: "ロジウム", period: 5, group: 9 },
    { number: 46, symbol: "Pd", name: "パラジウム", period: 5, group: 10 },
    { number: 47, symbol: "Ag", name: "銀", period: 5, group: 11 },
    { number: 48, symbol: "Cd", name: "カドミウム", period: 5, group: 12 },
    { number: 49, symbol: "In", name: "インジウム", period: 5, group: 13 },
    { number: 50, symbol: "Sn", name: "スズ", period: 5, group: 14 },
    { number: 51, symbol: "Sb", name: "アンチモン", period: 5, group: 15 },
    { number: 52, symbol: "Te", name: "テルル", period: 5, group: 16 },
    { number: 53, symbol: "I", name: "ヨウ素", period: 5, group: 17 },
    { number: 54, symbol: "Xe", name: "キセノン", period: 5, group: 18 },
    { number: 55, symbol: "Cs", name: "セシウム", period: 6, group: 1 },
    { number: 56, symbol: "Ba", name: "バリウム", period: 6, group: 2 },
    { number: 72, symbol: "Hf", name: "ハフニウム", period: 6, group: 4 },
    { number: 73, symbol: "Ta", name: "タンタル", period: 6, group: 5 },
    { number: 74, symbol: "W", name: "タングステン", period: 6, group: 6 },
    { number: 75, symbol: "Re", name: "レニウム", period: 6, group: 7 },
    { number: 76, symbol: "Os", name: "オスミウム", period: 6, group: 8 },
    { number: 77, symbol: "Ir", name: "イリジウム", period: 6, group: 9 },
    { number: 78, symbol: "Pt", name: "白金", period: 6, group: 10 },
    { number: 79, symbol: "Au", name: "金", period: 6, group: 11 },
    { number: 80, symbol: "Hg", name: "水銀", period: 6, group: 12 },
    { number: 81, symbol: "Tl", name: "タリウム", period: 6, group: 13 },
    { number: 82, symbol: "Pb", name: "鉛", period: 6, group: 14 },
    { number: 83, symbol: "Bi", name: "ビスマス", period: 6, group: 15 },
    { number: 84, symbol: "Po", name: "ポロニウム", period: 6, group: 16 },
    { number: 85, symbol: "At", name: "アスタチン", period: 6, group: 17 },
    { number: 86, symbol: "Rn", name: "ラドン", period: 6, group: 18 }
  ];

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
  let timerId = null;
  let cardDeck = [];
  let cardIndex = 0;
  let cardRevealed = false;
  let selectedWeakNumbers = [];
  let weakSortMode = "number";
  let cardReturnTarget = "top";
  let periodicReturnTarget = "top";
  let periodicSelectedElement = null;
  let periodicViewMode = "list";
  let userHasInteracted = false;

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

    if (!userHasInteracted) {
      return;
    }

    if (!sounds.bgm.paused) {
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

  function handleFirstUserInteraction() {
    userHasInteracted = true;
    removeBgmUnlockListeners();
    if (bgmOn) {
      startBgm();
    }
  }

  function removeBgmUnlockListeners() {
    document.removeEventListener("pointerdown", handleFirstUserInteraction, true);
    document.removeEventListener("touchstart", handleFirstUserInteraction, true);
    document.removeEventListener("click", handleFirstUserInteraction, true);
    document.removeEventListener("keydown", handleFirstUserInteraction, true);
  }

  function setupBgmUnlockListeners() {
    document.addEventListener("pointerdown", handleFirstUserInteraction, { capture: true, passive: true });
    document.addEventListener("touchstart", handleFirstUserInteraction, { capture: true, passive: true });
    document.addEventListener("click", handleFirstUserInteraction, true);
    document.addEventListener("keydown", handleFirstUserInteraction, true);
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

  function getTodayKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function loadDailyStats() {
    const fallback = { date: getTodayKey(), answered: 0, correct: 0, plays: 0 };
    try {
      const saved = JSON.parse(localStorage.getItem(storageKeys.daily) || "null");
      if (!saved || saved.date !== getTodayKey()) {
        return fallback;
      }
      const answered = Math.max(0, Math.floor(Number(saved.answered) || 0));
      const correct = Math.min(answered, Math.max(0, Math.floor(Number(saved.correct) || 0)));
      const plays = Math.max(0, Math.floor(Number(saved.plays) || 0));
      return {
        date: saved.date,
        answered,
        correct,
        plays
      };
    } catch (error) {
      return fallback;
    }
  }

  function saveDailyStats(stats) {
    localStorage.setItem(storageKeys.daily, JSON.stringify(stats));
  }

  function resetDailyStats() {
    saveDailyStats({ date: getTodayKey(), answered: 0, correct: 0, plays: 0 });
    renderTodayStats();
  }

  function addDailyResult(total, correct) {
    const stats = loadDailyStats();
    stats.answered += total;
    stats.correct += correct;
    stats.plays += 1;
    saveDailyStats(stats);
    renderTodayStats();
  }

  function renderTodayStats() {
    const stats = loadDailyStats();
    const rate = stats.answered === 0 ? 0 : Math.min(100, Math.round((stats.correct / stats.answered) * 100));
    const rateLabel = stats.answered === 0 ? "まだ記録なし" : "今日の正答率";
    todayStats.innerHTML = `
      <div class="today-stats-heading">
        <span>今日の学習</span>
        <div class="today-rate-display">
          <small>${rateLabel}</small>
          <strong>${rate}%</strong>
        </div>
      </div>
      <div class="today-stats-meter" aria-hidden="true">
        <span style="width: ${rate}%;"></span>
      </div>
      <div class="today-stats-grid">
        <span><b>${stats.answered}</b><small>解いた問題</small></span>
        <span><b>${stats.correct}</b><small>正解</small></span>
        <span><b>${rate}%</b><small>正答率</small></span>
        <span><b>${stats.plays}</b><small>プレイ</small></span>
      </div>
    `;
  }

  function loadWeakList() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKeys.weak) || "[]");
      if (!Array.isArray(saved)) {
        return [];
      }

      return saved.map((item) => {
        if (typeof item === "number" || typeof item === "string") {
          const element = getElementByNumber(item);
          if (!element) {
            return null;
          }
          return {
            number: element.number,
            mistakes: 1,
            lastMistakeAt: "",
            streak: 0
          };
        }

        const element = getElementByNumber(item.number);
        if (!element) {
          return null;
        }

        return {
          number: element.number,
          mistakes: Number.isFinite(Number(item.mistakes)) ? Number(item.mistakes) : 1,
          lastMistakeAt: item.lastMistakeAt || "",
          streak: Number(item.streak) || 0
        };
      }).filter(Boolean);
    } catch (error) {
      return [];
    }
  }

  function saveWeakList() {
    localStorage.setItem(storageKeys.weak, JSON.stringify(weakList));
  }

  function getWeakRecord(element) {
    return weakList.find((record) => record.number === element.number);
  }

  function addWeakElement(element, countMistake = true) {
    const now = new Date().toISOString();
    const record = getWeakRecord(element);

    if (record) {
      if (countMistake) {
        record.mistakes += 1;
        record.lastMistakeAt = now;
        record.streak = 0;
      }
      saveWeakList();
      return record;
    }

    const newRecord = {
      number: element.number,
      mistakes: countMistake ? 1 : 0,
      lastMistakeAt: countMistake ? now : "",
      streak: 0
    };
    weakList.push(newRecord);
    saveWeakList();
    return newRecord;
  }

  function removeWeakElement(element) {
    weakList = weakList.filter((record) => record.number !== element.number);
    saveWeakList();
  }

  function markWeakCorrect(element) {
    const record = getWeakRecord(element);
    if (!record) {
      return false;
    }

    record.streak += 1;
    if (record.streak >= 3) {
      removeWeakElement(element);
      return true;
    }

    saveWeakList();
    return false;
  }

  function formatDateLabel(isoText) {
    if (!isoText) {
      return "記録なし";
    }
    const date = new Date(isoText);
    if (Number.isNaN(date.getTime())) {
      return "記録なし";
    }
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }

  function getKanjiNote(element) {
    return kanjiNotes[element.number] || "";
  }

  function renderKanjiNote(element) {
    const note = getKanjiNote(element);
    return note ? `<small class="kanji-note">漢字メモ：${note}</small>` : "";
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

  function makeElementSetQuestions({ count, ordered = false, typeSource = questionTypes, sourceElements = elements }) {
    const orderedElements = [...sourceElements].sort((a, b) => a.number - b.number);
    const selectedElements = ordered
      ? orderedElements.slice(0, count)
      : (count >= sourceElements.length ? shuffle(sourceElements) : shuffle(sourceElements).slice(0, count));

    return selectedElements.map((element) => makeQuestion(element, randomItem(typeSource)));
  }

  function showOnly(screenName) {
    stopTimer();
    Object.entries(screens).forEach(([name, screen]) => {
      screen.classList.toggle("hidden", name !== screenName);
    });

    const inQuiz = screenName === "quiz";
    const showStatus = inQuiz || screenName === "card";
    todayStats.classList.toggle("hidden", screenName !== "mode");
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
    periodicActionPanel.classList.add("hidden");
    periodicActionPanel.innerHTML = "";
    updateSoundControls();
    renderTodayStats();
  }

  function showPracticeScreen() {
    showOnly("type");
    screenLead.textContent = "練習条件を選べます。初期設定のままなら、短時間のランダム10問です。";
    buildPracticeSettings();
  }

  function showFinalSetupScreen() {
    showOnly("finalSetup");
    screenLead.textContent = "苦手リストを優先して、短時間で最後の確認をします。";
    buildFinalSettings();
  }

  function showExamConfirmScreen() {
    showOnly("examConfirm");
    screenLead.textContent = "小テスト本番の内容を確認してからスタートします。";
    examConfirmPanel.innerHTML = `
      <div class="mission-grid">
        <span>モード</span><strong>小テスト本番</strong>
        <span>問題数</span><strong>30問</strong>
        <span>出題順</span><strong>ランダム</strong>
        <span>出題タイプ</span><strong>完全ランダム</strong>
        <span>出題範囲</span><strong>小テスト範囲30問</strong>
        <span>制限時間</span><strong>なし</strong>
      </div>
    `;
  }

  function showSettingsScreen() {
    showOnly("settings");
    screenLead.textContent = "保存データと音声設定を管理できます。";
    settingsMessage.textContent = "";
    settingsMessage.className = "result-message";
  }

  function showGuideScreen() {
    showOnly("guide");
    screenLead.textContent = "ゲームの使い方とおすすめ学習ルートを確認できます。";
  }

  function showPeriodicScreen() {
    periodicReturnTarget = "top";
    showOnly("periodic");
    screenLead.textContent = "小テスト範囲の30元素を、周期表風の研究データカードで確認できます。";
    periodicBackButton.textContent = "トップへ戻る";
    periodicSearch.value = "";
    periodicMessage.textContent = "";
    periodicMessage.className = "result-message";
    periodicActionPanel.classList.add("hidden");
    periodicActionPanel.innerHTML = "";
    periodicViewMode = "list";
    updatePeriodicViewButtons();
    renderPeriodicTable(elements);
  }

  function showPeriodicElementFromResult(elementNumber) {
    const targetElement = getElementByNumber(elementNumber);
    periodicReturnTarget = "result";
    showOnly("periodic");
    screenLead.textContent = "間違えた元素を普通の周期表表示で確認しています。";
    periodicBackButton.textContent = "結果画面に戻る";
    periodicSearch.value = "";
    periodicActionPanel.classList.add("hidden");
    periodicActionPanel.innerHTML = "";
    periodicViewMode = "table";
    updatePeriodicViewButtons();
    renderPeriodicTable(fullPeriodicElements);
    periodicMessage.textContent = targetElement
      ? `${targetElement.number}番 ${targetElement.name}（${targetElement.symbol}）を周期表で確認中です。`
      : "周期表で元素を確認中です。";
    periodicMessage.className = "result-message good";

    window.setTimeout(() => {
      const targetCell = periodicTableArea.querySelector(`.periodic-cell[data-number="${elementNumber}"]`);
      if (!targetCell) {
        return;
      }
      targetCell.classList.add("periodic-focus-target");
      targetCell.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      window.setTimeout(() => {
        targetCell.classList.remove("periodic-focus-target");
      }, 3200);
    }, 80);
  }

  function renderPeriodicTable(sourceElements) {
    if (periodicViewMode === "table") {
      renderFullPeriodicTable(sourceElements);
      return;
    }

    renderPeriodicList(sourceElements);
  }

  function renderPeriodicList(sourceElements) {
    const sortedElements = [...sourceElements].sort((a, b) => a.number - b.number);
    if (sortedElements.length === 0) {
      periodicTableArea.innerHTML = "";
      periodicMessage.textContent = "見つかる元素がありません。";
      periodicMessage.className = "result-message bad";
      return;
    }

    periodicMessage.textContent = `${sortedElements.length}個の元素を一覧表示中`;
    periodicMessage.className = "result-message good";
    periodicTableArea.innerHTML = `
      <div class="periodic-list-grid">
        ${sortedElements.map((element) => `
      <button class="periodic-cell periodic-list-cell" type="button" data-number="${element.number}">
        <span>${element.number}番</span>
        <strong>${element.symbol}</strong>
        <em>${element.name}</em>
        ${renderKanjiNote(element)}
      </button>
    `).join("")}
      </div>
    `;
    bindPeriodicCells();
  }

  function renderFullPeriodicTable(sourceElements) {
    const keywordNumbers = new Set(sourceElements.map((element) => element.number));
    const quizNumbers = new Set(elements.map((element) => element.number));
    const visibleElements = fullPeriodicElements.filter((element) => {
      if (periodicSearch.value.trim() === "") {
        return true;
      }
      return keywordNumbers.has(element.number);
    });

    if (visibleElements.length === 0) {
      periodicTableArea.innerHTML = "";
      periodicMessage.textContent = "見つかる元素がありません。";
      periodicMessage.className = "result-message bad";
      return;
    }

    periodicMessage.textContent = "参考用の周期表表示です。赤い枠が小テスト範囲です。";
    periodicMessage.className = "result-message good";
    periodicTableArea.innerHTML = `
      <div class="periodic-grid">
        ${Array.from({ length: 18 }, (_, index) => `<span class="periodic-group-label" style="grid-column:${index + 1};grid-row:1;">${index + 1}</span>`).join("")}
        ${Array.from({ length: 6 }, (_, index) => `<span class="periodic-period-label" style="grid-column:1;grid-row:${index + 2};">${index + 1}</span>`).join("")}
        ${visibleElements.map((element) => {
          const inQuizRange = quizNumbers.has(element.number);
          const canOpen = Boolean(getElementByNumber(element.number));
          return `
      <button class="periodic-cell periodic-table-cell${inQuizRange ? " in-range" : " out-range"}" type="button" data-number="${element.number}" style="grid-column:${element.group};grid-row:${element.period + 1};" ${canOpen ? "" : "disabled"}>
        <span>${element.number}</span>
        <strong>${element.symbol}</strong>
        <em>${element.name}</em>
      </button>
    `;
        }).join("")}
      </div>
    `;
    bindPeriodicCells();
  }

  function bindPeriodicCells() {
    periodicTableArea.querySelectorAll(".periodic-cell").forEach((cell) => {
      cell.addEventListener("click", () => {
        playSound("click");
        const element = getElementByNumber(cell.dataset.number);
        if (element) {
          showPeriodicActions(element);
        }
      });
    });
  }

  function filterPeriodicTable() {
    const keyword = periodicSearch.value.trim().toLowerCase();
    const source = periodicViewMode === "table" ? fullPeriodicElements : elements;
    const filtered = source.filter((element) => {
      return String(element.number).includes(keyword)
        || element.symbol.toLowerCase().includes(keyword)
        || element.name.toLowerCase().includes(keyword);
    });
    renderPeriodicTable(filtered);
  }

  function updatePeriodicViewButtons() {
    periodicListViewButton.classList.toggle("selected", periodicViewMode === "list");
    periodicTableViewButton.classList.toggle("selected", periodicViewMode === "table");
  }

  function showPeriodicActions(element) {
    periodicSelectedElement = element;
    periodicActionPanel.classList.remove("hidden");
    periodicActionPanel.innerHTML = `
      <div class="periodic-action-card">
        <p><strong>${element.number}番 ${element.name} ${element.symbol}</strong></p>
        ${renderKanjiNote(element)}
        <div class="periodic-action-buttons">
          <button id="periodicCardButton" class="main-button" type="button">この元素を暗記カードで見る</button>
          <button id="periodicPracticeButton" class="review-button" type="button">この元素だけ練習</button>
          <button id="periodicWeakButton" class="sub-button" type="button">苦手リストに追加</button>
          <button id="periodicCloseButton" class="sub-button" type="button">閉じる</button>
        </div>
      </div>
    `;

    document.getElementById("periodicCardButton").addEventListener("click", () => {
      playSound("click");
      cardReturnTarget = "periodic";
      cardDeck = [element];
      cardIndex = 0;
      showOnly("card");
      screenLead.textContent = `${element.name}だけを暗記カードで確認します。`;
      cardBackButton.textContent = "周期表に戻る";
      showCard();
    });

    document.getElementById("periodicPracticeButton").addEventListener("click", () => {
      startQuiz({
        mode: "periodic",
        title: "元素別練習",
        questions: [makeQuestion(element, randomItem(questionTypes))],
        returnToPeriodic: true
      });
    });

    document.getElementById("periodicWeakButton").addEventListener("click", () => {
      playSound("click");
      addWeakElement(element, false);
      periodicMessage.textContent = `${element.name}を苦手リストに追加しました。`;
      periodicMessage.className = "result-message good";
    });

    document.getElementById("periodicCloseButton").addEventListener("click", () => {
      playSound("click");
      periodicActionPanel.classList.add("hidden");
      periodicActionPanel.innerHTML = "";
    });
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
      combo: 0,
      maxCombo: 0,
      graduated: [],
      timerLimit: config.timerLimit || 0,
      returnToPeriodic: Boolean(config.returnToPeriodic),
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
    quizMeta.classList.remove("hidden");
    comboBox.classList.remove("hidden");
    comboText.textContent = activeQuiz.combo;
    setupTimerForQuestion();
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

  function setupTimerForQuestion() {
    stopTimer();
    if (!activeQuiz.timerLimit) {
      timerBox.classList.add("hidden");
      timerBox.classList.remove("timer-warning");
      return;
    }

    activeQuiz.timeLeft = activeQuiz.timerLimit;
    timerText.textContent = activeQuiz.timeLeft;
    timerBox.classList.remove("hidden", "timer-warning");
    timerId = window.setInterval(() => {
      activeQuiz.timeLeft -= 1;
      timerText.textContent = activeQuiz.timeLeft;
      timerBox.classList.toggle("timer-warning", activeQuiz.timeLeft <= 5);
      if (activeQuiz.timeLeft <= 0) {
        handleTimeUp();
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function handleTimeUp() {
    if (!activeQuiz || activeQuiz.answered) {
      return;
    }

    stopTimer();
    const question = activeQuiz.questions[activeQuiz.index];
    activeQuiz.answered = true;
    answerButton.disabled = true;
    question.groups.forEach((group) => {
      question.userAnswers[group.key] = question.selected[group.key] || "時間切れ";
    });
    activeQuiz.combo = 0;
    comboText.textContent = activeQuiz.combo;
    playSound("wrong");
    resultMessage.textContent = `時間切れです。正解は ${formatCorrectAnswer(question)} です。`;
    resultMessage.className = "result-message bad";
    activeQuiz.missed.push(question);
    if (activeQuiz.saveMistakes) {
      addWeakElement(question.element);
    }
    markAnsweredChoices(question);
    activeQuiz.index++;
    nextButton.disabled = false;
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
    stopTimer();
    activeQuiz.answered = true;
    answerButton.disabled = true;

    question.groups.forEach((group) => {
      question.userAnswers[group.key] = question.selected[group.key];
    });

    const correct = question.groups.every((group) => question.selected[group.key] === group.correct);

    if (correct) {
      playSound("correct");
      activeQuiz.score++;
      activeQuiz.combo++;
      activeQuiz.maxCombo = Math.max(activeQuiz.maxCombo, activeQuiz.combo);
      comboText.textContent = activeQuiz.combo;
      const comboMessage = getComboMessage(activeQuiz.combo);
      resultMessage.textContent = comboMessage
        ? `実験成功！2つとも正解です。${comboMessage}`
        : "実験成功！2つとも正解です。";
      resultMessage.classList.add("good");
      if (activeQuiz.removeWeakOnCorrect) {
        const graduated = markWeakCorrect(question.element);
        if (graduated) {
          activeQuiz.graduated.push(question.element);
          resultMessage.textContent += ` ${question.element.name}を苦手リストから卒業しました！`;
        }
      }
    } else {
      playSound("wrong");
      activeQuiz.combo = 0;
      comboText.textContent = activeQuiz.combo;
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

  function getComboMessage(combo) {
    if (combo > 0 && combo % 10 === 0) {
      return `${combo}連続正解！元素記号クイズ上級者に近づいています！`;
    }
    if (combo > 0 && combo % 5 === 0) {
      return `${combo}連続正解！`;
    }
    return "";
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
    stopTimer();
    showOnly("result");
    const total = activeQuiz.questions.length;
    const percent = Math.round((activeQuiz.score / total) * 100);
    addDailyResult(total, activeQuiz.score);
    resultTitle.textContent = activeQuiz.mode === "exam" ? "小テスト結果レポート" : "研究結果レポート";
    finalScoreText.textContent = `${activeQuiz.score} / ${total} 点`;
    finalComment.textContent = `${getScoreComment(activeQuiz.score, total, percent)} 最高コンボ：${activeQuiz.maxCombo}連続`;
    renderMissedList(activeQuiz.missed, total, percent);
    reviewButton.classList.toggle("hidden", weakList.length === 0);
    retryMissedButton.classList.toggle("hidden", activeQuiz.missed.length === 0);
    reviewListButton.classList.toggle("hidden", activeQuiz.mode !== "review");
    if (activeQuiz.returnToPeriodic) {
      reviewListButton.classList.remove("hidden");
      reviewListButton.textContent = "周期表に戻る";
    } else {
      reviewListButton.textContent = "苦手リストに戻る";
    }
    progressBar.style.width = "100%";
  }

  function getScoreComment(score, total, percent) {
    if (score === total) {
      return `正答率 ${percent}%：元素記号クイズ満点！`;
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
    const analysis = analyzeMistakes(missed);
    const summaryHtml = renderScoreSummary(total, percent, analysis);
    const analysisHtml = renderMistakeAnalysis(analysis);
    const graduatedHtml = activeQuiz.graduated && activeQuiz.graduated.length > 0
      ? `<div class="analysis-panel graduate-panel"><h3>苦手卒業</h3><p>${activeQuiz.graduated.map((element) => `${element.name}（${element.symbol}）`).join("、")} を苦手リストから卒業しました！</p></div>`
      : "";

    if (missed.length === 0) {
      missedListArea.innerHTML = `
        ${summaryHtml}
        ${analysisHtml}
        ${graduatedHtml}
        <div class="missed-list"><h3>間違えた問題一覧</h3><p>間違えた問題はありません。すばらしい実験結果です。</p></div>
      `;
      return;
    }

    const items = missed.map((question) => {
      const mistakes = getMistakeLabels(question);
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
          ${renderKanjiNote(question.element)}
          <div class="mistake-tags">${mistakes.map((label) => `<b>${label}</b>`).join("")}</div>
          <div class="answer-report">
            <b>正解</b>
            ${correctRows}
          </div>
          <div class="answer-report user-answer-report">
            <b>あなたの答え</b>
            ${userRows}
          </div>
          <button class="periodic-jump-button" type="button" data-periodic-number="${question.element.number}">周期表で見る</button>
        </li>
      `;
    }).join("");

    missedListArea.innerHTML = `
      ${summaryHtml}
      ${analysisHtml}
      ${graduatedHtml}
      <div class="missed-list">
        <h3>間違えた問題一覧</h3>
        <p>${total}問中 ${missed.length}問の元素を苦手リストに保存しました。正答率は ${percent}% です。</p>
        <ul>${items}</ul>
      </div>
    `;

    missedListArea.querySelectorAll(".periodic-jump-button").forEach((button) => {
      button.addEventListener("click", () => {
        playSound("click");
        showPeriodicElementFromResult(Number(button.dataset.periodicNumber));
      });
    });
  }

  function renderScoreSummary(total, percent, analysis) {
    const tendency = getTendencyText(analysis);
    const advice = getAdviceText(analysis);
    return `
      <div class="score-summary-card">
        <h3>成績まとめ</h3>
        <div class="score-summary-grid">
          <span>${total}問中${activeQuiz.score}問正解</span>
          <span>正答率：${percent}%</span>
          <span>最大コンボ：${activeQuiz.maxCombo}</span>
          <span>苦手傾向：${tendency}</span>
        </div>
        <p>おすすめ：${advice}</p>
      </div>
    `;
  }

  function getTendencyText(counts) {
    const maxCount = Math.max(counts.number, counts.name, counts.symbol);
    if (maxCount === 0) {
      return "ミスなし";
    }
    if (counts.number === maxCount) {
      return "元素番号ミスが多め";
    }
    if (counts.name === maxCount) {
      return "元素名ミスが多め";
    }
    return "元素記号ミスが多め";
  }

  function getAdviceText(counts) {
    const maxCount = Math.max(counts.number, counts.name, counts.symbol);
    if (maxCount === 0) {
      return "かなり安定しています。小テスト本番モードで仕上げましょう";
    }
    if (counts.number === maxCount) {
      return "番号から答える練習や、番号順チェックをもう一度やろう";
    }
    if (counts.name === maxCount) {
      return "元素名を意識して暗記カードで確認しよう";
    }
    return "元素記号から答える練習をもう一度やろう";
  }

  function getMistakeLabels(question) {
    return question.groups
      .filter((group) => question.userAnswers[group.key] !== group.correct)
      .map((group) => `${group.label}ミス`);
  }

  function analyzeMistakes(missed) {
    const counts = { number: 0, name: 0, symbol: 0 };
    missed.forEach((question) => {
      question.groups.forEach((group) => {
        if (question.userAnswers[group.key] !== group.correct) {
          counts[group.key]++;
        }
      });
    });
    return counts;
  }

  function renderMistakeAnalysis(counts) {
    const maxCount = Math.max(counts.number, counts.name, counts.symbol);
    const advice = getAdviceText(counts);

    return `
      <div class="analysis-panel">
        <h3>今回の苦手タイプ</h3>
        <div class="analysis-grid">
          <span>元素番号ミス：<strong>${counts.number}回</strong></span>
          <span>元素名ミス：<strong>${counts.name}回</strong></span>
          <span>元素記号ミス：<strong>${counts.symbol}回</strong></span>
        </div>
        <p>${advice}</p>
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
    const weakRecords = getSortedWeakRecords();

    if (weakRecords.length === 0) {
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
    const cards = weakRecords.map((record) => {
      const element = getElementByNumber(record.number);
      const remaining = Math.max(0, 3 - record.streak);
      return `
      <button class="weak-card" type="button" data-number="${element.number}">
        <span>${element.number}番 ${element.name}</span>
        <strong>${element.symbol}</strong>
        <em>ミス回数：${record.mistakes}回</em>
        <small>卒業まで：あと${remaining}回連続正解</small>
        <small>最後：${formatDateLabel(record.lastMistakeAt)}</small>
        ${renderKanjiNote(element)}
      </button>
    `;
    }).join("");

    weakListArea.innerHTML = `
      <label class="weak-sort-control">
        <span>並び替え</span>
        <select id="weakSortSelect">
          <option value="number"${weakSortMode === "number" ? " selected" : ""}>元素番号順</option>
          <option value="mistakes"${weakSortMode === "mistakes" ? " selected" : ""}>ミス回数が多い順</option>
          <option value="recent"${weakSortMode === "recent" ? " selected" : ""}>最近間違えた順</option>
        </select>
      </label>
      <div class="weak-card-grid">${cards}</div>
    `;
    document.getElementById("weakSortSelect").addEventListener("change", (event) => {
      weakSortMode = event.target.value;
      renderWeakList();
    });
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

  function getSortedWeakRecords() {
    const records = weakList.filter((record) => getElementByNumber(record.number));
    if (weakSortMode === "mistakes") {
      return [...records].sort((a, b) => b.mistakes - a.mistakes || a.number - b.number);
    }
    if (weakSortMode === "recent") {
      return [...records].sort((a, b) => {
        const aTime = a.lastMistakeAt ? new Date(a.lastMistakeAt).getTime() : 0;
        const bTime = b.lastMistakeAt ? new Date(b.lastMistakeAt).getTime() : 0;
        return bTime - aTime || a.number - b.number;
      });
    }
    return [...records].sort((a, b) => a.number - b.number);
  }

  function buildPracticeSettings() {
    typeChoices.innerHTML = "";
    const practiceSettings = {
      type: "random",
      count: 10,
      order: "random",
      timer: 0,
      range: "all"
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

    const timerOptions = [
      { id: 0, label: "制限時間なし" },
      { id: 15, label: "1問15秒" },
      { id: 10, label: "1問10秒" }
    ];

    const rangeOptions = [
      { id: "all", label: "全範囲" },
      { id: "basic", label: "基本範囲 1〜18" },
      { id: "extra", label: "追加範囲 19以降" }
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

    const rangeSection = document.createElement("section");
    rangeSection.className = "type-section";
    rangeSection.innerHTML = "<h3>4. 出題範囲を選ぶ</h3>";

    const rangeGrid = document.createElement("div");
    rangeGrid.className = "type-option-grid";

    rangeOptions.forEach((rangeOption) => {
      const button = document.createElement("button");
      button.className = "type-button";
      button.type = "button";
      button.textContent = rangeOption.label;
      button.classList.toggle("selected", rangeOption.id === practiceSettings.range);
      button.addEventListener("click", () => {
        practiceSettings.range = rangeOption.id;
        screenLead.textContent = "出題範囲を選びました。選んだ範囲だけで練習できます。";
        rangeGrid.querySelectorAll(".type-button").forEach((rangeButton) => rangeButton.classList.remove("selected"));
        button.classList.add("selected");
      });
      rangeGrid.appendChild(button);
    });

    rangeSection.appendChild(rangeGrid);

    const timerSection = document.createElement("section");
    timerSection.className = "type-section";
    timerSection.innerHTML = "<h3>5. 制限時間を選ぶ</h3>";

    const timerGrid = document.createElement("div");
    timerGrid.className = "count-option-grid";

    timerOptions.forEach((timerOption) => {
      const button = document.createElement("button");
      button.className = "type-button";
      button.type = "button";
      button.textContent = timerOption.label;
      button.classList.toggle("selected", timerOption.id === practiceSettings.timer);
      button.addEventListener("click", () => {
        practiceSettings.timer = timerOption.id;
        screenLead.textContent = "制限時間を選びました。時間切れは不正解になります。";
        timerGrid.querySelectorAll(".type-button").forEach((timerButton) => timerButton.classList.remove("selected"));
        button.classList.add("selected");
      });
      timerGrid.appendChild(button);
    });

    timerSection.appendChild(timerGrid);
    typeChoices.appendChild(typeSection);
    typeChoices.appendChild(countSection);
    typeChoices.appendChild(orderSection);
    typeChoices.appendChild(rangeSection);
    typeChoices.appendChild(timerSection);

    practiceStartButton.onclick = () => {
      const selectedType = typeOptions.find((type) => type.id === practiceSettings.type);
      const typeSource = selectedType.random ? questionTypes : [selectedType];
      const sourceElements = getRangeElements(practiceSettings.range);
      const actualCount = practiceSettings.count === 30
        ? sourceElements.length
        : Math.min(practiceSettings.count, sourceElements.length);
      const questions = makeElementSetQuestions({
        count: actualCount,
        ordered: practiceSettings.order === "ordered",
        typeSource,
        sourceElements
      });
      startQuiz({
        mode: "practice",
        title: "練習モード",
        questions,
        timerLimit: practiceSettings.timer
      });
    };
  }

  function getRangeElements(rangeId) {
    if (rangeId === "basic") {
      return elements.filter((element) => element.number <= 18);
    }
    if (rangeId === "extra") {
      return elements.filter((element) => element.number >= 19);
    }
    return elements;
  }

  function buildFinalSettings() {
    finalSetupChoices.innerHTML = "";
    const finalSettings = {
      count: 10,
      timer: 0
    };

    const countSection = document.createElement("section");
    countSection.className = "type-section";
    countSection.innerHTML = "<h3>1. 問題数を選ぶ</h3>";
    const countGrid = document.createElement("div");
    countGrid.className = "count-option-grid";
    [
      { id: 10, label: "10問" },
      { id: 15, label: "15問" }
    ].forEach((option) => {
      const button = document.createElement("button");
      button.className = "type-button";
      button.type = "button";
      button.textContent = option.label;
      button.classList.toggle("selected", option.id === finalSettings.count);
      button.addEventListener("click", () => {
        finalSettings.count = option.id;
        countGrid.querySelectorAll(".type-button").forEach((countButton) => countButton.classList.remove("selected"));
        button.classList.add("selected");
      });
      countGrid.appendChild(button);
    });
    countSection.appendChild(countGrid);

    const timerSection = document.createElement("section");
    timerSection.className = "type-section";
    timerSection.innerHTML = "<h3>2. 制限時間を選ぶ</h3>";
    const timerGrid = document.createElement("div");
    timerGrid.className = "count-option-grid";
    [
      { id: 0, label: "制限時間なし" },
      { id: 15, label: "1問15秒" },
      { id: 10, label: "1問10秒" }
    ].forEach((option) => {
      const button = document.createElement("button");
      button.className = "type-button";
      button.type = "button";
      button.textContent = option.label;
      button.classList.toggle("selected", option.id === finalSettings.timer);
      button.addEventListener("click", () => {
        finalSettings.timer = option.id;
        timerGrid.querySelectorAll(".type-button").forEach((timerButton) => timerButton.classList.remove("selected"));
        button.classList.add("selected");
      });
      timerGrid.appendChild(button);
    });
    timerSection.appendChild(timerGrid);

    finalSetupChoices.appendChild(countSection);
    finalSetupChoices.appendChild(timerSection);

    finalStartButton.onclick = () => {
      startFinalQuiz(finalSettings);
    };
  }

  function startFinalQuiz(settings) {
    const weakElements = getSortedWeakRecords().map((record) => getElementByNumber(record.number)).filter(Boolean);
    const selected = [];
    weakElements.forEach((element) => {
      if (selected.length < settings.count && !selected.some((item) => item.number === element.number)) {
        selected.push(element);
      }
    });

    shuffle(elements).forEach((element) => {
      if (selected.length < settings.count && !selected.some((item) => item.number === element.number)) {
        selected.push(element);
      }
    });

    startQuiz({
      mode: "final",
      title: "小テスト直前",
      questions: selected.map((element) => makeQuestion(element, randomItem(questionTypes))),
      timerLimit: settings.timer
    });
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
    cardReturnTarget = "top";
    cardBackButton.textContent = "トップへ戻る";
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
    const note = getKanjiNote(element);
    if (note) {
      cardAnswer.textContent += ` / 漢字メモ：${note}`;
    }
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
    cardAnswer.textContent = `${cardDeck.length}枚確認完了。まちがえた数は記録しない暗記モードです。`;
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
      if (mode === "final") {
        playSound("click");
        startBgm();
        showFinalSetupScreen();
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
      if (mode === "settings") {
        playSound("click");
        showSettingsScreen();
      }
      if (mode === "guide") {
        playSound("click");
        showGuideScreen();
      }
      if (mode === "exam") {
        playSound("click");
        startBgm();
        showExamConfirmScreen();
      }
    });
  });

  examStartButton.addEventListener("click", () => {
    startQuiz({
      mode: "exam",
      title: "小テスト本番",
      questions: makeElementSetQuestions({ count: elements.length }),
      showScoreDuringQuiz: false
    });
  });

  examConfirmBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
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
    const weakElements = weakList.map((record) => getElementByNumber(record.number)).filter(Boolean);
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
  retryMissedButton.addEventListener("click", () => {
    playSound("click");
    if (!activeQuiz || activeQuiz.missed.length === 0) {
      return;
    }

    const retryQuestions = activeQuiz.missed.map((question) => makeQuestion(question.element, question.type));
    startQuiz({
      mode: "retry",
      title: "間違えた問題だけもう一度",
      questions: retryQuestions,
      saveMistakes: true,
      removeWeakOnCorrect: activeQuiz.mode === "review"
    });
  });
  reviewListButton.addEventListener("click", () => {
    playSound("click");
    if (activeQuiz && activeQuiz.returnToPeriodic) {
      showPeriodicScreen();
      return;
    }
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
  finalSetupBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
  });
  settingsResetWeakButton.addEventListener("click", () => {
    playSound("click");
    const confirmed = window.confirm("苦手リストをすべて削除しますか？この操作は元に戻せません。");
    if (!confirmed) {
      return;
    }
    weakList = [];
    selectedWeakNumbers = [];
    saveWeakList();
    settingsMessage.textContent = "苦手リストをリセットしました。";
    settingsMessage.className = "result-message good";
  });
  settingsResetDailyButton.addEventListener("click", () => {
    playSound("click");
    const confirmed = window.confirm("今日の学習記録をリセットしますか？");
    if (!confirmed) {
      return;
    }
    resetDailyStats();
    settingsMessage.textContent = "今日の学習記録をリセットしました。";
    settingsMessage.className = "result-message good";
  });
  settingsResetAllButton.addEventListener("click", () => {
    playSound("click");
    const confirmed = window.confirm("すべての学習データと設定を削除します。この操作は元に戻せません。本当にリセットしますか？");
    if (!confirmed) {
      return;
    }
    managedStorageKeys.forEach((key) => localStorage.removeItem(key));
    weakList = [];
    selectedWeakNumbers = [];
    bgmOn = false;
    sfxOn = true;
    stopBgm();
    updateSoundControls();
    settingsMessage.textContent = "すべてのデータをリセットしました。";
    settingsMessage.className = "result-message good";
  });
  settingsBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
  });
  guideBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
  });
  flashCard.addEventListener("click", revealCard);
  cardRevealButton.addEventListener("click", revealCard);
  cardNextButton.addEventListener("click", nextCard);
  cardBackButton.addEventListener("click", () => {
    playSound("click");
    if (cardReturnTarget === "periodic") {
      cardReturnTarget = "top";
      cardBackButton.textContent = "トップへ戻る";
      showPeriodicScreen();
      return;
    }
    showTopScreen();
  });
  cardSetupBackButton.addEventListener("click", () => {
    playSound("click");
    showTopScreen();
  });
  periodicListViewButton.addEventListener("click", () => {
    playSound("click");
    periodicViewMode = "list";
    periodicSearch.value = "";
    periodicActionPanel.classList.add("hidden");
    periodicActionPanel.innerHTML = "";
    updatePeriodicViewButtons();
    renderPeriodicTable(elements);
  });
  periodicTableViewButton.addEventListener("click", () => {
    playSound("click");
    periodicViewMode = "table";
    periodicSearch.value = "";
    periodicActionPanel.classList.add("hidden");
    periodicActionPanel.innerHTML = "";
    updatePeriodicViewButtons();
    renderPeriodicTable(fullPeriodicElements);
  });
  periodicSearch.addEventListener("input", filterPeriodicTable);
  periodicBackButton.addEventListener("click", () => {
    playSound("click");
    if (periodicReturnTarget === "result") {
      periodicReturnTarget = "top";
      periodicBackButton.textContent = "トップへ戻る";
      showOnly("result");
      screenLead.textContent = "直前の結果画面に戻りました。";
      return;
    }
    showTopScreen();
  });
  cardFrontSelect.addEventListener("change", showCard);

  bgmToggle.addEventListener("click", () => {
    userHasInteracted = true;
    removeBgmUnlockListeners();
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
    userHasInteracted = true;
    removeBgmUnlockListeners();
    sfxOn = !sfxOn;
    localStorage.setItem(storageKeys.sfx, String(sfxOn));
    updateSoundControls();
    playSound("click");
  });

  applyFixedVolumes();
  updateSoundControls();
  setupBgmUnlockListeners();
  showTopScreen();
});
