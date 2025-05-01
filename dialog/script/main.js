// Import the Game class from the game library
import { Game } from './lib/game.js';

// DOM elements for various UI components
const showArea = document.getElementById('showArea');
const { settingbtn, affinitybtn, exitbtn } = document.getElementsByClassName('funcbtn');
const { startbtn, continuebtn } = document.getElementsByClassName('startbtn');
const landing = document.getElementById('landing');

// Create a new instance of the Game class
const game = new Game();

/**
 * Toggles the visibility of buttons and the showArea.
 * @param {boolean} isShow - Whether to show or hide the buttons and showArea.
 */
const toggleButtonVisibility = (isShow) => {
    showArea.style.display = isShow ? "initial" : 'none';
    settingbtn.style.visibility = !isShow ? "visible" : "hidden";
    affinitybtn.style.visibility = !isShow ? "visible" : "hidden";
    exitbtn.style.visibility = isShow ? "visible" : "hidden";
    showArea.innerHTML = ""; // Clear the showArea content
};

/**
 * Returns the user to the landing screen and adjusts the visibility of the continue button.
 */
const returnToLanding = () => {
    continuebtn.style.display = localStorage.getItem('data') || game.isGamePaused ? "initial" : "none";
    landing.style.display = "initial";
};

// Event listener for the settings button
settingbtn.addEventListener('click', () => {
    toggleButtonVisibility(true);
    showArea.style.whiteSpace = "wrap";

    // Add a button to the showArea
    const btn = document.createElement('button');
    btn.innerText = 'Untitled-1';
    showArea.appendChild(btn);

    // Add a volume slider to the showArea
    const volume = Object.assign(document.createElement('input'), {
        id: 'volume',
        type: 'range',
        min: 0,
        max: 100,
        innerText: 'v'
    });
    showArea.appendChild(volume);

    // Adjust the game's audio volume based on the slider value
    volume.addEventListener('input', () => {
        game.systemManagers.audioManager.setVolume(volume.value / 100);
    });
});

// Event listener for the affinity button
affinitybtn.addEventListener('click', () => {
    toggleButtonVisibility(true);
    showArea.style.whiteSpace = "nowrap";

    // Display affinity data if available
    if (!game.affinity) return;
    for (let name in game.affinity) {
        const section = document.createElement('section');
        showArea.appendChild(section);

        // Add a profile image
        const profile = section.appendChild(document.createElement('img'));
        profile.src = `./assets/profile/${name}.jpg`;

        // Add a name tag
        const nametag = section.appendChild(document.createElement('h1'));
        nametag.innerText = name;

        // Add affinity percentage
        const affinity = section.appendChild(document.createElement('p'));
        affinity.innerText = `${game.affinity[name]}%`;
    }
});

// Event listener for the exit button
exitbtn.addEventListener('click', () => {
    toggleButtonVisibility(false);
});

// Initialize the game when the window loads
window.onload = () => {
    // Show the continue button if saved data exists
    continuebtn.style.display = localStorage.getItem('data') ? "initial" : "none";

    // Start a new game when the start button is clicked
    startbtn.addEventListener('click', async e => {
        landing.style.display = 'none';
        await game.startloop("resources/playscript/mainStory.json");
        startbtn.style.display = "initial";
        returnToLanding();
    });

    // Continue a saved game when the continue button is clicked
    continuebtn.addEventListener('click', async e => {
        landing.style.display = 'none';
        if (game.isGamePaused) {
            game.toggleGamePause();
        } else {
            await game.startloop(JSON.parse(localStorage.getItem('data')));
            startbtn.style.display = "initial";
            returnToLanding();
        }
    });
};

// Global event listener for keyboard inputs
document.addEventListener('keydown', e => {
    // Pause the game and return to the landing screen when Escape is pressed
    if (e.key === 'Escape' && !game.isGamePaused) {
        game.toggleGamePause();
        startbtn.style.display = "none";
        returnToLanding();
    }

    // Clear local storage when the backtick key (`) is pressed
    if (e.key === "`") {
        localStorage.clear();
    }
});