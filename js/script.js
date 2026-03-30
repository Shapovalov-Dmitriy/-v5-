"use strict";

// ============================================
// 1. ЭЛЕМЕНТЫ СТРАНИЦЫ (DOM)
// ============================================
const inputWord = document.querySelector('.input-word'),
  word = document.querySelector('.word'),
  overlay = document.querySelector('.overlay'),
  audioPlay = document.querySelector('.audio-output'),
  imgBox = document.querySelector('.images-box');

// ============================================
// 2. КОНФИГУРАЦИЯ: Русский алфавит
// ============================================
const RUSSIAN_ALPHABET = [
  'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й',
  'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф',
  'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'
];

// ============================================
// 3. ИНИЦИАЛИЗАЦИЯ КЛАВИАТУРЫ
// ============================================
function initKeyboard() {
  RUSSIAN_ALPHABET.forEach(letter => {
    const button = document.querySelector(`[data-letter="${letter}"]`);
    if (button) {
      button.addEventListener('click', () => {
        handleLetterClick(letter);
      });
    }
  });
}

// ============================================
// 4. ОБРАБОТКА КЛИКА ПО БУКВЕ
// ============================================
function handleLetterClick(letter) {
  const letterIndex = RUSSIAN_ALPHABET.indexOf(letter) + 1;
  const audio = new Audio(`audio/audio-letters/gen-${letterIndex + 5}.mp3`);
  audio.play();
  addAnimatedLetter(letter);
}

// ============================================
// 5. ДОБАВЛЕНИЕ АНИМИРОВАННОЙ БУКВЫ (ЕДИНСТВЕННАЯ ВЕРСИЯ!)
// ============================================
function addAnimatedLetter(letter) {
  // Удаляем старые буквы, если больше 15 (защита от переполнения)
  const existing = word.querySelectorAll('.letter-char');
  if (existing.length >= 15) {
    existing[0].remove();
  }

  const letterSpan = document.createElement('span');
  letterSpan.classList.add('letter-char');
  letterSpan.textContent = letter;

  // Случайный цвет для разнообразия
  const colors = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)'
  ];
  letterSpan.style.background = colors[Math.floor(Math.random() * colors.length)];

  word.appendChild(letterSpan); // ✅ Обязательно добавляем букву!
}

