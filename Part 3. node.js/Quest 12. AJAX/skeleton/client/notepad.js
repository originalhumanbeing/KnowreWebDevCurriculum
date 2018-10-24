class Notepad {
    constructor() {
        this.writeBtn = document.querySelector('.writeBtn');
        this.saveBtn = document.querySelector('.saveBtn');
        this.updateBtn = document.querySelector('.updateBtn');
        this.deleteBtn = document.querySelector('.deleteBtn');
        this.textarea = document.querySelector('.memo');
        this.list = document.querySelector('.list');
        this.currentFile = '';

        this.showList();
        this.addClickEvents();
    }

    showList() {
        // 변경 사항이 있을 때마다 새로 뿌리는 것은...?
        fetch(`http://localhost:8080/memos`, {
            method: 'get'
        }).then((res) => res.json()).then((data) => {
            for(let memo of data) {
                let li = document.createElement('li');
                li.innerText = memo;
                this.list.appendChild(li);
            }
        })
    }

    addClickEvents() {
        this.saveBtn.addEventListener('click', () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "text/plain");

            fetch(`http://localhost:8080/memo`, {
                method: 'post',
                headers: myHeaders,
                body: this.textarea.value
            //  문자열을 JSON.stringify로 감싸면 "" 가 생김
            //  req 보낼 때, 서버에서 res 보낼 때 항상 문자열로 보내고 받을 때는 버퍼 영역에 있던 바이너리 형태의 데이터를 객체화한다
            })
                .then((res) => res.json())
                .then((data) => {
                    this.textarea.value = data.body;
                    this.currentFile = data.title;
                })
        });

        this.updateBtn.addEventListener('click', () => {
            console.log(this.currentFile);
        })
    }
}

