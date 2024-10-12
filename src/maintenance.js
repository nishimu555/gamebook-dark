import { gameData } from './gameData.js';

let currentEditingPage = null;

function renderMaintenanceScreen() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1 class="title is-2 has-text-centered mt-4 mb-5">ゲームデータ管理画面</h1>
    <div class="columns">
      <div class="column is-one-third">
        <div class="box">
          <h2 class="title is-4">ページ一覧</h2>
          <div class="field">
            <div class="control">
              <input id="search-pages" class="input" type="text" placeholder="ページを検索...">
            </div>
          </div>
          <ul id="page-list" class="menu-list"></ul>
          <button id="add-page" class="button is-primary is-fullwidth mt-3">新規ページ追加</button>
        </div>
      </div>
      <div class="column is-two-thirds">
        <div id="edit-form" class="box"></div>
      </div>
    </div>
    <div id="game-data-output" class="mt-5 is-hidden">
      <h2 class="title is-4">更新されたページデータ</h2>
      <pre><code id="game-data-json"></code></pre>
    </div>
    <div class="has-text-centered mt-5">
      <a href="/" class="button is-light">ゲーム画面に戻る</a>
    </div>
  `;

  renderPageList();
  document.getElementById('add-page').addEventListener('click', addNewPage);
  document.getElementById('search-pages').addEventListener('input', searchPages);
}

function renderPageList() {
  const pageList = document.getElementById('page-list');
  pageList.innerHTML = '';
  Object.keys(gameData).forEach(pageId => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = pageId;
    a.href = '#';
    a.addEventListener('click', (e) => {
      e.preventDefault();
      editPage(pageId);
    });
    li.appendChild(a);
    pageList.appendChild(li);
  });
}

function searchPages() {
  const searchTerm = document.getElementById('search-pages').value.toLowerCase();
  const pageItems = document.querySelectorAll('#page-list li');
  pageItems.forEach(item => {
    const pageId = item.textContent.toLowerCase();
    if (pageId.includes(searchTerm)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

function editPage(pageId) {
  currentEditingPage = pageId;
  const page = gameData[pageId];
  const editForm = document.getElementById('edit-form');
  editForm.innerHTML = `
    <h2 class="title is-4">ページ編集: ${pageId}</h2>
    <div class="field">
      <label class="label">文章</label>
      <div class="control">
        <textarea id="page-text" class="textarea" rows="5">${page.text}</textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">画像ファイル名</label>
      <div class="control">
        <input id="page-image" class="input" type="text" value="${page.image || ''}">
      </div>
    </div>
    <div id="choices-container">
      <label class="label">選択肢</label>
    </div>
    <button id="add-choice" class="button is-info is-small mt-2">選択肢を追加</button>
    <div class="field is-grouped mt-5">
      <div class="control">
        <button id="save-page" class="button is-primary">保存</button>
      </div>
      <div class="control">
        <button id="delete-page" class="button is-danger">削除</button>
      </div>
    </div>
  `;

  renderChoices(page.choices);
  document.getElementById('add-choice').addEventListener('click', addChoice);
  document.getElementById('save-page').addEventListener('click', savePage);
  document.getElementById('delete-page').addEventListener('click', () => deletePage(pageId));
}

function renderChoices(choices) {
  const choicesContainer = document.getElementById('choices-container');
  choicesContainer.innerHTML = '';
  choices.forEach((choice, index) => {
    const choiceDiv = document.createElement('div');
    choiceDiv.className = 'field has-addons mb-2';
    choiceDiv.innerHTML = `
      <div class="control is-expanded">
        <input class="input choice-text" type="text" value="${choice.text}" placeholder="選択肢テキスト">
      </div>
      <div class="control">
        <input class="input choice-next" type="text" value="${choice.nextPage}" placeholder="次のページID">
      </div>
      <div class="control">
        <button class="button is-danger delete-choice">削除</button>
      </div>
    `;
    choiceDiv.querySelector('.delete-choice').addEventListener('click', () => deleteChoice(index));
    choicesContainer.appendChild(choiceDiv);
  });
}

function addChoice() {
  const choicesContainer = document.getElementById('choices-container');
  const choiceDiv = document.createElement('div');
  choiceDiv.className = 'field has-addons mb-2';
  choiceDiv.innerHTML = `
    <div class="control is-expanded">
      <input class="input choice-text" type="text" placeholder="選択肢テキスト">
    </div>
    <div class="control">
      <input class="input choice-next" type="text" placeholder="次のページID">
    </div>
    <div class="control">
      <button class="button is-danger delete-choice">削除</button>
    </div>
  `;
  choiceDiv.querySelector('.delete-choice').addEventListener('click', () => choiceDiv.remove());
  choicesContainer.appendChild(choiceDiv);
}

function deleteChoice(index) {
  const choicesContainer = document.getElementById('choices-container');
  choicesContainer.children[index].remove();
}

function savePage() {
  const pageText = document.getElementById('page-text').value;
  const pageImage = document.getElementById('page-image').value;
  const choiceElements = document.querySelectorAll('#choices-container .field');
  const choices = Array.from(choiceElements).map(el => ({
    text: el.querySelector('.choice-text').value,
    nextPage: el.querySelector('.choice-next').value
  }));

  gameData[currentEditingPage] = {
    text: pageText,
    image: pageImage,
    choices: choices
  };

  updateGameDataOutput(currentEditingPage);
  renderPageList();
}

function addNewPage() {
  const pageId = prompt('新しいページIDを入力してください:');
  if (pageId && !gameData[pageId]) {
    gameData[pageId] = {
      text: '',
      image: '',
      choices: []
    };
    renderPageList();
    editPage(pageId);
  } else if (gameData[pageId]) {
    alert('そのページIDは既に存在します。');
  }
}

function deletePage(pageId) {
  const relatedPages = Object.entries(gameData).filter(([_, page]) => 
    page.choices.some(choice => choice.nextPage === pageId)
  ).map(([id, _]) => id);

  if (relatedPages.length > 0) {
    const confirm = window.confirm(`警告: このページは他のページから参照されています (${relatedPages.join(', ')})。\n本当に削除しますか？`);
    if (!confirm) return;
  }

  delete gameData[pageId];
  renderPageList();
  document.getElementById('edit-form').innerHTML = '';
  document.getElementById('game-data-output').classList.add('is-hidden');
}

function updateGameDataOutput(pageId) {
  const gameDataJson = document.getElementById('game-data-json');
  const gameDataOutput = document.getElementById('game-data-output');
  gameDataJson.textContent = JSON.stringify(gameData[pageId], null, 2);
  gameDataOutput.classList.remove('is-hidden');
}

renderMaintenanceScreen();