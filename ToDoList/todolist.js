window.onload = function () { // 페이지 로드됐을 때 실행하는 기능
    const savedToDoList = JSON.parse(localStorage.getItem('todolist')); // 저장된 할 일 불러오는 기능
    const editBtn = document.querySelector("#editBtn"); // 수정 버튼 찾는 기능

    if (savedToDoList) {
        for (let todo of savedToDoList) {
            createToDo(todo); // 저장된 할 일 보여주는 기능
        }
    }

    const startBtn = document.querySelector("#addBtn"); // 추가 버튼 찾는 기능
    startBtn.addEventListener("click", function () {
        const inputBox = document.querySelector('#inputBox');
        createToDo({ contents: inputBox.value, check: false }); // 할 일 추가하는 기능
        inputBox.value = ""; // 입력칸 초기화하는 기능
    });

    const inputBox = document.querySelector('#inputBox'); // 입력칸 찾는 기능
    inputBox.addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {
            createToDo({ contents: inputBox.value, check: false }); // 엔터 누르면 할 일 추가하는 기능
            inputBox.value = ""; // 입력칸 초기화하는 기능
        }
    });

    editBtn.addEventListener("click", editToDoList); // 수정 버튼 클릭할 때 편집 모드 토글하는 기능
}

let edit = 0; // 편집 상태 저장하는 변수

function createToDo(todo) {
    if (!todo || !todo.contents.trim()) return; // 내용 없으면 실행 안 하는 기능

    // 할 일 항목 만드는 기능
    const liNode = document.createElement('li');
    const checkBtn = document.createElement('button');
    checkBtn.classList.add("checkBtn");
    const todoText = document.createElement('span');
    const inputBox = document.createElement('input');

    todoText.innerText = todo.contents;
    inputBox.value = todo.contents;

    if (todo.check) {
        todoText.classList.add('check'); // 체크 표시하는 기능
        checkBtn.innerText = "V";
    }

    checkBtn.addEventListener("click", function () {
        todoText.classList.toggle('check'); // 체크 토글하는 기능
        checkBtn.innerText = todoText.classList.contains('check') ? 'V' : '';
        saveToDoList(); // 저장하는 기능
    });

    const delBtn = document.createElement('button');
    delBtn.innerText = 'x';
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", function () {
        liNode.remove(); // 삭제하는 기능
        saveToDoList(); // 저장하는 기능
    });

    inputBox.classList.add("displayNone"); // 수정 input 숨기는 기능

    liNode.appendChild(checkBtn);
    liNode.appendChild(todoText);
    liNode.appendChild(inputBox);
    liNode.appendChild(delBtn);

    const ulNode = document.querySelector('ul');
    ulNode.appendChild(liNode); // 리스트에 추가하는 기능

    document.querySelector('#todolist').style.display = 'block'; // 리스트 보이게 하는 기능

    saveToDoList(); // 저장하는 기능
}

function saveToDoList() {
    // 할 일 목록 저장하는 기능
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
    // 편집 모드 켜고 끄는 기능
    var linodes = document.querySelectorAll('#todolist li');

    if (edit === 0) {
        linodes.forEach(li => {
            let inputBox = li.querySelector("input");
            let textBox = li.querySelector("span");
            inputBox.classList.remove('displayNone'); // 수정 input 보이게 하는 기능
            textBox.classList.add('displayNone'); // 텍스트 숨기는 기능
        });
        edit = 1; // 편집 모드 상태 바꾸는 기능
    } else if(edit == 1) {
        linodes.forEach(li => {
            let inputBox = li.querySelector("input");
            let textBox = li.querySelector("span");
            textBox.innerText = inputBox.value; // 수정값 텍스트로 바꾸는 기능
            inputBox.classList.add('displayNone'); // 수정 input 숨기는 기능
            textBox.classList.remove('displayNone'); // 텍스트 보이게 하는 기능
            saveToDoList(); // 저장하는 기능
        });
        edit = 0; // 편집 모드 상태 바꾸는 기능
    }
}
