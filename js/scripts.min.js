"use strict";

//  шаблон таска
let task = document.querySelector('#task').content;
let toDoTask = task.querySelector('.todo-list-item');

//  кнопка добавления таска
let addTask = document.getElementById('add-task');

//  форма создания нового таска
let taskForm = document.querySelector('#create-task');

//  список дел
let taskList = document.querySelector('.todo-list');

// Получаем динамическую коллекцию задач
let taskListChildren = taskList.children;

// Контейнер для сообщения о пустом таске
let messageEmptyTask = document.querySelector('.create-task__empty-field');

// Контейнер для сообщения о том, что все задачи выполнены
let allTaskChecked = document.querySelector('.todo-list__all-tack-checked');


// Вешаем обработчик, что бы при клике добавлять новый таск и очищать форму
addTask.addEventListener('click', (event) => {
    // Предотвращаем перезагрузку страницы
    event.preventDefault();

    createNewTask();
});

document.addEventListener('keydown', event => {
   if (event.code === "Enter") {
       createNewTask();
   }
});

function createNewTask() {
    // клонируем шаблон
    let taskTemplate = toDoTask.cloneNode(true);

    // Получаем эл-ты формы чтобы скопировать информацию
    let taskTitle = taskForm.querySelector('#task-name');
    let taskText = taskForm.querySelector('#task-text');

    if ((taskTitle.value !== "") && (taskText !== "")) {
        messageEmptyTask.classList.remove('create-task__empty-field_active');

        // Переносим информацию из формы в таск
        taskTemplate.querySelector('.todo-list-item__title').textContent = taskTitle.value;
        taskTemplate.querySelector('.todo-list-item__task').textContent = taskText.value;
        taskTemplate.querySelector('.todo-list-item__create-date').textContent += new Date().toLocaleString("ru");

        // Обнуляем значение полей
        taskTitle.value = "";
        taskText.value = "";

        checked(taskTemplate);

        // Добавляем таск на страницу
        taskList.insertBefore(taskTemplate, taskForm);

        printAllTaskChecked();

    } else {
        messageEmptyTask.classList.add('create-task__empty-field_active');
    }
}

// Функция для удаления задачи
function checked(template) {
    let doTask = template.querySelector('.todo-list-item-checkbox');

    doTask.addEventListener('click', () => {
        template.remove();
        printAllTaskChecked();
    });


}

function printAllTaskChecked() {
    console.log(taskListChildren.length);
    if (taskListChildren.length > 3) {
        allTaskChecked.classList.add('todo-list__all-tack-checked_none');
        console.log("Задачи есть!");
    } else {
        allTaskChecked.classList.remove('todo-list__all-tack-checked_none');
        console.log("Задач нет!");
    }
}


