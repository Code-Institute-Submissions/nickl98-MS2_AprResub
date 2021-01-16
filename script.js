//This is the class where the music is deployed from
class AudioController {
    constructor() {
        this.bgMusic = new Audio('assets/sounds/gamemusic.mp3');
        this.flipSound = new Audio('assets/sounds/Card-flip-sound-effect.mp3');
        this.matchSound = new Audio('assets/sounds/Match-sound.mp3');
        this.victorySound = new Audio('assets/sounds/victory.mp3');
        this.gameOverSound = new Audio('assets/sounds/Gameover-sound.mp3');
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;
    }

    //these classes below are choosen when the music
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

class MixOrMatch {
    constructor(totalTime, cards){
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-left');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGame(){
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.time_left = this.totalTime;
        this.matchedCards = [];
        this.busy = true;

        this.shuffleCards();
    }

    //This function here adds the amount of flips made and keeps track of that number
    flipCard(card){
        if (this.canFlipCard(card)){
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            //if statment that checks if the card is a match
        }
    }

    //this function here shuffles the cards in a random order each game

     shuffleCards(cardsArray) { // Fisher-Yates Shuffle Algorithm.
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randIndex].style.order = i;
            cardsArray[i].style.order = randIndex;
        }
    }

    //this statment here checks and sees if the statment is true that it will be able to be flipeed  
    canFlipCard(card){
        return true;
        //return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

//this is pulling the overlays the gameover, victory and Click to startoverlay
function ready(){
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);

    //this for each loop allows when the user clicks on the screen the game will begin and the overlay disappears
 overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
           
        });
    });
    cards.forEach(card =>{
        card.addEventListener('click', () => {
            game.flipCard(card);
        })
    });
}

//This statment will only load the html page once all the files gone through
if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready());
}else{
    ready();
}

