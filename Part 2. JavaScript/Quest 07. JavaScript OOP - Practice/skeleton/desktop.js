class Desktop {
    /* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    constructor(name, x, y){
        // 이름, 위치, 소유자
        this.name = name;
        this.x = x;
        this.y = y;
        this.owner = owner;
    }

    makeNewIcon(){

    } // 아이콘 생성
    sort(){} // 정렬
};

class Icon {
    /* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    constructor(name, x, y, width, height){
        // 이름, 위치, 아이콘 모양 크기
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    open(){} // 더블클릭하면 창 오픈
    drag(){} // 드래그하여 움직이기
    delete(){} // 아이콘 삭제
    changeName(){} // 이름 변경
    copy(){} // 복사
};

class Folder extends Icon {
    /* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    constructor(name, x, y, width, height){
        // 이름
        super(name, x, y, width, height);
    }

    showContents(){} // 폴더 내 컨텐츠 띄우기
    changeDisplay(){} // 폴더 내 컨텐츠 표현 방식 변경
};

class Window {
    /* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    constructor(width, height){
        // 창(화면)의 크기, 높이
        this.width = width;
        this.height = height;
    }

    close(){} // 창 닫기
    resize(){} // 창 사이즈 조절
};
