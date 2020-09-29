
const $blocks = document.querySelectorAll('.block');
console.log($blocks.length);

let activeBlock = null;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    
}

const prepareDOMElements = () => {
    $btnStart = document.querySelector('.start-btn');
    $wrapper = document.querySelector('.wrapper');
    $input = document.querySelector('.counter-input');
    $gameBoard = document.querySelector('.game-board');
    $columnBox = document.querySelector('.column-box');
    $lastColumn = document.querySelector('.column-box__last-element');
    $btnRules = document.querySelector('.btn-rules');
    $modalShadow = document.querySelector('.modal-shadow');
    $btnCloseModal = document.querySelector('.btn-close-modal')
    
}

const prepareDOMEvents = () => {
    $gameBoard.addEventListener('click', e => selectBlock(e));
    // $btnRules.addEventListener('click', showModal);
    $btnStart.addEventListener('click', startGame);
    $btnCloseModal.addEventListener('click', showModal);
};


const startGame = () =>{
    let inputBlocks = $input.value;



    inputBlocks = parseInt(inputBlocks);
    $wrapper.style.display = 'none';
    $gameBoard.classList.add('game-board--show');

    if(inputBlocks > 7){
        inputBlocks = 7;
    } else if(inputBlocks < 3){
        inputBlocks = 3;
    }
    createBlocksToStart(inputBlocks);

};

const createBlocksToStart = (numberBlocks) => {    

    for (let i = numberBlocks; i > 0; i--) {
        let number = i;
        console.log(number);    
        
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
    console.log(parent);
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
    // checkWin();
}

const createNewBlock = (target) => {
    activeBlock.classList.remove('block--active');
    const div = document.createElement('div');
    div.classList = activeBlock.classList;
    div.innerText = activeBlock.textContent;
    div.id = activeBlock.id;
    div.classList.remove('block--active');
    

    target.prepend(div);
    activeBlock.remove();
}

const checkWin = () => {
    numberOfAllBlocks = $blocks.length;
    console.log(numberOfAllBlocks);

    if ($lastColumn.children.length === numberOfAllBlocks) {
        setTimeout(function () {
            alert('Wygrałeś')
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

document.addEventListener('DOMContentLoaded', main);