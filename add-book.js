const button = document.querySelector('.add-book__btn');
const modal = document.querySelector('.modal');

button.addEventListener('click', () => {
    if(modal.style.display === 'none' || modal.style.display === "")
    modal.style.display = 'block';
button.style.display = "none";
})

document.addEventListener('click', (e) => {
    if(!modal=== e.target || button !== e.target ){
        modal.style.display = 'none';
        button.style.display = 'block';
    }
})