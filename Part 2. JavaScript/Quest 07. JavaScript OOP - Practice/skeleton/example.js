var Desktop = function (dom, iconCount, folderCount) {
    var uid = 0;
    var dragging = null;
    var self = this;
    this.dom = dom;
    this.windows = [];

    (function initialize(iconCount, folderCount) {
        for (var i = 0; i < iconCount; i++) {
            addItem("icon");
        }
        for (var i = 0; i < folderCount; i++) {
            addItem("folder");
        }
    }(iconCount, folderCount));

    function addItem(item) {
        if (item === "icon") {
            var name = "icon" + uid++;
            var newItem = new Icon(name);
        } else if (item === "folder") {
            var name = "folder" + uid++;
            var newItem = new Folder(name);
        }
        newItem.dom.addEventListener('mousedown', function (e) {
            dragging = newItem;
        });
        self.dom.appendChild(newItem.dom);
        // add item to desktop
    }
    this.dom.addEventListener('mouseup', function (e) {
        dragging = null;
    });
    this.dom.addEventListener('mousemove', function (e) {
        if (dragging) {
            dragging.move(e.pageX, e.pageY);
        }
    });
    this.dom.addEventListener('launchWindow', function (e) {
        e.stopPropagation();
        var winId = e.target.innerHTML;
        if (self.windows.indexOf(winId) < 0) {
            var newWin = new Window(winId);
            self.windows.push(winId);
            newWin.titleBar.addEventListener('mousedown', function (e) {
                dragging = newWin;
            });
            self.dom.appendChild(newWin.dom);
        }
    });
    /* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};

var Icon = function (name) {
    this.diffX = 0;
    this.diffY = 0;
    this.type = "icon";
    this.name = name;
    this.dom = this.makeDom();
    this.attachEventHandlers();
    this.dom.innerHTML = this.name;
    /* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};
Icon.prototype = {
    "zIndex": 100,
    "margin": 10,
    "attachEventHandlers": function () {
        this.dom.addEventListener("mousedown", this, false);
    },
    "makeDom": function () {
        var newDiv = document.createElement('div');
        newDiv.style.margin = this.margin + "px";
        newDiv.classList.add(this.type);
        newDiv.setAttribute("id", this.name);
        return newDiv;
    },
    "move": function (x, y) {
        var offsetX = x - this.diffX;
        var offsetY = y - this.diffY;
        this.dom.style.position = "absolute";
        this.dom.style.left = offsetX + "px";
        this.dom.style.top = offsetY + "px";
    },
    "handleEvent": function (e) {
        switch (e.type) {
            case 'mousedown':
                this.dom.style.zIndex = Icon.prototype.zIndex++;
                this.diffX = (e.pageX + this.margin) - this.dom.offsetLeft;
                this.diffY = (e.pageY + this.margin) - this.dom.offsetTop;
                break;
            case 'dblclick':
                var event = document.createEvent('Event');
                event.initEvent('launchWindow', true, true);
                this.dom.dispatchEvent(event);
                break;
        }
    }
};

var Folder = function (name) {
    this.type = "folder";
    this.name = name;
    this.dom = this.makeDom();
    this.attachEventHandlers();
    this.dom.innerHTML = this.name;
    /* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};
Folder.prototype = Object.create(Icon.prototype);
Folder.prototype.constructor = Folder;
Folder.prototype.attachEventHandlers = function () {
    Icon.prototype.attachEventHandlers.call(this);
    this.dom.addEventListener("dblclick", this, false);
};
var Window = function (name) {
    this.type = "window";
    this.name = name;
    this.margin = 0;
    this.titleBar = null;
    this.dom = this.makeDom();
    this.attachEventHandlers();
    this.dom.style.zIndex = Icon.prototype.zIndex++;

    /* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};
Window.prototype = Object.create(Icon.prototype);
Window.prototype.constructor = Window;
Window.prototype.makeDom = function () {
    var newDiv = document.createElement('div');
    var titleDiv = document.createElement('div');
    newDiv.style.margin = this.margin + "px";
    newDiv.classList.add(this.type);
    newDiv.setAttribute("id", this.name);
    titleDiv.classList.add("title-bar");
    titleDiv.innerHTML = this.name;
    titleDiv.setAttribute("id", "window-" + this.name);
    newDiv.appendChild(titleDiv);
    this.titleBar = titleDiv;
    return newDiv;
};
Window.prototype.attachEventHandlers = function () {
    this.titleBar.addEventListener("mousedown", this, false);
};