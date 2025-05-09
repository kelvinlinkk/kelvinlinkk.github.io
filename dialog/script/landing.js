// Export the Landing class to manage the landing screen and related UI interactions
export class Landing {
    constructor(game) {
        // Reference to the game instance
        this.game = game;

        // Get references to key DOM elements
        this.showArea = document.getElementById('showArea'); // Area to display additional UI elements
        this.landingArea = document.getElementById('landing'); // Main landing screen area
        this.buttons = {
            settingbtn: document.getElementById('settingbtn'), // Settings button
            affinitybtn: document.getElementById('affinitybtn'), // Affinity button
            exitbtn: document.getElementById('exitbtn'), // Exit button
            startbtn: document.getElementById('startbtn'), // Start button
            continuebtn: document.getElementById('continuebtn') // Continue button
        };

        // Initialize event listeners for buttons
        this.initialize();
    }

    // Initialize button event listeners
    initialize() {
        // Show settings when the settings button is clicked
        this.buttons.settingbtn.addEventListener('click', () => this.showSettings());

        // Show affinity information when the affinity button is clicked
        this.buttons.affinitybtn.addEventListener('click', () => this.showAffinity());

        // Hide additional UI elements and return to the main landing screen when the exit button is clicked
        this.buttons.exitbtn.addEventListener('click', () => this.toggleButtonVisibility(false));
    }

    // Display the settings UI
    showSettings() {
        this.toggleButtonVisibility(true); // Hide other buttons and show the settings area
        this.showArea.style.whiteSpace = "wrap"; // Adjust the layout of the settings area

        // Add a button to the settings area
        const btn = this.createElement('button', { innerText: 'Untitled-1' });
        this.showArea.appendChild(btn);

        // Add a volume slider to the settings area
        const volume = this.createElement('input', {
            id: 'volume',
            type: 'range',
            value: this.game.systemManagers.audioManager.maxVolume * 100, // Set the initial volume based on the audio manager
            min: 0,
            max: 100
        });
        this.showArea.appendChild(volume);

        // Adjust the game's audio volume based on the slider value
        volume.addEventListener('input', () => {
            this.game.systemManagers.audioManager.setVolume(volume.value / 100);
        });
    }

    // Display the affinity information UI
    showAffinity() {
        this.toggleButtonVisibility(true); // Hide other buttons and show the affinity area
        this.showArea.style.whiteSpace = "nowrap"; // Adjust the layout of the affinity area

        // If no affinity data is available, exit early
        if (!this.game.affinity) return;

        // Iterate over the affinity data and display each character's information
        Object.entries(this.game.affinity).forEach(([name, affinityValue]) => {
            const section = this.createElement('section'); // Create a section for each character
            this.showArea.appendChild(section);

            // Add a profile image for the character
            const profile = this.createElement('img', { src: `./assets/profile/${name}.jpg` });
            section.appendChild(profile);

            // Add the character's name
            const nametag = this.createElement('h1', { innerText: name });
            section.appendChild(nametag);

            // Add the character's affinity percentage
            const affinity = this.createElement('p', { innerText: `${affinityValue}%` });
            section.appendChild(affinity);
        });
    }

    // Toggle the visibility of buttons and the additional UI area
    toggleButtonVisibility(isShow) {
        this.showArea.style.display = isShow ? "initial" : "none"; // Show or hide the additional UI area
        this.buttons.settingbtn.style.visibility = isShow ? "hidden" : "visible"; // Toggle visibility of the settings button
        this.buttons.affinitybtn.style.visibility = isShow ? "hidden" : "visible"; // Toggle visibility of the affinity button
        this.buttons.exitbtn.style.visibility = isShow ? "visible" : "hidden"; // Toggle visibility of the exit button
        this.showArea.innerHTML = ""; // Clear the content of the additional UI area
    }

    // Return to the main landing screen
    returnToLanding() {
        // Check if there is saved game data or if the game is paused
        const hasSavedData = localStorage.getItem('data') || this.game.isGamePaused;

        // Show or hide the "Continue" button based on the presence of saved data
        this.buttons.continuebtn.style.display = hasSavedData ? "initial" : "none";

        // Display the main landing screen
        this.landingArea.style.display = "initial";
    }

    // Utility method to create a DOM element with specified attributes
    createElement(tag, attributes = {}) {
        const element = document.createElement(tag); // Create the element
        Object.assign(element, attributes); // Assign the attributes to the element
        return element; // Return the created element
    }
}