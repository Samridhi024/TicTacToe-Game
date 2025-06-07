let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGamebtn = document.querySelector("#new-btn");
let newCont = document.querySelector(".msgcont");
let msg = document.querySelector("#msg");

let turn0 = true; 

const winptrn = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turn0 = true;
    enablebox();
    newCont.classList.add("hide");
    msg.innerText = ""; 
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true; 
        checkwin();
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congrats, Winner is ${winner}`;
    newCont.classList.remove("hide");
    disableBox();
};

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enablebox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const checkwin = () => {
    for (let ptrn of winptrn) {
        let pos1Val = boxes[ptrn[0]].innerText;
        let pos2Val = boxes[ptrn[1]].innerText;
        let pos3Val = boxes[ptrn[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }

    let allFilled = Array.from(boxes).every((box) => box.innerText !== "");
    if (allFilled) {
        msg.innerText = "It's a draw!";
        newCont.classList.remove("hide");
    }
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
