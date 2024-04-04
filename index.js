document.addEventListener("DOMContentLoaded", () =>{
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let score = 0
    let startPoint = 150
    let isJumping = true
    let isDoingLeft = false
    let isDoingRight = false
    let leftTimerId
    let rightTimerId
    let upTimerId
    let downTimerId

    // Doodler will start from:
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = startPoint

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
                if(platform.bottom < 10){
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    score++
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
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

    function fall(){
        isJumping = false
        clearTimeout(upTimerId)
        downTimerId = setInterval(()=>{
            doodlerBottomSpace -= 5
            doodler.style.bottom = `${doodlerBottomSpace}px`;
            if(doodlerBottomSpace <= 0){
                gameOver()
            }
            platforms.forEach(platform =>{
                if((doodlerBottomSpace>=platform.bottom) && (doodlerBottomSpace<=platform.bottom+15)&&(doodlerLeftSpace+60>=platform.left) && (doodlerLeftSpace<=platform.left+85) && !isJumping)
                {
                        startPoint = doodlerBottomSpace
                        jump()
                        isJumping = true
                }
            })
        },20)
    }

 
    function jump(){
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(()=>{
            doodlerBottomSpace += 20
            doodler.style.bottom = `${doodlerBottomSpace}px`;
            if(doodlerBottomSpace > startPoint + 200){
                fall()
                isJumping = false
            }
        },30)
    }

    function moveLeft(){
        if(isDoingRight){
            clearInterval(rightTimerId)
            isDoingRight = false
        }
        isDoingLeft = true
        leftTimerId = setInterval(()=>{
            if(doodlerLeftSpace>=0){
                doodlerLeftSpace -= 5
                doodler.style.left = `${doodlerLeftSpace}px`;
            } else moveRight()
        },20)
    }

    function moveRight(){
        if(isDoingLeft){
            clearInterval(leftTimerId)
            isDoingLeft = false
        }
        isDoingRight = true
        rightTimerId = setInterval(()=>{
            if(doodlerLeftSpace<=313){
                doodlerLeftSpace += 5
                doodler.style.left = `${doodlerLeftSpace}px`;
            } else moveLeft()
        },20)
    }

    function moveStraight(){
        isDoingLeft = false;
        isDoingRight = false;
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    function control(e){
        doodler.style.bottom = `${doodlerBottomSpace}px`
        if(e.key == 'ArrowLeft'){
            moveLeft()
        } else if(e.key == 'ArrowRight'){
            moveRight()
        } else if(e.key == 'ArrowUp'){
            moveStraight()
        }
    }

    function gameOver(){
        isGameOver = true
        while(grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
        clearInterval(upTimerId)
    }

    function start(){
        if(!isGameOver){
          
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 30)
            jump()
            document.addEventListener('keydown', control)
        }
    }

    start()

})