// ============================================
// 6. ДАННЫЕ: Слова с уровнями
// ============================================
const data = [
  // 🟢 ЛЁГКИЙ УРОВЕНЬ (3-4 буквы)
  { word: 'дом', image: "./images/img-words/house.webp", audio: './audio/audio-words/дом.mp3', level: 1 },
  { word: 'юла', image: "./images/img-words/yula.webp", audio: './audio/audio-words/юла.mp3', level: 1 },
  { word: 'мама', image: "./images/img-words/mama.webp", audio: './audio/audio-words/мама.mp3', level: 1 },
  { word: 'небо', image: "./images/img-words/nebo.webp", audio: './audio/audio-words/небо.mp3', level: 1 },
  { word: 'рыбка', image: "./images/img-words/fish.webp", audio: './audio/audio-words/рыбка.mp3', level: 1 },
  { word: 'мышь', image: "./images/img-words/mouse.png", audio: './audio/audio-words/мышь.mp3', level: 1 },
  { word: 'сова', image: "./images/img-words/sova.png", audio: './audio/audio-words/сова.mp3', level: 1 },

  // 🟡 СРЕДНИЙ УРОВЕНЬ (5-6 букв)
  { word: 'жираф', image: "./images/img-words/jiraf.jpg", audio: './audio/audio-words/жираф.mp3', level: 2 },
  { word: 'апельсин', image: "./images/img-words/orange.webp", audio: './audio/audio-words/апельсин.mp3', level: 2 },
  { word: 'зеркало', image: "./images/img-words/zerkalo.png", audio: './audio/audio-words/зеркало.mp3', level: 2 },
  { word: 'дерево', image: "./images/img-words/derevo.webp", audio: './audio/audio-words/дерево.mp3', level: 2 },
  { word: 'диван', image: "./images/img-words/divan.png", audio: './audio/audio-words/диван.mp3', level: 2 },
  { word: 'корова', image: "./images/img-words/korova.webp", audio: './audio/audio-words/корова.mp3', level: 2 },
  { word: 'кошка', image: "./images/img-words/koshka.webp", audio: './audio/audio-words/кошка.mp3', level: 2 },
  { word: 'воробей', image: "./images/img-words/vorobei.png", audio: './audio/audio-words/воробей.mp3', level: 2 },
  { word: 'яблоко', image: "./images/img-words/apple.webp", audio: './audio/audio-words/яблоко.mp3', level: 2 },
  { word: 'машина', image: "./images/img-words/auto.webp", audio: './audio/audio-words/машина.mp3', level: 2 },
  { word: 'щенок', image: "./images/img-words/dog.webp", audio: './audio/audio-words/щенок.mp3', level: 2 },
  { word: 'тыква', image: "./images/img-words/tykva.webp", audio: './audio/audio-words/тыква.mp3', level: 2 },

  // 🔴 СЛОЖНЫЙ УРОВЕНЬ (7+ букв)
  { word: 'помидор', image: "images/img-words/tomat.webp", audio: './audio/audio-words/помидор.mp3', level: 3 },
  { word: 'полотенце', image: "./images/img-words/polotence.webp", audio: './audio/audio-words/полотенце.mp3', level: 3 },
  { word: 'солнце', image: "./images/img-words/solnce.webp", audio: './audio/audio-words/солнце.mp3', level: 3 },
  { word: 'курица', image: "./images/img-words/kurica.png", audio: './audio/audio-words/курица.mp3', level: 3 },
  { word: 'блокнот', image: "./images/img-words/bloknot.webp", audio: './audio/audio-words/блокнот.mp3', level: 3 },
  { word: 'компьютер', image: "./images/img-words/computer.png", audio: './audio/audio-words/компьютер.mp3', level: 3 },
  { word: 'снежинка', image: "./images/img-words/snown.png", audio: './audio/audio-words/снежинка.mp3', level: 3 },
  { word: 'корабль', image: "./images/img-words/korabl.png", audio: './audio/audio-words/корабль.mp3', level: 3 },
  { word: 'йогурт', image: "./images/img-words/jogurt.png", audio: './audio/audio-words/йогурт.mp3', level: 3 },
  { word: 'орёл', image: "./images/img-words/eagle.webp", audio: './audio/audio-words/орёл.mp3', level: 3 },
];

// ============================================
// 7. ПЕРЕМЕННЫЕ СОСТОЯНИЯ
// ============================================
let currentIndex = 0;
let currentLevel = 1;
let completedWords = [];

// ============================================
// 8. ФИЛЬТРАЦИЯ ПО УРОВНЮ
// ============================================
function getWordsByLevel(level) {
  return data.filter(item => item.level === level);
}

function getRandomWordFromLevel(level) {
  const words = getWordsByLevel(level);
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// ============================================
// 9. ОБНОВЛЕНИЕ ДИСПЛЕЯ
// ============================================
function updateDisplay() {
  const words = getWordsByLevel(currentLevel);
  const currentWord = words[currentIndex % words.length];

  imgBox.src = currentWord.image;
  inputWord.textContent = currentWord.word;
  audioPlay.src = currentWord.audio;

  updateLevelIndicator();
}

// ============================================
// 10. ИНДИКАТОР УРОВНЯ
// ============================================
function updateLevelIndicator() {
  const levelNames = {
    1: '🟢 Лёгкий',
    2: '🟡 Средний',
    3: '🔴 Сложный'
  };
  const display = document.getElementById('current-level-display');
  if (display) {
    display.textContent = levelNames[currentLevel];
  }

  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.classList.remove('active');
    if (parseInt(btn.dataset.level) === currentLevel) {
      btn.classList.add('active');
    }
  });
}

// ============================================
// 11. ПРОГРЕСС И ЗАВЕРШЕНИЕ УРОВНЯ
// ============================================
function updateProgress() {
  const words = getWordsByLevel(currentLevel);
  const completed = completedWords.filter(id =>
    words.find(w => w.word === id)
  ).length;
  const progressPercent = Math.round((completed / words.length) * 100);
  console.log(`📊 Прогресс уровня ${currentLevel}: ${progressPercent}%`);
}

