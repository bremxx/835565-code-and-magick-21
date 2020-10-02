"use strict";

const SIMILAR_WIZARDS_NUM = 4;
const setupWindow = document.querySelector(`.setup`);
const setupSimilarBar = document.querySelector(`.setup-similar`);
const similarWizardsList = document.querySelector(`.setup-similar-list`);
const wizardTemplate = document
  .querySelector(`#similar-wizard-template`)
  .content.querySelector(`.setup-similar-item`);

const firstNames = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`,
];
const lastNames = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`,
];
const coatColors = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`,
];
const eyeColors = [`black`, `red`, `blue`, `yellow`, `green`];

setupWindow.classList.remove(`hidden`);
setupSimilarBar.classList.remove(`hidden`);

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерация волшебника
function getRandomWizards() {
  const randomWizards = [];

  for (let i = 0; i < SIMILAR_WIZARDS_NUM; i++) {
    let randomWizard = {};
    randomWizard.name = `${
      firstNames[getRandomNumber(0, firstNames.length - 1)]
    } ${lastNames[getRandomNumber(0, lastNames.length - 1)]}`;
    randomWizard.eyesColor =
      eyeColors[getRandomNumber(0, eyeColors.length - 1)];
    randomWizard.coatColor =
      coatColors[getRandomNumber(0, coatColors.length - 1)];

    randomWizards.push(randomWizard);
  }

  return randomWizards;
}
const randomWizards = getRandomWizards();

// Функция наполнения темплейта
function insertWizard(obj) {
  const newWizard = wizardTemplate.cloneNode(true);

  newWizard.querySelector(`.setup-similar-label`).textContent = obj.name;
  newWizard.querySelector(`.wizard-coat`).style.fill = obj.coatColor;
  newWizard.querySelector(`.wizard-eyes`).style.fill = obj.eyesColor;

  return newWizard;
}

// Наполнение блока похожих волшебников
function insertSimilarWizards() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < SIMILAR_WIZARDS_NUM; i++) {
    fragment.appendChild(insertWizard(randomWizards[i]));
  }

  return similarWizardsList.appendChild(fragment);
}

insertSimilarWizards();
