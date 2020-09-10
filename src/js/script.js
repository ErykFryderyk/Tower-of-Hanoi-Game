// const columns = document.querySelectorAll('.column-box');



// columns.forEach(col => {
//     col.addEventListener('click', () =>{
//         if (col.firstElementChild.classList.contains('block--active')){
//             col.firstElementChild.classList.remove('block--active');
//         }else {
//             col.firstElementChild.classList.add('block--active');
//         }
//     })
// })


let activeBlock = null;
// const numberOfAllBlocks = $blocks.length;


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();

}

const prepareDOMElements = () => {
    $gameBoard = document.querySelector('.game-board');
    $blocks = document.querySelectorAll('.block');
    $lastColumn = document.querySelector('column-box__last-element')

};

const prepareDOMEvents = () => {
    $gameBoard.addEventListener('click', e => {
        selectBlock(e);
    })
};


const selectBlock = e => {

    const target = e.target;  
    console.log(target);
    if(activeBlock === null) {
        if(target.children.length === 0){
            return;
        }else {
            target.firstElementChild.classList.add('block--active');
            activeBlock = target.firstElementChild
        }
    } else {
        moveBlock(e);
    }
}

const moveBlock = e => {
    const target = e.target;
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
    activeBlock();
    checkWin();
}

const createNewBlock = (target) => {
    activeBlock.classList.remove('block--active');
    const div = document.createElement('div');
    div.classList = activeBlock.classList;
    div.innerText = activeBlock.textContent;
    div.id = activeBlock.id;
    

    div.classList.remove('active');
    target.prepend(div);
    activeBlock.remove();
}


document.addEventListener('DOMContentLoaded', main);