function checkLevelCompletion() {
  const words = getWordsByLevel(currentLevel);
  const completed = completedWords.filter(id =>
    words.find(w => w.word === id)
  ).length;

  if (completed === words.length && currentLevel < 3) {
    setTimeout(() => {
      if (confirm(`🎉 Молодец! Ты прошёл уровень ${currentLevel}!\nПерейти на следующий уровень?`)) {
        currentLevel++;
        currentIndex = 0;
        completedWords = []; // Сбрасываем прогресс для нового уровня
        updateDisplay();
      }
    }, 1000);
  }
}

// ============================================
// 12. ОБРАБОТЧИКИ КНОПОК УРОВНЯ
// ============================================
document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentLevel = parseInt(btn.dataset.level);
    currentIndex = 0;
    updateDisplay();
    word.innerHTML = ""; // Очищаем поле (используем innerHTML для удаления span'ов)
    new Audio('audio/schelchok.mp3').play();
  });
});

// ============================================
// 13. ОБРАБОТКА КЛИКОВ (ДЕЛЕГИРОВАНИЕ)
// ============================================
document.addEventListener('click', function (e) {
  const target = e.target;

  // 🔹 Удалить последнюю букву
  if (target.classList.contains('delete')) {
    new Audio('audio/cowbell.mp3').play();
    const lastLetter = word.querySelector('.letter-char:last-child');
    if (lastLetter) {
      lastLetter.style.animation = 'flyOut 0.3s ease-in';
      setTimeout(() => lastLetter.remove(), 300);
    }
  }

  // 🔹 Сбросить всё
  if (target.classList.contains('reset')) {
    new Audio('audio/delete.mp3').play();
    const letterSpans = word.querySelectorAll('.letter-char');
    letterSpans.forEach((span, index) => {
      setTimeout(() => {
        span.style.animation = 'flyOut 0.3s ease-in';
        setTimeout(() => span.remove(), 300);
      }, index * 50);
    });
  }

  // 🔹 Проверить слово
  if (target.classList.contains('check')) {
    // Собираем слово из span'ов
    const letterSpans = word.querySelectorAll('.letter-char');
    let userWord = '';
    letterSpans.forEach(span => {
      userWord += span.textContent;
    });

    // ✅ Получаем текущее слово (важно!)
    const words = getWordsByLevel(currentLevel);
    const currentWord = words[currentIndex % words.length];

    const targetWord = inputWord.textContent.trim().toLowerCase();
    userWord = userWord.toLowerCase();

    if (userWord === targetWord) {
      // ✅ Правильно — сначала прогресс (ОДИН РАЗ!)
      if (!completedWords.includes(currentWord.word)) {
        completedWords.push(currentWord.word);
        updateProgress();
        checkLevelCompletion();
      }

      // Анимация успеха
      new Audio('audio/huge win.wav').play();
      letterSpans.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('correct');
        }, index * 100);
      });
      setTimeout(() => {
        overlay.classList.remove('none');
      }, letterSpans.length * 100);

    } else {
      // ❌ Ошибка — трясём буквы
      new Audio('audio/error-1.mp3').play();
      letterSpans.forEach(span => {
        span.classList.add('shake');
        setTimeout(() => span.classList.remove('shake'), 500);
      });
    }
  }

  // 🔹 Воспроизвести аудио слова
  if (target.classList.contains('audio-check')) {
    const words = getWordsByLevel(currentLevel);
    const currentWord = words[currentIndex % words.length];
    audioPlay.src = currentWord.audio;
    audioPlay.play();
  }

  // 🔹 Следующее слово
  if (target.classList.contains('next-word')) {
    const words = getWordsByLevel(currentLevel);
    currentIndex = (currentIndex + 1) % words.length;
    updateDisplay();
    new Audio('audio/schelchok.mp3').play();
    word.innerHTML = "";
  }

  // 🔹 Предыдущее слово
  if (target.classList.contains('prev-word')) {
    const words = getWordsByLevel(currentLevel);
    currentIndex = (currentIndex - 1 + words.length) % words.length;
    updateDisplay();
    new Audio('audio/schelchok.mp3').play();
    word.innerHTML = "";
  }

  // 🔹 Закрыть салют
  if (target.classList.contains('overlay')) {
    overlay.classList.add('none');
  }
});

