// 입력된 숫자만큼 줄을 찍어야 한다, 무조건 첫 줄은 1부터 시작, 그다음 홀수를 그다음줄에 찍는다

function showStar() {
    let num = Number(prompt("0 이상의 숫자를 입력해 주세요"));
    if (typeof(num) == "number" && num > 0) {
        let star = '';
        for (let i=0; i<num; i++) {
            for (let j=0; j<num-i-1; j++) {
                star += ' ';
            }
            for (let k=0; k<2*i+1; k++) {
                star += '*';
            }
            star += "\n";
        }
        console.log(star);
    } else {
        console.log("0 이상의 숫자가 아닙니다")
    }
}

showStar();