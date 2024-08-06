import Phaser from "phaser";

export class Game extends Phaser.Scene
{
    player;
    playerScore = 0;


    enemyBirds;
    birdSpeed = 2;

    banjoMusic;

    gunShotSound;
    scoreText;
    timerText;
    timeElapsed = 30;

    clickedThisFrame = false;
    shotCount = 0;

    pasued = false;

    spawnEvent;
    timerEvent;

    constructor ()
    {
        super();
        
    }

    preload ()
    {
        this.load.image("background", "/background/SeaSight.png")

        this.load.image('bird1', "/birds/1.png")
        this.load.image('bird2', "/birds/2.png")
        this.load.image('bird3', "/birds/3.png")
        this.load.image('bird4', "/birds/4.png")
        this.load.image('bird5', "/birds/5.png")
        this.load.image('bird6', "/birds/6.png")
        this.load.image('bird7', "/birds/7.png")

        this.load.spritesheet("crosshair", "/sprites/crosshair/ELR_Corsshairs.png", { frameWidth: 16, frameHeight: 16, startFrame: 1, endFrame: 48})

        this.load.image('blood1', "/blood/bloodfx001_01.png")
        this.load.image('blood2', "/blood/bloodfx001_02.png")
        this.load.image('blood3', "/blood/bloodfx001_03.png")
        this.load.image('blood4', "/blood/bloodfx001_04.png")
        this.load.image('blood5', "/blood/bloodfx001_05.png")

        this.load.audio('gunshot', "/sfx/GunShotSFX.mp3");
        this.load.audio('banjo', "/sfx/banjo.mp3")
    }

    create ()
    {
        this.banjoMusic = this.sound.add('banjo');
        

        const background = this.add.image(0, 0, 'background');

        background.setOrigin(0, 0);
 
        background.displayWidth = this.sys.game.config.width;
        background.displayHeight = this.sys.game.config.height;

        this.input.manager.canvas.style.cursor = 'none';

        this.enemyBirds = this.physics.add.group();

        this.anims.create({
            key: 'fly',
            frames: [
                {key: "bird1"},
                {key: "bird2"},
                {key: "bird3"},
                {key: "bird4"},
                {key: "bird5"},
                {key: "bird6"},
                {key: "bird7"}
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'blood',
            frames: [
                {key: "blood1"},
                {key: "blood2"},
                {key: "blood3"},
                {key: "blood4"},
                {key: "blood5"},
            ],
            frameRate: 20,
            repeat: 0
        });
        
        this.time.addEvent({
            delay: this.timeElapsed > 15 ? Phaser.Math.Between(500, 1000) : Phaser.Math.Between(50, 250), 
            callback: this.spawnEnemy, 
            callbackScope: this, 
            loop: true 
        });

        this.time.addEvent({
            delay: 1000, 
            callback: () => this.timeElapsed --, 
            callbackScope: this, 
            loop: true 
        });

        this.player = this.physics.add.image(100,100, "crosshair", 4)
        this.player.setTint(0x00FF00);
        this.player.setSize(this.player.width /2, this.player.height /2)
        this.player.scale = 2;
        
        this.player.setDepth(1);

        this.gunShotSound = this.sound.add('gunshot');

        this.scoreText = this.add.text(25,10, `Score ${ this.playerScore }`);
        this.scoreText.setDepth(1);

        this.timerText = this.add.text(25, 30, `Time ${this.timeElapsed}`);
        this.timerText.setDepth(1);

        this.banjoMusic.play();

    }

    update ()
    {
        this.player.setTint(0x00FF00);

        const mouseY = this.input.mousePointer.y - (this.player.height / 2);
        const mouseX = this.input.mousePointer.x - (this.player.width / 2);

        this.player.x = mouseX;
        this.player.y = mouseY;

        this.handleClick();

        this.updateScore();
        this.updateTimer();

        this.moveBirds();

        this.enemyBirds.getChildren().forEach(bird => {
            if (bird.y > this.sys.game.config.height) {
                bird.destroy();
            }
        });
    }

    handleClick() 
    {
        if (this.input.mousePointer.leftButtonDown() && !this.clickedThisFrame) 
        {
            this.shotCount ++;
            this.gunShotSound.play();
            this.checkCollisions();
            this.clickedThisFrame = true;
        }
        else if (!this.input.mousePointer.leftButtonDown())
        {
            this.clickedThisFrame = false; 
        }
    }

    spawnEnemy() 
    {
        const  randomYPos = Phaser.Math.Between(25, 300);
        const bird = this.physics.add.sprite(this.sys.game.config.width, randomYPos, "bird");
        bird.body.setSize(bird.width +2,bird.height - 5);
        bird.body.setOffset(bird.width / 2, bird.height / 2);
        bird.play("fly")
        this.enemyBirds.add(bird);
    }

    checkCollisions() 
    {
        this.enemyBirds.getChildren().forEach((enemy) => {
            if (this.physics.collide(this.player, enemy)) {
                this.birdDie(enemy)
                this.playerScore ++;
            }
        });
    }

    updateScore() 
    {
        this.scoreText.setText(`Score ${ this.playerScore }`);

    }

    moveBirds() 
    {
        this.enemyBirds.getChildren().forEach(bird => {
            bird.x -= Phaser.Math.Between(2, 5); 
    
            if (bird.x < 0) {
                bird.destroy();
            }
        });

    }

    birdDie(enemy)
    {
        const blood = this.add.sprite(enemy.x, enemy.y, "blood1");
        blood.play('blood');

            
        this.tweens.add({
            targets: blood,
            alpha: 0, 
            duration: 1500, 
            onComplete: () => {
                blood.destroy(); 
            }
        })
        enemy.disableInteractive();
        enemy.anims.pause();
        enemy.angle = 180;
        enemy.body.setGravityY(500);
        
    }

    updateTimer() 
    {
        this.timerText.setText(`Time ${ this.timeElapsed}`);

        if (this.timeElapsed <= 0)
        {
            this.endGame() 
        }   
    }

    endGame() {
        const gameOverScreen = document.getElementById("gameOverScreen");
        const gameDiv = document.getElementById("gameDiv");
        const scoreTxt = document.getElementById("scoreTxt");
        const curHS = localStorage.getItem("PS_HighScore");

        this.handleHighScore(this.playerScore)
        this.banjoMusic.stop();
        this.scene.stop(); 

        gameDiv.style.display = "none";
        gameOverScreen.style.display = "flex";

        if (curHS < this.playerScore) {
            scoreTxt.innerText = `New high score: ${this.playerScore}!`
        } else {
            scoreTxt.innerHTML = `Score: ${this.playerScore}`
        }
    }

    handleHighScore( score ) {
        const highScoreTxt = document.getElementById("highScoreTxt");
        const currentHighScore = localStorage.getItem("PS_HighScore");
    
        if (!currentHighScore) {
            localStorage.setItem("PS_HighScore", score);
        } else {
            if (currentHighScore < score) {
                localStorage.setItem("PS_HighScore", score);
                highScoreTxt.innerText = `High Score: ${score}`
            }
        }  
    }


    
}