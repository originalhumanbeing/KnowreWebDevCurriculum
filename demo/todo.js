class TodoInput {
    constructor() {
        this.addTodo();
    }

    addTodo() {
        let todoInput = document.querySelector('#todoInput');

        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                let todoContent = todoInput.value;
                new TodoItem(todoContent);
                todoInput.value = '';
                countTodoItems();
            }
        });
    }
}

class TodoItem {
    constructor(todoContent) {
        this.todoCheckBox = new TodoCheckBox();
        this.todoDeleteBtn = new TodoDeleteBtn();
        this.todoContentBox = new TodoContentBox(todoContent);

        this.todoItem = this.createTodoItemDom(todoContent);
        this.todoItem.classList.add("todoItem");
        this.todoItem.classList.add("todo");

        let todoList = document.querySelector('#todoList');
        todoList.appendChild(this.todoItem);
    }

    createTodoItemDom() {
        let todoItemDom = document.createElement("li");

        todoItemDom.appendChild(this.todoCheckBox.todoCheckBoxNode);
        todoItemDom.appendChild(this.todoContentBox['todoOriginalBoxNode']);
        todoItemDom.appendChild(this.todoContentBox['todoUpdateBoxNode']);
        todoItemDom.appendChild(this.todoDeleteBtn.todoDeleteBtnNode);

        todoItemDom.addEventListener('click', (e)=> {
            let todoOriginalBox = this.todoContentBox['todoOriginalBoxNode'];
            let todoUpdateBox = this.todoContentBox['todoUpdateBoxNode'];

            if(e.target.className === 'todoItem') {
                todoOriginalBox.classList.add('hidden');
                todoUpdateBox.classList.remove('hidden');
            } else if(e.target.className === 'todoOriginalBox') {
                todoOriginalBox.classList.add('hidden');
                todoUpdateBox.classList.remove('hidden');
            }
        });

        todoItemDom.addEventListener('mouseenter', ()=> {
            this.todoDeleteBtn.todoDeleteBtnNode.classList.remove('hidden');
        });

        todoItemDom.addEventListener('mouseleave', ()=> {
            this.todoDeleteBtn.todoDeleteBtnNode.classList.add('hidden');
        });

        return todoItemDom;
    }
}

class TodoCheckBox {
    constructor() {
        this.todoCheckBoxNode = document.createElement("input");
        this.createTodoCheckBoxNode(this.todoCheckBoxNode);
    }

    createTodoCheckBoxNode(todoCheckBoxNode) {
        todoCheckBoxNode.classList.add("todoCheckBox");
        todoCheckBoxNode.setAttribute('type', 'checkbox');
        todoCheckBoxNode.addEventListener('click', ()=> {
            todoCheckBoxNode.nextSibling.classList.toggle('completed');
            todoCheckBoxNode.parentNode.classList.toggle('todo');
            countTodoItems();
            countDoneItems();
        });
        return todoCheckBoxNode;
    }
}

class TodoContentBox{
    constructor(todoContent) {
        this.todoContent = todoContent;
        this.todoOriginalBoxNode = document.createElement("span");
        this.todoUpdateBoxNode = document.createElement("input");
        this.createTodoContentBoxNode(this.todoOriginalBoxNode, this.todoUpdateBoxNode);
    }

    createTodoContentBoxNode(todoOriginalBoxNode, todoUpdateBoxNode) {
        todoOriginalBoxNode.classList.add("todoOriginalBox");
        todoOriginalBoxNode.innerText = this.todoContent;
        let todoOriginalBoxValue = todoOriginalBoxNode.innerText;

        todoUpdateBoxNode.classList.add("todoUpdateBox");
        todoUpdateBoxNode.classList.add("hidden");
        todoUpdateBoxNode.setAttribute('placeholder', `${this.todoContent}`);
        todoUpdateBoxNode.setAttribute('type', 'text');

        todoUpdateBoxNode.addEventListener('keypress', (e)=> {
            let updatedValue = e.target.value;
            if(e.key === 'Enter' && updatedValue) {
                todoOriginalBoxNode.innerText = updatedValue;
                todoOriginalBoxValue = updatedValue;
                todoUpdateBoxNode.setAttribute('placeholder', `${updatedValue}`);
                todoUpdateBoxNode.value = '';
                todoOriginalBoxNode.classList.remove('hidden');
                todoUpdateBoxNode.classList.add('hidden');
            } else if (e.key === 'Enter' && !updatedValue) {
                todoOriginalBoxNode.innerText = todoOriginalBoxValue;
                todoUpdateBoxNode.setAttribute('placeholder', `${todoOriginalBoxValue}`);
                todoOriginalBoxNode.classList.remove('hidden');
                todoUpdateBoxNode.classList.add('hidden');
            }
        });

        return [todoOriginalBoxNode, todoUpdateBoxNode];
    }
}

class TodoDeleteBtn {
    constructor() {
        this.todoDeleteBtnNode = document.createElement("button");
        this.createTodoDeleteBtnNode(this.todoDeleteBtnNode);
    }

    createTodoDeleteBtnNode(todoDeleteBtnNode) {
        todoDeleteBtnNode.innerText = 'x';
        todoDeleteBtnNode.classList.add("deleteBtn");
        todoDeleteBtnNode.classList.add("hidden");
        todoDeleteBtnNode.addEventListener('click', ()=> {
            let todoList = document.querySelector('#todoList');
            todoList.removeChild(todoDeleteBtnNode.parentNode);
            countTodoItems();
            countDoneItems();
        });
        return todoDeleteBtnNode;
    }
}

class Counter {
    constructor() {
        this.counterNode = document.createElement("div");
        this.counterNode.classList.add('counter');
        this.createTodoCountNode(this.counterNode);
    }

    createTodoCountNode(counterNode) {
        let todoCounterNode = document.createElement("span");
        todoCounterNode.innerText = 'Todo';
        let todoCounterValueNode = document.createElement("span");
        todoCounterValueNode.classList.add('todoNum');
        todoCounterValueNode.innerText = todoNum;

        let doneCountNode = document.createElement("span");
        doneCountNode.innerText = 'Done';
        let doneCountValueNode = document.createElement("span");
        doneCountValueNode.classList.add('doneNum');
        doneCountValueNode.innerText = doneNum;

        counterNode.appendChild(todoCounterNode);
        counterNode.appendChild(todoCounterValueNode);
        counterNode.appendChild(doneCountNode);
        counterNode.appendChild(doneCountValueNode);

        let wrapper = document.querySelector('.wrapper');
        wrapper.appendChild(counterNode);

        return counterNode;
    }
}

let todoNum = 0;
let doneNum = 0;

function countTodoItems() {
    let todoItems = document.querySelectorAll('.todo');
    todoNum = todoItems.length;

    let todoNumNode = document.querySelector('.todoNum');
    todoNumNode.innerText = todoNum;

    return todoNum;
}

function countDoneItems() {
    let doneItems = document.querySelectorAll('.completed');
    doneNum = doneItems.length;

    let doneNumNode = document.querySelector('.doneNum');
    doneNumNode.innerText = doneNum;

    return doneNum;
}