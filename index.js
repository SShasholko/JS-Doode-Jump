document.addEventListener("DOMContentLoaded", () =>{
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let isGameOver = false;

    // Doodler will start from:
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 150

    function createDoodler(){
        doodler.classList.add('doodler');
        grid.appendChild(doodler);
        doodler.style.left = `${doodlerLeftSpace}px`;
        doodler.style.bottom = `${doodlerBottomSpace}px`;
    }
    createDoodler()
})