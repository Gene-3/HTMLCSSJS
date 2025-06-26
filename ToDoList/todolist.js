window.onload = function () { 
    // 페이지가 로드되면 실행되는 부분
    // 저장된 할 일 목록 불러와서 화면에 보여주고,
    // 버튼과 입력창 이벤트 리스너 등록함
    const savedToDoList = JSON.parse(localStorage.getItem('todolist')); 
    const editBtn = document.querySelector("#editBtn");

    if (savedToDoList) {
        for (let todo of savedToDoList) {
            createToDo(todo);
        }
    }

    const startBtn = document.querySelector("#addBtn");
    startBtn.addEventListener("click", function () {
        const inputBox = document.querySelector('#inputBox');
        createToDo({ contents: inputBox.value, check: false });
        inputBox.value = "";
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

let edit = 0; // 편집 모드 상태 저장 변수 (0: 일반, 1: 편집 중)

function createToDo(todo) {
    // 할 일 항목을 만들고 화면에 추가하는 함수
    if (!todo || !todo.contents.trim()) return; // 빈 내용이면 무시함

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

    // 체크 버튼 눌렀을 때 체크 상태 바꾸고 저장
    checkBtn.addEventListener("click", function () {
        todoText.classList.toggle('check');
        checkBtn.innerText = todoText.classList.contains('check') ? 'V' : '';
        saveToDoList();
    });

    // 삭제 버튼 눌렀을 때 항목 삭제하고 저장
    const delBtn = document.createElement('button');
    delBtn.innerText = 'x';
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", function () {
        liNode.remove();
        saveToDoList();
    });

    inputBox.classList.add("displayNone"); // 수정용 input은 기본 숨김

    // 항목에 버튼, 텍스트, input 다 붙여서 리스트에 추가함
    liNode.appendChild(checkBtn);
    liNode.appendChild(todoText);
    liNode.appendChild(inputBox);
    liNode.appendChild(delBtn);

    const ulNode = document.querySelector('ul');
    ulNode.appendChild(liNode);

    document.querySelector('#todolist').style.display = 'block';

    saveToDoList(); // 저장
}

function saveToDoList() {
    // 현재 할 일 목록을 로컬스토리지에 저장하는 함수
    const todoList = document.querySelectorAll('li');
    const saveItems = [];

    for (let node of todoList) {
        saveItems.push({
            contents: node.querySelector('span').innerText,
            check: node.querySelector('span').classList.contains('check')
        });
    }

    localStorage.setItem('todolist', JSON.stringify(saveItems));
}

function editToDoList() {
    // 편집 모드 토글하는 함수
    const linodes = document.querySelectorAll('#todolist li');

    if (edit === 0) {
        // 편집 모드 켤 때: 텍스트 숨기고 input 보여줌
        linodes.forEach(li => {
            li.querySelector("input").classList.remove('displayNone');
            li.querySelector("span").classList.add('displayNone');
        });
        edit = 1;
    } else {
        // 편집 모드 끌 때: input 값 텍스트로 넣고 저장, input 숨기고 텍스트 보여줌
        linodes.forEach(li => {
            const inputBox = li.querySelector("input");
            const textBox = li.querySelector("span");
            textBox.innerText = inputBox.value;
            inputBox.classList.add('displayNone');
            textBox.classList.remove('displayNone');
        });
        saveToDoList();
        edit = 0;
    }
}
