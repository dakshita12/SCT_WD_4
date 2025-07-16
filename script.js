const taskList = document.getElementById('taskList');
const progress = document.getElementById('progress');
let totalTasks = 0;
let completedTasks = 0;

function updateProgress() {
  progress.innerText = `${completedTasks}/${totalTasks}`;
}

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText === '') return;

  totalTasks++;
  updateProgress();

  const li = document.createElement('li');

  const taskContent = document.createElement('div');
  taskContent.className = 'task-content';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onchange = function () {
    li.classList.toggle('completed');
    completedTasks = checkbox.checked ? completedTasks + 1 : completedTasks - 1;
    updateProgress();
  };

  const span = document.createElement('span');
  span.innerText = taskText;

  taskContent.appendChild(checkbox);
  taskContent.appendChild(span);

  const actions = document.createElement('div');
  actions.className = 'actions';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete';
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.onclick = function () {
    if (checkbox.checked) completedTasks--;
    totalTasks--;
    li.remove();
    updateProgress();
  };

  const editBtn = document.createElement('button');
  editBtn.className = 'edit';
  editBtn.innerHTML = '✏️';
  editBtn.onclick = function () {
    const newTask = prompt('Edit task:', span.innerText);
    if (newTask !== null) {
      span.innerText = newTask;
    }
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(taskContent);
  li.appendChild(actions);
  taskList.appendChild(li);
  input.value = '';
}
