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

    // 전체 메모 리스트 렌더, 각 메모 선택시 메모 본문 렌더
    showList() {
        fetch(`http://localhost:8080/memos`, {
            method: 'get'
        }).then((res) => res.json()).then((data) => {
            this.list.innerHTML = '';

            let temp = [];
            let files = [];
            data['body'].map(e => {
                let file = e.split('.');
                temp.push(file[0]);
            });

            temp.sort((a, b) => {
                return a-b;
            });

            temp.map(e => {
               e = e + '.txt';
               files.push(e);
            });

            for (let memo of files) {
                let li = document.createElement('li');
                li.classList.add(memo);
                li.innerText = memo;
                li.addEventListener('click', () => {
                    let title = memo.split('.');
                    this.currentFile = title[0];
                    fetch(`http://localhost:8080/memo/${title[0]}`, {
                        method: 'get'
                    }).then((res) => res.json()).then((data) => {
                        this.textarea.value = data.body;
                    })
                });
                this.list.appendChild(li);
            }
        })
    }

    addClickEvents() {
        this.writeBtn.addEventListener('click', () => {
            this.textarea.value = '';
        });

        this.saveBtn.addEventListener('click', () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            fetch(`http://localhost:8080/memo`, {
                method: 'post',
                headers: myHeaders,
                body: JSON.stringify({body: this.textarea.value})
            }).then((res) => res.json()).then((data) => {
                this.textarea.value = data.body;
                this.currentFile = data.title;
                this.showList();
            })
        });

        this.updateBtn.addEventListener('click', () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            fetch(`http://localhost:8080/memo/${this.currentFile}`, {
                method: 'put',
                headers: myHeaders,
                body: JSON.stringify({body: this.textarea.value})
            }).then((res) => res.json()).then((data) => {
                this.textarea.value = data.body;
                this.currentFile = data.title;
                this.showList();
            })
        });

        this.deleteBtn.addEventListener('click', () => {
            console.log(this.currentFile);
            fetch

        });
    }
}

