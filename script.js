const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const winning_combinations = [
    [0 , 1 , 2],
    [3 , 4 , 5],
    [6 , 7 , 8],
    [0 , 3 , 6],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [0 , 4 , 8],
    [2 , 4 , 6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winning_messaage_element = document.getElementById('winning-message');
const restartButton = document.getElementById('restartButton');
const winning_message_text_element = document.querySelector('[data-winning-message]');
let cricleTurn;

startGame();


restartButton.addEventListener('click' , startGame);
function startGame(){
    cricleTurn = false;
    setBoardHoverClass();
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click' , handleClick);
    cell.addEventListener('click' , handleClick , {once : true});
})
    winning_messaage_element.classList.remove('show');

}

function handleClick(e){
    const cell = e.target;
    const currentClass = cricleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell , currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
    swapTurns();
    setBoardHoverClass();
    }
}

function endGame(draw){
    if(draw){
        winning_message_text_element.innerText = 'Draw!'
    }else{
        winning_message_text_element.innerText = `${cricleTurn ? "O's" : "X's"} Wins`
    }

    winning_messaage_element.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

function placeMark(cell , currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    cricleTurn = !cricleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(cricleTurn){
        board.classList.add(CIRCLE_CLASS);
    }
    else{
        board.classList.add(X_CLASS);
    }

}

function checkWin(currentClass){
    return winning_combinations.some(combination => {
       return combination.every(index =>{
        return cellElements[index].classList.contains(currentClass)
       })
            
    });
}