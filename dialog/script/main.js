// Import the Game class and Landing class from their respective modules
import { Game } from './lib/game.js';
import { Landing } from './landing.js';
// Create a new instance of the Game class to manage the game logic
const game = new Game();

// Create a new instance of the Landing class to manage the landing screen
const landing = new Landing(game);

// Initialize the game when the window loads
window.onload = () => {
    // Check if there is saved game data in localStorage
    const savedData = JSON.parse(localStorage.getItem('data'));
    // If there is saved data, parse it and set it in the game instance
    const completedEnds = JSON.parse(localStorage.getItem('completedEnds')) || {"name": []};

    // Show or hide the "Continue" button based on the presence of saved data
    landing.buttons.continuebtn.style.display = savedData ? "initial" : "none";

    // Add an event listener to the "Start" button
    landing.buttons.startbtn.addEventListener('click', async () => {
        // Hide the landing screen
        landing.landingArea.style.display = 'none';

        // Start the game loop with the main story JSON file
        const end = await game.main();
        if(!completedEnds['name'].includes(end)) {
            completedEnds['name'].push(end);
            localStorage.setItem('completedEnds', JSON.stringify(completedEnds));
        }
        // Return to the landing screen after the game ends
        //landing.returnToLanding();
    });

    // Add an event listener to the "Continue" button
    landing.buttons.continuebtn.addEventListener('click', async () => {
        // Hide the landing screen
        landing.landingArea.style.display = 'none';

        // Resume the game if it is paused, otherwise load saved data and start the game
        if (game.isGamePaused) {
            game.toggleGamePause();
        } else {
        const end = await game.main(savedData);
        if(!completedEnds['name'].includes(end)) {
            completedEnds['name'].push(end);
            localStorage.setItem('completedEnds', JSON.stringify(completedEnds));
        }
            // Return to the landing screen after the game ends
            landing.returnToLanding();
        }
    });
};

// Add a global event listener for keyboard inputs
document.addEventListener('keydown', (e) => {
    // If the "Escape" key is pressed and the game is not paused, pause the game and return to the landing screen
    if (e.key === 'Escape' && !game.isGamePaused) {
        game.toggleGamePause();
        landing.returnToLanding();
    }

    // If the backtick key (`) is pressed, clear all saved data from localStorage
    if (e.key === "`") {
        localStorage.clear();
    }
});