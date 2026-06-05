import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default () => {
  const state = {
    lists: [{ id: 'general', name: 'General' }],
    tasks: { general: [] },
    currentListId: 'general',
  };

  const listsContainer = document.querySelector('[data-container="lists"]');
  const tasksContainer = document.querySelector('[data-container="tasks"]');
  const newListForm = document.querySelector('[data-container="new-list-form"]');
  const newTaskForm = document.querySelector('[data-container="new-task-form"]');

  const renderTasks = () => {
    const tasks = state.tasks[state.currentListId] || [];
    if (tasks.length === 0) {
      tasksContainer.innerHTML = '';
    } else {
      tasksContainer.innerHTML = `<ul>${tasks.map((t) => `<li>${t.name}</li>`).join('')}</ul>`;
    }
  };

  const renderLists = () => {
    const items = state.lists.map((list) => {
      if (list.id === state.currentListId) {
        return `<li><b>${list.name}</b></li>`;
      }
      return `<li><a href="#${list.id}">${list.name}</a></li>`;
    });
    listsContainer.innerHTML = `<ul>${items.join('')}</ul>`;

    listsContainer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        state.currentListId = link.getAttribute('href').slice(1);
        renderLists();
        renderTasks();
      });
    });
  };

  renderLists();
  renderTasks();

  newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newListForm.querySelector('[name="name"]');
    const name = input.value.trim();

    if (state.lists.some((l) => l.name === name)) {
      return;
    }

    const id = uniqueId('list_');
    state.lists.push({ id, name });
    state.tasks[id] = [];
    newListForm.reset();
    renderLists();
  });

  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newTaskForm.querySelector('[name="name"]');
    const name = input.value.trim();
    state.tasks[state.currentListId].push({ id: uniqueId('task_'), name });
    newTaskForm.reset();
    renderTasks();
  });
};
// END
