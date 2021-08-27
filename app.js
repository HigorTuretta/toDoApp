//Seletores
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const data = document.querySelector('.bemvindo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event) {
    //Impede o browser de dar submit no form
    event.preventDefault();

    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    //Create LI
    const newTodo = document.createElement('li');
    const todoText = document.createElement('p');
    todoText.classList.add('todo-text');
    todoText.innerText = todoInput.value;
    newTodo.appendChild(todoText);
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Check button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    //Trash Button
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add('trash-btn');
    todoDiv.appendChild(trashbutton);

    //append to list
    todoDiv.classList.add('fade-in-bottom');
    todoList.appendChild(todoDiv);

    //Adiciona para o localStorage
    saveLocalTodos(todoInput.value);
    //Clear todo input value
    todoInput.value = "";

}

function deleteCheck(e) {
    const item = e.target;

    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add('slide-out-elliptic-left-bck');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }
    //COMPLETE CHECK
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.remove('fade-in-bottom');
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

        }
    });
}

function saveLocalTodos(todo) {
    //Verifica se já existe Tarefas
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //salva no array
    todos.push(todo);
    //salva no storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    now = new Date
    dayName = new Array("Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado")
    monName = new Array("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
    data.innerHTML = dayName[now.getDay()] + ", " + now.getDate() + " de " + monName[now.getMonth()] + " de " + now.getFullYear() + "."


    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo')

        //Create LI
        const newTodo = document.createElement('li');
        const todoText = document.createElement('p');
        todoText.classList.add('todo-text');
        todoText.innerText = todo;
        newTodo.appendChild(todoText);
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Check button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);

        //Trash Button
        const trashbutton = document.createElement('button');
        trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
        trashbutton.classList.add('trash-btn');
        todoDiv.appendChild(trashbutton);

        //append to list
        todoDiv.classList.add('fade-in-bottom');
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}