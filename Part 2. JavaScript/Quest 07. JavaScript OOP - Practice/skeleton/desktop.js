class Desktop {
    constructor(iconCount, folderCount) {
        this.iconCount = iconCount;
        this.folderCount = folderCount;
        this.desktopNode = document.querySelector('.desktop');
        this.addItem();
    }

    addItem() {
        for (let i = 0; i < this.iconCount; i++) {
            new Icon(this.desktopNode, i + 1);
        }

        for (let i = 0; i < this.folderCount; i++) {
            new Folder(this.desktopNode, i + 1, this.iconCount + i + 1);
        }
    }
}

class Icon {
    constructor(desktopNode, num) {
        this.num = num;
        this.name = 'icon';
        let iconNode = this.createIconNode();
        desktopNode.appendChild(iconNode);
    }

    createIconNode() {
        let node = document.createElement("div");
        node.classList.add('icon');
        node.innerText = this.name + this.num;
        node.setAttribute('style', `top: 20px; left: ${(100 * (this.num - 1) + (20 * this.num))}px;`);
        addDragEventListener(node);
        return node;
    }
}

class Folder {
    constructor(desktopNode, num, totalNum) {
        this.num = num;
        this.name = 'folder';
        this.totalNum = totalNum;
        let folderNode = this.createFolderNode();
        desktopNode.appendChild(folderNode);
    }

    createFolderNode() {
        let node = document.createElement("div");
        node.classList.add('folder');
        node.innerText = this.name + this.num + ` (${this.totalNum})`;
        node.setAttribute('id', `f${this.totalNum}`);
        node.setAttribute('style', `top: 20px; left: ${(100 * (this.totalNum - 1) + (20 * this.totalNum))}px;`);
        addDragEventListener(node);
        node.addEventListener('dblclick', ()=> {
            isDbClicked = !isDbClicked;
            if(isDbClicked) {
                new Window(node);
            } else {
                let oldWindow = document.querySelector(`#f${this.totalNum} .window`);
                oldWindow.remove();
            }
        });
        return node;
    }


}

class Window {
    constructor(folderNode) {
        this.folderNode = folderNode;
        this.name = 'window';
        let windowNode = this.createWindowNode();
        this.folderNode.appendChild(windowNode);
    }

    createWindowNode() {
        let node = document.createElement("div");
        node.classList.add('window');
        node.innerText = this.name + ' ' + this.folderNode.innerHTML;
        node.setAttribute('style', 'position: absolute; z-index: 100;');
        addDragEventListener(node);
        isDbClicked = true;
        return node;
    }
}

let isClicked = false;
let isDbClicked = false;

function addDragEventListener(node) {
    node.addEventListener('mousedown', () => {
        isClicked = true;
    });
    node.addEventListener("mouseup", () => {
        isClicked = false;
    });
    node.addEventListener("mousemove", (e)=> {
        if(isClicked) {
            let newX = e.clientX;
            let newY = e.clientY;
            e.target.setAttribute('style', `position: absolute; left: ${newX-50}px; top: ${newY-50}px;`);
        }
    });
}