// ============================================
// 14. ОБРАБОТКА КЛАВИАТУРЫ (ПОДДЕРЖКА ДВУХ РАСКЛАДОК)
// ============================================
const KEYBOARD_MAP = {
  // Английские клавиши → Кириллица → Аудиофайл
  'f': { cyrillic: 'а', audio: 'gen-6.mp3' },
  ',': { cyrillic: 'б', audio: 'gen-7.mp3' },
  'd': { cyrillic: 'в', audio: 'gen-8.mp3' },
  'u': { cyrillic: 'г', audio: 'gen-9.mp3' },
  'l': { cyrillic: 'д', audio: 'gen-10.mp3' },
  't': { cyrillic: 'е', audio: 'gen-11.mp3' },
  '`': { cyrillic: 'ё', audio: 'gen-12.mp3' },
  ';': { cyrillic: 'ж', audio: 'gen-13.mp3' },
  'p': { cyrillic: 'з', audio: 'gen-14.mp3' },
  'b': { cyrillic: 'и', audio: 'gen-15.mp3' },
  'q': { cyrillic: 'й', audio: 'gen-16.mp3' },
  'r': { cyrillic: 'к', audio: 'gen-17.mp3' },
  'k': { cyrillic: 'л', audio: 'gen-18.mp3' },
  'v': { cyrillic: 'м', audio: 'gen-19.mp3' },
  'y': { cyrillic: 'н', audio: 'gen-20.mp3' },
  'j': { cyrillic: 'о', audio: 'gen-21.mp3' },
  'g': { cyrillic: 'п', audio: 'gen-22.mp3' },
  'h': { cyrillic: 'р', audio: 'gen-23.mp3' },
  'c': { cyrillic: 'с', audio: 'gen-24.mp3' },
  'n': { cyrillic: 'т', audio: 'gen-25.mp3' },
  'e': { cyrillic: 'у', audio: 'gen-26.mp3' },
  'a': { cyrillic: 'ф', audio: 'gen-27.mp3' },
  '[': { cyrillic: 'х', audio: 'gen-28.mp3' },
  'w': { cyrillic: 'ц', audio: 'gen-29.mp3' },
  'x': { cyrillic: 'ч', audio: 'gen-30.mp3' },
  'i': { cyrillic: 'ш', audio: 'gen-31.mp3' },
  'o': { cyrillic: 'щ', audio: 'gen-32.mp3' },
  ']': { cyrillic: 'ъ', audio: 'gen-33.mp3' },
  's': { cyrillic: 'ы', audio: 'gen-34.mp3' },
  'm': { cyrillic: 'ь', audio: 'gen-35.mp3' },
  "'": { cyrillic: 'э', audio: 'gen-36.mp3' },
  '.': { cyrillic: 'ю', audio: 'gen-37.mp3' },
  'z': { cyrillic: 'я', audio: 'gen-38.mp3' },

  // Прямая поддержка кириллицы (русская раскладка)
  'а': { cyrillic: 'а', audio: 'gen-6.mp3' },
  'б': { cyrillic: 'б', audio: 'gen-7.mp3' },
  'в': { cyrillic: 'в', audio: 'gen-8.mp3' },
  'г': { cyrillic: 'г', audio: 'gen-9.mp3' },
  'д': { cyrillic: 'д', audio: 'gen-10.mp3' },
  'е': { cyrillic: 'е', audio: 'gen-11.mp3' },
  'ё': { cyrillic: 'ё', audio: 'gen-12.mp3' },
  'ж': { cyrillic: 'ж', audio: 'gen-13.mp3' },
  'з': { cyrillic: 'з', audio: 'gen-14.mp3' },
  'и': { cyrillic: 'и', audio: 'gen-15.mp3' },
  'й': { cyrillic: 'й', audio: 'gen-16.mp3' },
  'к': { cyrillic: 'к', audio: 'gen-17.mp3' },
  'л': { cyrillic: 'л', audio: 'gen-18.mp3' },
  'м': { cyrillic: 'м', audio: 'gen-19.mp3' },
  'н': { cyrillic: 'н', audio: 'gen-20.mp3' },
  'о': { cyrillic: 'о', audio: 'gen-21.mp3' },
  'п': { cyrillic: 'п', audio: 'gen-22.mp3' },
  'р': { cyrillic: 'р', audio: 'gen-23.mp3' },
  'с': { cyrillic: 'с', audio: 'gen-24.mp3' },
  'т': { cyrillic: 'т', audio: 'gen-25.mp3' },
  'у': { cyrillic: 'у', audio: 'gen-26.mp3' },
  'ф': { cyrillic: 'ф', audio: 'gen-27.mp3' },
  'х': { cyrillic: 'х', audio: 'gen-28.mp3' },
  'ц': { cyrillic: 'ц', audio: 'gen-29.mp3' },
  'ч': { cyrillic: 'ч', audio: 'gen-30.mp3' },
  'ш': { cyrillic: 'ш', audio: 'gen-31.mp3' },
  'щ': { cyrillic: 'щ', audio: 'gen-32.mp3' },
  'ъ': { cyrillic: 'ъ', audio: 'gen-33.mp3' },
  'ы': { cyrillic: 'ы', audio: 'gen-34.mp3' },
  'ь': { cyrillic: 'ь', audio: 'gen-35.mp3' },
  'э': { cyrillic: 'э', audio: 'gen-36.mp3' },
  'ю': { cyrillic: 'ю', audio: 'gen-37.mp3' },
  'я': { cyrillic: 'я', audio: 'gen-38.mp3' }
};

