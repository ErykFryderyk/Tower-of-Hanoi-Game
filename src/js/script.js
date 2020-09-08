const columns = document.querySelectorAll('.column-box');



columns.forEach(col => {
    col.addEventListener('click', () =>{
        if (col.firstElementChild.classList.contains('block--active')){
            col.firstElementChild.classList.remove('block--active');
        }else {
            col.firstElementChild.classList.add('block--active');
        }
    })
})