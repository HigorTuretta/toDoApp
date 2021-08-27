//Seletores
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const data = document.querySelector('.bemvindo');
const error = document.querySelector('.error');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
document.addEventListener('DOMContentLoaded', getCompleteTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event) {
    //Impede o browser de dar submit no form
    event.preventDefault();
    //confere se o campo está vazio
    if (confereCampo(todoInput.value)) {
        error.innerText = '';

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
    } else {
        error.classList.add('shake-horizontal');
        setTimeout(function() {
            error.classList.remove('shake-horizontal');
        }, 800);
        error.innerText = 'Informe a tarefa a ser adicionada!';
    }
}

function confereCampo(valor) {
    if (valor.trim() === '' || valor.trim() === null) {
        console.log(false);
        return false;
    } else {
        console.log(true);
        return true;
    }
}

function deleteCheck(e) {
    const item = e.target;

    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add('slide-out-elliptic-left-bck');
        if (todo.classList.contains('completed')) {
            removeCompleteTodos(todo);
        } else {
            removeLocalTodos(todo);
        }
        setTimeout(function() {
            todo.remove();
        }, 1000);
    }
    //COMPLETE CHECK
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.remove('fade-in-bottom');
        todo.classList.toggle('completed');
        if (todo.classList.contains('completed')) {
            saveLocalCompletes(todo.innerText);
            removeLocalTodos(todo);
        } else {
            saveLocalTodos(todo.innerText);
            removeCompleteTodos(todo);
        }


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

function saveLocalCompletes(todo) {
    let todosCompletes;

    if (localStorage.getItem('todosCompletes') === null) {
        todosCompletes = [];
    } else {
        todosCompletes = JSON.parse(localStorage.getItem('todosCompletes'));
    }

    todosCompletes.push(todo);
    localStorage.setItem('todosCompletes', JSON.stringify(todosCompletes));
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

function getCompleteTodos() {
    let todosCompletes;
    if (localStorage.getItem('todosCompletes') === null) {
        todosCompletes = [];
    } else {
        todosCompletes = JSON.parse(localStorage.getItem('todosCompletes'));
    }
    todosCompletes.forEach(function(todo) {
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
        todoDiv.classList.add('fade-in-bottom');
        setTimeout(function() {
            todoDiv.classList.remove('fade-in-bottom');
        }, 1);
        todoDiv.classList.add('completed');

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
        todoList.appendChild(todoDiv);
    })
}

function getTodos() {
    let todos;

    now = new Date
    dayName = new Array("Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado")
    monName = new Array("janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro")
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
    });
}

function removeCompleteTodos(todo) {
    if (localStorage.getItem('todosCompletes') === null) {
        todosCompletes = [];
    } else {
        todosCompletes = JSON.parse(localStorage.getItem('todosCompletes'));
    }
    const todoIndex = todo.children[0].innerText;
    todosCompletes.splice(todosCompletes.indexOf(todoIndex), 1);
    localStorage.setItem('todosCompletes', JSON.stringify(todosCompletes));
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