
const $addRadio = document.querySelector('#plus-btn');
const $minusRadio = document.querySelector('#minus-btn');
const $btnStart = document.querySelector('.start-btn');
const $wrapper = document.querySelector('.wrapper');
const $input = document.querySelector('.counter-input');
const $gameBoard = document.querySelector('.game-board');
const $infoBar = document.querySelector('.info-bar');
const $columnBox = document.querySelector('.column-box');
const $lastColumn = document.querySelector('#last-column');
const $moveValue = document.querySelector('#move-value');
const $btnRules = document.querySelector('.btn__rules');
const $modalShadow = document.querySelector('.modal-shadow');
const $btnCloseModal = document.querySelector('.modal-shadow__close-btn');
const $btnRestart = document.querySelector('.btn__reload');
const $wonBox = document.querySelector('.won-modal');
const $btnPlayAgain = document.querySelector('#play-again-btn');
const $spanNumberOfMoving = document.querySelector('.number-moving');
const $modalCountMoves = document.querySelector('.modal-count-moves');
const $minCountMoves = document.querySelector('.min-count-moves');


let activeBlock = null;
let moveCounter = 0; 
let numberOfMoving = null;

const increaseValue = () => {
    if($input.value < 7){
        $input.value = parseInt($input.value) + 1;
    }
}

const decreaseValue = () => {
    if ($input.value > 3) {
        $input.value = $input.value - 1;
    }
}


// FUNCTION START GAME CHECKING INPUT VALUE
const startGame = () =>{
    //COUNTER-INPUT VALUE
    let inputBlocks = $input.value;
    
    
    inputBlocks = parseInt(inputBlocks);
    $wrapper.style.display = 'none';
    $gameBoard.classList.add('game-board--show');
    $infoBar.classList.add('info-bar--show');
    
    
    if(inputBlocks > 7){
        inputBlocks = 7;
    } else if(inputBlocks < 3){
        inputBlocks = 3;
    }
    createBlocksToStart(inputBlocks);
    
    const $blocks = document.querySelectorAll('.block');
    numberOfAllBlocks = $blocks.length;
    numberOfMoving = (Math.pow(2, numberOfAllBlocks) - 1);
    $spanNumberOfMoving.innerHTML = numberOfMoving;

};


// FUNCTION CREATE NEW BLOCKS 
const createBlocksToStart = (numberBlocks) => {    

    for (let i = numberBlocks; i > 0; i--) {
        let number = i;
        
        const div = document.createElement('div');
        div.classList.add('block');
        div.classList.add(`block--width-${number}`);
        div.innerHTML = number;
        div.id = number;
        if (number % 2 == 0){
            div.classList.add('block--even');
        }

        $columnBox.prepend(div);
    }
}

const selectBlock = e => {
    const target = e.target;
    const parent = target.parentElement;

    if(activeBlock === null) {
        if(target.children.length !== 0){
            target.firstElementChild.classList.add('block--active');
            activeBlock = target.firstElementChild;
        }else if(target.classList.contains('block')){
            parent.firstElementChild.classList.toggle('block--active');
            activeBlock = parent.firstElementChild;
        }
    } else {
        moveBlock(e);
    }
}

const moveBlock = e => {
    const target = e.target;
    const parent = target.parentElement;

    if(target.classList.contains('column-box')){
        if(target.children.length === 0) {
            createNewBlock(target);
        } else if(activeBlock.id < target.firstElementChild.id){
            createNewBlock(target);        
        }
    } else {
        return;
    }
    activeBlock.classList.remove('block--active');
    activeBlock = null;
    
    checkWin();
}

//CREATE NEW BLOCK ELEMENT IN CHOSE COLUMN BOX 
const createNewBlock = (target) => {
    activeBlock.classList.remove('block--active');
    const div = document.createElement('div');
    div.classList = activeBlock.classList;
    div.innerText = activeBlock.textContent;
    div.id = activeBlock.id;
    div.classList.remove('block--active');
    

    target.prepend(div);
    activeBlock.remove();

    moveCounter++;
    $moveValue.innerHTML = moveCounter;
}

const checkWin = () => {
    if ($lastColumn.children.length === numberOfAllBlocks) {
        setTimeout(function () {
            $wonBox.classList.add('won-modal--show');
            $modalCountMoves.innerHTML = moveCounter;
            $minCountMoves.innerHTML = numberOfMoving;
        }, 100);   
    }
}

const showModal = () => {
    if(!($modalShadow.style.display === 'flex')){
        $modalShadow.style.display = 'flex';
    } else {
        $modalShadow.style.display = 'none';
    }
}

const restartGame = () =>{
    location.reload();
}


$addRadio.addEventListener('click', increaseValue);
$minusRadio.addEventListener('click', decreaseValue);

$gameBoard.addEventListener('click', e => selectBlock(e));
$btnRules.addEventListener('click', showModal);
$btnStart.addEventListener('click', startGame);
$btnCloseModal.addEventListener('click', showModal);
$btnRestart.addEventListener('click', restartGame);
$btnPlayAgain.addEventListener('click', restartGame);
