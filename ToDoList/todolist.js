window.onload = function () {
    const savedToDoList = JSON.parse(localStorage.getItem('todolist'));
    if (savedToDoList) {
        for (let todo of savedToDoList) {
            createToDo(todo);
        }
    }

    const startBtn = document.querySelector("#addBtn");
    startBtn.addEventListener("click", function () {
        const inputBox = document.querySelector('#inputBox');
        createToDo({ contents: inputBox.value, check: false });
        inputBox.value = ""; // 입력 후 초기화
    });

    const inputBox = document.querySelector('#inputBox');
    inputBox.addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {
            createToDo({ contents: inputBox.value, check: false });
            inputBox.value = "";
        }
    });

    editBtn.addEventListener("click", editToDoList);

    
}

let edit = 0; 

function createToDo(todo) {
    if (!todo || !todo.contents.trim()) return;

    const liNode = document.createElement('li');

    const checkBtn = document.createElement('button');
    checkBtn.classList.add("checkBtn");

    const todoText = document.createElement('span');
    const inputBox = document.createElement('input');
    todoText.innerText = todo.contents;
    inputBox.value = todo.contents;
    if (todo.check) {
        todoText.classList.add('check');
        checkBtn.innerText = "V";
    }

    checkBtn.addEventListener("click", function () {
        todoText.classList.toggle('check');
        checkBtn.innerText = todoText.classList.contains('check') ? 'V' : '';
        saveToDoList();
    });

    const delBtn = document.createElement('button');
    delBtn.innerText = 'x';
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", function () {
        liNode.remove();
        saveToDoList();
    });

    inputBox.classList.add("displayNone");

    liNode.appendChild(checkBtn);
    liNode.appendChild(todoText);
    liNode.appendChild(inputBox);
    liNode.appendChild(delBtn);

    const ulNode = document.querySelector('ul');
    ulNode.appendChild(liNode);

    document.querySelector('#todolist').style.display = 'block';

    saveToDoList();
}

function saveToDoList() {
    const todoList = document.querySelectorAll('li');
    const saveItems = [];

    for (let node of todoList) {
        const todoObj = {
            contents: node.querySelector('span').innerText,
            check: node.querySelector('span').classList.contains('check')
        };
        saveItems.push(todoObj);
    }

    localStorage.setItem('todolist', JSON.stringify(saveItems));
}



function editToDoList() {
    
    var linodes = document.querySelectorAll('#todolist li');
    if (edit === 0) {
        linodes.forEach(li => {
            let inputBox = li.querySelector("input");
            let textBox = li.querySelector("span");
            inputBox.classList.remove('displayNone');
            textBox.classList.add('displayNone');
        });
 
        edit = 1;

    } else if(edit == 1) {
        linodes.forEach(li => {
            let inputBox = li.querySelector("input");
            let textBox = li.querySelector("span");
            textBox.innerText = inputBox.value;
            inputBox.classList.add('displayNone');
            textBox.classList.remove('displayNone');
            saveToDoList();
        });

        edit = 0;
    }

}