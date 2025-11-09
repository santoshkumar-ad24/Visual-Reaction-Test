const masg = document.querySelector("#msg");
const btn = document.querySelector("#start_btn");
const gameBox = document.querySelector("#box");
const resultDis = document.querySelector(".result_sec");
const resultPara = document.getElementById("resultP");
const countBox = document.querySelector("#count");
const sec = document.querySelector("#ss");
let seconds = 30;
const reactionList = [];
let timer , timeout;
let second;
let startTime, endTime, reactionTime;
let countDown = 0;

const startGame = () => {
    btn.disabled = true;
    btn.style.background = "radial-gradient( rgba(0, 255, 17, 1), rgba(6, 142, 15, 1)";
    btn.textContent = "Wait"
    resultDis.style.display = "none";
    masg.textContent = "Watch the ball..."

    intTimer();
    clearTimeout(timeout);
    timeout = setTimeout(showBox, delay());
    


}

const delay = () => {
    const time = (Math.random() * 1000 * 3) + 500;
    return time;
}
const topM = () => {
    const topVar = parseInt(Math.random() * 19);
    return topVar;
}
const LeftM = () => {
    const LeftVar = parseInt(Math.random() * 43);
    return LeftVar;
}

const showBox = () => {
    gameBox.style.display = "block";
    startTime = new Date().getTime();
    gameBox.style.marginTop = `${topM()}rem`;
    gameBox.style.marginLeft = `${LeftM()}rem`;


}
const resultTime = () => {
    const res = reactionList.reduce((a, b) => a + b, 0);
    return res / reactionList.length;
}

const resultDisplay = () => {
    btn.textContent = "Start"


    btn.style.background = "radial-gradient( rgba(255, 0, 0, 1), rgba(142, 15, 6, 1)";
    gameBox.style.display = "none";
    resultDis.style.display = "flex";
    masg.textContent = "Click 'start' to try again."
    btn.disabled = false;
    if(reactionList.length !== 0){
        countBox.textContent = `you have clicked ${countDown} Ball `
        resultPara.textContent = `Your Average Score is  ${resultTime().toFixed(2)} second! `
        
    }
    else{
        resultPara.textContent = `You are not clicked!!`
    }
    countDown=0;


}


const Updatetimer = () => {

    second = String(seconds).padStart(2, '0');
    sec.textContent = second;
    seconds--;

}

const intTimer = () => {

    if (timer) return;

    timer = setInterval(() => {
        // seconds--;
        if (seconds >= 0) {
            
            Updatetimer();
        }
        else {
            clearInterval(timer);
            timer = null;
            
            gameBox.style.display = "none";
            seconds= 30;

            resultDisplay();
        }
    }, 1000)



}

const boxClick = () => {

    gameBox.style.display = "none";
    endTime = new Date().getTime();
    reactionTime = (endTime - startTime) / 1000;
    reactionList.push(reactionTime);

    if (second === '00') {

        resultDisplay();
    }

    else {
        countDown++;
        setTimeout(showBox, delay());
        
    }


}




gameBox.addEventListener("click", boxClick);


btn.addEventListener("click", startGame);