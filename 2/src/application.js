import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
export default async () => {
  const form = document.querySelector('form');
  const tasksList = document.getElementById('tasks');

  const renderTasks = (tasks) => {
    tasksList.innerHTML = tasks
      .map((t) => `<li class="list-group-item">${t.name}</li>`)
      .join('');
  };

  const response = await axios.get(routes.tasksPath());
  const tasks = [...response.data.items];
  renderTasks(tasks);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('[name="name"]');
    const name = input.value;
    await axios.post(routes.tasksPath(), { name });
    tasks.unshift({ name });
    renderTasks(tasks);
    form.reset();
  });
};
// END
