// -------------------------------------Todo Section----------------------------------------------------

container = document.querySelector("#todo-tasks");

todos = [];

if(localStorage.getItem("todos") === null){
    todos = [];
    updateStorage();
}else{
    todos = JSON.parse(localStorage.todos);
    displayTodos();
}

function updateStorage(){
    localStorage.todos = JSON.stringify(todos);
}

function addTodo(){
    txt = addTaskInp.value;
    if(txt != ""){
        newTodo = {
            text: txt,
            done: false,
            deleted : false
        };
        
        todos.push(newTodo);
        updateStorage();

        addTaskInp.value = "";
        displayTodos();
    }else{
        alert("Text field can't be empty!");
    }
}

function doneTodo(todo){
    index = todo.dataset.index;

    todo.classList.toggle("done");
    todos[index].done = !todos[index].done;

    updateStorage();
}

function deleteTodo(todo){
    index = todo.dataset.index;

    if(todo.classList.contains("deleted") == false){
        todo.classList.add("deleted");
        todos[index].deleted = true;

        updateStorage();
    }
}

function editTodo(todo){
    deleteTodo(todo);

    index = todo.dataset.index;
    addTaskInp.value = todos[index].text;
    addTaskInp.focus();
}

function displayTodos(){
    container.innerHTML = "";
    for(var i = todos.length - 1; i >= 0; i--){
        str = "";
        if(todos[i].deleted == true){
            str += " deleted";
        }

        if(todos[i].done == true){
            str += " done";
        }

        container.innerHTML += `<div data-index="${i}" class="task todo-task${str}">
            <div class="text">${todos[i].text}</div>
            <button class="check"><span class="fas fa-check"></span></button>
            <button class="edit"><span class="far fa-edit"></span></button>
            <button class="delete" class="trash"><span class="fas fa-trash"></span></button>
        </div>`;
    }

    todosObj = document.querySelectorAll(".todo-task");
    todosObj.forEach(function(todo){
        checkBtn = todo.children[1];
        editBtn = todo.children[2];
        deleteBtn = todo.children[3];

        checkBtn.addEventListener("click", function(){
            todo = this.parentElement;
            doneTodo(todo);
        });

        editBtn.addEventListener("click", function(){
            todo = this.parentElement;
            editTodo(todo);
        });
        
        deleteBtn.addEventListener("click", function(){
            todo = this.parentElement;
            deleteTodo(todo);
        });
    });
}

// -------------------------------------AddTask Section----------------------------------------------------

addTaskInp = document.querySelector("#add-task-input");
plusBtn = document.querySelector("#plus");
clearBtn = document.querySelector("#clear");

plusBtn.addEventListener("click", function(){
    addTodo();
});

addTaskInp.addEventListener("keydown", function(e){
    if(e.keyCode == 13){
        addTodo();
    }
});

clearBtn.addEventListener("click", function() {
    addTaskInp.value = "";
});