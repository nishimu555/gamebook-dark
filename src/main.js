import { gameData } from './gameData.js';

let currentPage = 'start';

function renderPage(pageId) {
  const page = gameData[pageId];
  if (!page) {
    console.error(`Page not found: ${pageId}`);
    return;
  }

  const storyElement = document.getElementById('story');
  const choicesElement = document.getElementById('choices');
  const imageContainer = document.getElementById('image-container');

  storyElement.textContent = page.text;
  choicesElement.innerHTML = '';
  
  if (page.image) {
    imageContainer.innerHTML = `<img src="${page.image}" alt="Scene image" class="scene-image">`;
  } else {
    imageContainer.innerHTML = '';
  }

  page.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice.text;
    button.classList.add('button', 'is-fullwidth');
    button.addEventListener('click', () => renderPage(choice.nextPage));
    choicesElement.appendChild(button);
  });
}

renderPage(currentPage);