document.addEventListener('keydown', function (e) {
  const key = e.key.toLowerCase();

  // 🔹 Если нажата буква
  if (KEYBOARD_MAP[key]) {
    const { cyrillic, audio } = KEYBOARD_MAP[key];
    new Audio(`audio/audio-letters/${audio}`).play();
    addAnimatedLetter(cyrillic);
    return;
  }

  // 🔹 Проверка (пробел)
  if (e.key === ' ') {
    e.preventDefault();
    const letterSpans = word.querySelectorAll('.letter-char');
    let userWord = '';
    letterSpans.forEach(span => userWord += span.textContent);

    const words = getWordsByLevel(currentLevel);
    const currentWord = words[currentIndex % words.length];
    const targetWord = inputWord.textContent.trim().toLowerCase();
    userWord = userWord.toLowerCase();

    if (userWord === targetWord) {
      if (!completedWords.includes(currentWord.word)) {
        completedWords.push(currentWord.word);
        updateProgress();
        checkLevelCompletion();
      }
      new Audio('audio/huge win.wav').play();
      letterSpans.forEach((span, index) => {
        setTimeout(() => span.classList.add('correct'), index * 100);
      });
      setTimeout(() => overlay.classList.remove('none'), letterSpans.length * 100);
    } else {
      new Audio('audio/error-1.mp3').play();
      letterSpans.forEach(span => {
        span.classList.add('shake');
        setTimeout(() => span.classList.remove('shake'), 500);
      });
    }
  }

  // 🔹 Backspace
  if (e.key === 'Backspace') {
    new Audio('audio/cowbell.mp3').play();
    const lastLetter = word.querySelector('.letter-char:last-child');
    if (lastLetter) {
      lastLetter.style.animation = 'flyOut 0.3s ease-in';
      setTimeout(() => lastLetter.remove(), 300);
    }
  }

  // 🔹 Escape (сброс)
  if (e.key === 'Escape') {
    new Audio('audio/delete.mp3').play();
    word.innerHTML = "";
  }

  // 🔹 Навигация стрелками
  if (e.key === 'ArrowRight') {
    const words = getWordsByLevel(currentLevel);
    currentIndex = (currentIndex + 1) % words.length;
    updateDisplay();
    new Audio('audio/schelchok.mp3').play();
    word.innerHTML = "";
  }
  if (e.key === 'ArrowLeft') {
    const words = getWordsByLevel(currentLevel);
    currentIndex = (currentIndex - 1 + words.length) % words.length;
    updateDisplay();
    new Audio('audio/schelchok.mp3').play();
    word.innerHTML = "";
  }

  // 🔹 Закрыть салют
  if (e.key === 'Escape' && !overlay.classList.contains('none')) {
    overlay.classList.add('none');
  }
});

// ============================================
// 15. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  updateLevelIndicator();
  initKeyboard();
  updateDisplay();
});
