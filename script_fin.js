const masg = document.querySelector("#msg");
const btn = document.querySelector("#start_btn");
const gameBox = document.querySelector("#box");
const resultDis = document.querySelector(".result_sec");
const resultPara = document.getElementById("resultP");
const countBox = document.querySelector("#count");
const sec = document.querySelector("#ss");
const audioTick = document.getElementById("audioTick");
const audioPop = document.getElementById("audioPop");
const bgMusic = document.getElementById("bgMusic");
const mouseClick = document.getElementById("mouseClick");
const vidBox = document.getElementById("videoBox");
const digGame = document.getElementById("digGame");
const audioController = document.querySelectorAll(".audioCon");
const bgVolume = document.getElementById("backgroundMusic");
const charVolume = document.getElementById("gameObj");
const controller = document.querySelector(".controller");
const gameDisplay = document.querySelector(".game_display");
const clicked = document.getElementById("clicked");
const avgScore = document.getElementById("avgScore");
const resCon = document.getElementById("resCon");
let seconds;
let boxTimer;
const reactionList = [], faultyEndRec = [], faultyStartRec = [];
let timeout;
let second;
let startTime, endTime, reactionTime, faultyStart_time, faultyEnd_time;
let countDown;
let bgColor;
let isTrue = false;
let gifDuration;
let evenOnloaded;
let higestClicked = [0];
let highestTime = [0];


const delay = () => {

    const time = (Math.random() * 1000 * 2);
    return time;
}


const startGame = () => {
    mouseClick.currentTime = 0;
    mouseClick.play();
    mouseClick.volume = 0.8;
    btn.disabled = true;
    btn.style.background = "radial-gradient( rgba(0, 255, 17, 1), rgba(6, 142, 15, 1))";
    btn.textContent = "Wait"
    resultDis.style.display = "none";
    masg.textContent = "Wait and Watch the ball..."
    countDown = 0;
    seconds = 30;
    intTimer();
    clearTimeout(timeout);
    timeout = setTimeout(showBox, delay());
    reactionList.length = 0;
    setTimeout(() => {
        bgMusic.currentTime = 0;
        bgMusic.play();
        bgMusic.loop = true;
    }, 300);
    resCon.style.display = "block";
}

const topM = () => {
    let displayT = parseInt((gameDisplay.clientHeight - gameBox.clientHeight) / 16);
    const topVar = parseInt(Math.random() * (displayT + 1));
    return topVar;
}
const LeftM = () => {
    let displayM = parseInt((gameDisplay.clientWidth - gameBox.clientWidth) / 16);
    const LeftVar = parseInt(Math.random() * (displayM + 1));
    return LeftVar;
}

function playBoth() {
    
    vidBox.currentTime = 0;
    digGame.currentTime = 0;
    vidBox.play();
    digGame.play();
}
function stopBoth() {
    clearTimeout(evenOnloaded);
    vidBox.currentTime = 0;
    digGame.currentTime = 0;
    vidBox.pause();
    digGame.pause();
};


const showBox = () => {
    isTrue = true;
    faultyStartRec.length = 0;
    faultyEndRec.length = 0;
    playBoth();
    
    digGame.onended = () => {
        
        evenOnloaded = setTimeout(() => {
            playBoth();
        }, 1000);
    };
    gameBox.style.display = "block";
    startTime = new Date().getTime();
    gameBox.style.marginTop = `${topM()}rem`;
    gameBox.style.marginLeft = `${LeftM()}rem`;

    if (seconds == 0) {
        boxClick();
    }
}


const resultTime = () => {
    const res = reactionList.reduce((a, b) => a + b, 0);
    return res / reactionList.length;
}

function faultyStart() {
    if (faultyStartRec.length > 0) {
        faultyStart_time = faultyStartRec.reduce((a, b) => a + b, 0);
        return faultyStart_time;
    }
    else {
        return faultyStartRec.length;
    }
}
function faultyEnd() {
    if (faultyEndRec.length > 0) {
        faultyEnd_time = faultyEndRec.reduce((a, b) => a + b, 0);
        return faultyEnd_time;
    }
    else {
        return faultyEndRec.length;
    }
}


