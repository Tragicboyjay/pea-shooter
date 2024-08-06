import Phaser from "phaser";
import { Game } from "./Game";

const config = {
    type: Phaser.AUTO, 
    parent: 'gameDiv', 
    width: 800,
    height: 450,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        }
    },
    scene: Game
};

let game;
const playBtn = document.getElementById("playBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const gameDiv = document.getElementById("gameDiv");
const mainScreen = document.getElementById("mainScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const instructionScreen = document.getElementById("instructionScreen");
const instructionBtn = document.getElementById("instructionBtn");
const back = document.getElementById("back");
const backToHomeBtn = document.getElementById("backToHomeBtn");


function showInstructions() {
    mainScreen.style.display = "none";
    instructionScreen.style.display = "flex";

}

function playGame() {
    if (!game) {
        mainScreen.style.display = "none";
        gameDiv.style.display = "block";
        game = new Phaser.Game(config);
    }
}

function restartGame() {
    if (game) {
        game.destroy(true);
        game = null;
    }
    gameOverScreen.style.display = "none";
    gameDiv.style.display = "block";
    game = new Phaser.Game(config);
}

playBtn.addEventListener("click", playGame);
playAgainBtn.addEventListener("click", restartGame);
instructionBtn.addEventListener("click", showInstructions)
back.addEventListener("click", () => {
    instructionScreen.style.display = "none";
    mainScreen.style.display = "flex";
})
backToHomeBtn.addEventListener("click", () => {
    gameOverScreen.style.display = "none";
    mainScreen.style.display = "flex";
})

window.onload = () => {
    const highScoreTxt = document.getElementById("highScoreTxt");
    highScoreTxt.textContent = `High Score: ${localStorage.getItem("PS_HighScore")}` || "High Score: 0";
};


