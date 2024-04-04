document.addEventListener("DOMContentLoaded", () =>{
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let isGameOver = false
    let platformCount = 5
    let platforms = []

    // Doodler will start from:
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 150

    class Platform{
        constructor(newPlayBottom){
            this.left = Math.random()*315;
            this.bottom = newPlayBottom;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = `${this.left}px`;
            visual.style.bottom = `${this.bottom}px`;
            grid.appendChild(visual);
        }
    }

    function createPlatforms(){
        for(let i = 0; i < platformCount;i++){
            let platGap = 600/platformCount
            let newPlatBottom = platGap*i + 100
            let newPlatform = new Platform(newPlatBottom)
            platforms.push(newPlatform)
        }
    }

    function movePlatforms(){
        if(doodlerBottomSpace > 140){
            platforms.forEach(platform => {
                platform.bottom -= 4;
                platform.visual.style.bottom = `${platform.bottom}px`;
            })
        }
    }



    function createDoodler(){
        doodler.classList.add('doodler');
        grid.appendChild(doodler);
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = `${doodlerLeftSpace}px`;
        doodler.style.bottom = `${doodlerBottomSpace}px`;
    }


    function start(){
        if(!isGameOver){
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 30)
        }
    }

    start()

})