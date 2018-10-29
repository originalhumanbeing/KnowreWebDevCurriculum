class Notepad {
    constructor() {
        this.writeBtn = document.querySelector('.writeBtn');
        this.saveBtn = document.querySelector('.saveBtn');
        this.updateBtn = document.querySelector('.updateBtn');
        this.deleteBtn = document.querySelector('.deleteBtn');
        this.textarea = document.querySelector('.memo');
        this.list = document.querySelector('.list');
        this.id = document.querySelector('#id');
        this.pwd = document.querySelector('#pwd');
        this.loginBtn = document.querySelector('#loginBtn');
        this.authFailMsg = document.querySelector('.authFailMsg');
        this.currentFile = '';
        this.currentCursor = '';

        // this.showList();
        this.addClickEvents();
    }

    validateUser(id, pwd) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(`http://localhost:8080/login`, {
            method: 'post',
            headers: myHeaders,
            body: JSON.stringify({id: id, pwd: pwd})
        }).then((res) => res.json()).then((data) => {
            if(data['body'].isLogin && data['body'].nickname) {
                this.showList(data['body'.nickname]);
            } else {
                this.authFailMsg.innerText = data['body'];
                this.authFailMsg.hidden = false;
            }}).then(() => {
            this.id.value = '';
            this.pwd.value = '';
        })
    }

    // 전체 메모 리스트 렌더, 각 메모 선택시 메모 본문 렌더
    showList(nickname) {
        // nickname을 받았으니까 그에 맞는 메모를 노출
        fetch(`http://localhost:8080/memos`, {
            method: 'get'
        }).then((res) => res.json()).then((data) => {
            this.list.innerHTML = '';
            if (!data['body']) {
                console.log('아직 아무 파일도 없습니다');
            } else {
                let temp = [];
                let files = [];
                data['body'].map(e => {
                    let file = e.split('.');
                    temp.push(file[0]);
                });
                temp.sort((a, b) => a - b);
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
            }
        })
    }

    addClickEvents() {
        this.loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let id = this.id.value;
            let pwd = this.pwd.value;
            this.validateUser(id, pwd);
        });

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
            fetch(`http://localhost:8080/memo/${this.currentFile}`, {
                method: 'delete'
            }).then((res) => res.json()).then(data => {
                window.alert(data.body);
            });
            this.showList();
            this.textarea.value = '';
        });
    }
}

