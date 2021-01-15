
//This is the class where the music is deployed from
class AudioController {
    constructor() {
        this.bgMusic = new Audio('assets/sounds/gamemusic.mp3');
        this.flipSound = new Audio('assets/sounds/Card-Flip-sound-effect.mp3');
        this.matchSound = new Audio('assets/sounds/Match-sound.mp3');
        this.victorySound = new Audio('assets/sounds/victory.mp3');
        this.gameOverSound = new Audio('assets/sounds/Gameover-sound.mp3');
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;
    }
    startMusic(){
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match(){
        this.matchSound.play();
    }
    victory(){
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver(){
        this.stopMusic();
        this.gameOverSound.play();
    }
}


//this is pulling the overlays the gameover, victory and Click to startoverlay
function ready(){
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));

    //this for each loop allows when the user clicks on the screen the game will begin and the overlay disappears
 overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            //game.startGame();
           
        });
    });
    cards.forEach(card =>{
        card.addEventListener('click', () => {
            //game.flipCard(card);
        })
    });
}

//This statment will only load the html page once all the files gone through
if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready());
}else{
    ready();
}

