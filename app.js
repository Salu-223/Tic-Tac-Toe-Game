let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let msgDraw = document.querySelector(".draw-msg");

let turnO = true;

const winPatterns = [
    [0,4,8], [2,4,6], [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8],
];

const restGame = () => {
    turnO = true;
    enabledBtns();
    msgContainer.classList.add("hide");
    msgDraw.classList.add("hide");

};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "0";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
        isDraw();
    });
});

const disabledBtns = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enabledBtns = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBtns();
};

const checkWinner = (showWinnerOrNot) => {
    let winnerExists = false;
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                winnerExists = true;
            }
        } 
    }
    return winnerExists;

};

const isDraw = () => {
    // 1 check whether all the boxes are disabled or not
    let areBoxesdisblabled = true;
    for(let box of boxes) {
        if(box.disabled == false){
            areBoxesdisblabled = false;
            break;
        } 
    }
    console.log("draw is", areBoxesdisblabled);

    // 2 check if there is any winner or not
    let winnerExists = checkWinner(false);

    if(areBoxesdisblabled == true && winnerExists != true) {
        console.log("Game was draw"); 
        msgContainer.innerHTML = `Game was draw`;
        msgContainer.classList.remove("hide");
        // msgDraw.innerText = "Game was draw";
        // msgDraw.classList.remove("hide");
    }
};



newGameBtn.addEventListener("click", restGame);
resetBtn.addEventListener("click", restGame);