const boxClick = () => {
    isTrue = false;

    if (seconds > 0) {
        stopBoth();
        countDown++;
        gameBox.style.display = "none";
        endTime = new Date().getTime();
        reactionTime = ((endTime - startTime) - (faultyEnd() - faultyStart())) / 1000;
        reactionList.push(reactionTime);
        setTimeout(showBox, delay());
    }
    else {
        if (seconds == 0) {
            resultDisplay();
        }
        else {
            boxClick();
        }
    }
}


const resultDisplay = () => {
    stopBoth();
    faultyStartRec.length = 0;
    faultyEndRec.length = 0;
    bgMusic.pause();
    audioPop.pause();
    audioPop.currentTime = 0;
    audioPop.play();
    audioPop.volume = 0.6;
    btn.textContent = "Start"
    resCon.style.display = "none";
    btn.style.background = "radial-gradient( rgba(255, 0, 0, 1), rgba(142, 15, 6, 1))";
    gameBox.style.display = "none";
    clearTimeout(timeout);
    resultDis.style.display = "flex";
    masg.textContent = "Click 'start' to try again."
    btn.disabled = false;
    sec.classList.remove("digit");
    sec.textContent = "30";
    if (reactionList.length == 0) {
        countBox.textContent = "";
        resultPara.textContent = `You didn’t click any ball!!`;
    }
    else {
        countBox.textContent = `You have clicked ${countDown} Ball `;
        resultPara.textContent = `Your average reaction time is ${resultTime().toFixed(2)} second! `;
    }


    higestClicked.push(countDown);


    if (countDown == Math.max(...higestClicked) && resultTime().toFixed(2) < Math.max(...highestTime)) {
        clicked.textContent = `Clicks: ${countDown}`;
        avgScore.textContent = `Time: ${resultTime().toFixed(2)}s`;
    }
    else if (countDown >= Math.max(...higestClicked)) {
        clicked.textContent = `Clicks: ${countDown}`;
        avgScore.textContent = `Time: ${resultTime().toFixed(2)}s`;
        highestTime.push(resultTime().toFixed(2))
    }
}


const Updatetimer = () => {
    clearInterval(boxTimer)
    second = String(seconds).padStart(2, '0');
    sec.textContent = second;
    if (seconds < 10) {
        audioTick.currentTime = 0;
        audioTick.play();
        audioTick.volume = 0.3;
        sec.classList.remove("digit");
        void sec.offsetWidth;
        sec.classList.add("digit");
    }
}

let timer;
const intTimer = () => {
    timer = setInterval(() => {
        if (seconds > 0) {
            seconds--;
            Updatetimer();
        } else {
            clearInterval(timer);
            if (resultDis.style.display === 'none') {
                boxClick();
            }
        }
    }, 1000);
};


controller.style.display = "none";
const audioCon = () => {
    controller.style.display = controller.style.display === "none" ? "grid" : "none";
    if (controller.style.display === "grid") {
        clearInterval(timer);
        if (isTrue === true) {
            faultyStartRec.push(new Date().getTime());
        }
        gameBox.removeEventListener("click", boxClick)
        stopBoth();
    }
    else {
        if (isTrue === true) {
            faultyEndRec.push(new Date().getTime());
            playBoth();
        }
        gameBox.addEventListener("click", boxClick);
        intTimer();
    }
}


bgVolume.addEventListener('input', () => {
    bgMusic.volume = bgVolume.value;
});
charVolume.addEventListener('input', () => {
    digGame.volume = charVolume.value
});


audioController.forEach(element => {
    element.addEventListener("click", audioCon);
});


gameBox.addEventListener("click", boxClick);
btn.addEventListener("click", startGame);


resCon.style.display = "none";
resCon.addEventListener("click", () => {
    btn.disabled = false;
    clearInterval(timer);
    countDown = 0;
    reactionList.length = 0;
    faultyEndRec.length = 0;
    faultyStartRec.length = 0;
    btn.textContent = "Loading.."
    sec.textContent = "30";
    btn.style.background = "radial-gradient( rgba(0, 145, 255, 1), rgba(6, 83, 142, 1))";
    controller.style.display = "none";
    gameBox.addEventListener("click", boxClick);

    gameBox.style.display = "none";
    setTimeout(() => {
        startGame();
    }, 600);

});
