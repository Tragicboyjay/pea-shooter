Pea Shooter
Pea Shooter is a simple shooting game where players use their mouse to aim and shoot at birds flying across the screen. The goal is to score as many points as possible within a 30-second time limit.

Table of Contents
Features
Getting Started
Game Controls
How to Play
Technologies Used
Project Structure
License
Features
Interactive Gameplay: Move the crosshair with your mouse and click to shoot.
Score Tracking: Track your score based on the number of birds hit.
Timed Challenge: The game lasts for 30 seconds. Try to score as high as possible!
Pause/Resume: Press the spacebar to pause and resume the game.
Animated Sprites: Birds are animated as they fly across the screen.
Sound Effects: Includes sound effects for shooting and background music.
Getting Started
Prerequisites
To run this game locally, you need:

A modern web browser (Chrome, Firefox, Edge, etc.)
A local server (optional for development, e.g., using Live Server for VS Code)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/pea-shooter.git
Navigate to the project directory:

bash
Copy code
cd pea-shooter
Open the project in your preferred code editor:

bash
Copy code
code .
Run the game:

You can open index.html directly in your browser, or if you're using a local server, start the server and navigate to the provided URL.

Game Controls
Move Crosshair: Move the mouse to aim.
Shoot: Left-click the mouse.
Pause/Resume: Press the Spacebar.
How to Play
Start the Game:

Click the "Play!" button on the main menu to begin.
Objective:

Shoot as many birds as you can within 30 seconds. Each bird you hit increases your score.
End Game:

The game ends when the timer reaches zero. Your final score is displayed.
Pause/Resume:

Press the spacebar at any time to pause or resume the game.
Technologies Used
Phaser 3: A popular HTML5 game framework used for building the game.
JavaScript/ES6 Modules: The game logic and mechanics.
HTML5: The structure of the game interface.
CSS3: Styling for the game and the menu.
Visual Studio Code (VS Code): Recommended IDE for development.
Project Structure
bash
Copy code
├── assets/                # Game assets (images, sounds, etc.)
├── src/                   # Source files
│   ├── main.js            # Main game logic
│   └── handleUI.js        # UI-related logic
├── index.html             # HTML file
├── style.css              # CSS file
└── README.md              # This file
License
This project is licensed under the MIT License. You are free to use, modify, and distribute this software as long as the original license is included.
