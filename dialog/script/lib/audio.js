// AudioManager class handles audio playback, volume control, and fade effects for audio elements.
class AudioManager {
    constructor(main) {
        // Stores references to audio elements by name.
        this.audioEffects = {};
        
        // Hidden container element for audio elements.
        this.audfile = this.createElement("span", { id: "audiofile", style: "visibility:hidden" });
        
        // Maximum volume level for audio playback.
        this.maxVolume = 1;
        
        // Flag to indicate whether the audio is currently playing.
        this.toggle = false;

        // Append the hidden container to the provided main element.
        main.appendChild(this.audfile);
    }

    // Utility method to create a DOM element with specified attributes.
    createElement(tag, attributes) {
        const element = document.createElement(tag);
        Object.assign(element, attributes);
        return element;
    }

    // Adds a new audio element with the given name and source URL.
    // If the audio element already exists, it returns the existing one.
    addAudio(name, src) {
        if (!this.audioEffects[name]) {
            const audioElement = this.createElement('audio', { src: src });
            this.audfile.appendChild(audioElement);
            this.audioEffects[name] = audioElement;
        }
        return this.audioEffects[name];
    }

    // Sets the volume for all audio elements and updates the maximum volume.
    setVolume(volume) {
        this.maxVolume = volume;
        for (let audio in this.audioEffects) {
            this.audioEffects[audio].volume = volume;
        }
    }

    // Plays the specified audio by name, with optional duration and fade-in effect.
    audPlay(name, time = 0, fade = 0) {
        const audio = this.audioEffects[name];
        audio.play();

        // Stops the audio after the specified time (in seconds), if provided.
        if (time > 0) {
            setTimeout(() => audio.pause(), time * 1000);
        }

        // Applies a fade-in effect if a fade duration is specified.
        if (fade > 0) {
            this.fadeIn(audio, fade);
        }
    }

    // Stops the specified audio by name, with an optional fade-out effect.
    audStop(name, fade = 0) {
        const audio = this.audioEffects[name];
        if (fade > 0) {
            this.fadeOut(audio, fade);
        } else {
            audio.pause();
        }
    }

    // Toggles the playback of all audio elements.
    toggleAllAudio() {
        this.toggle = !this.toggle;
        for (let audio in this.audioEffects) {
            if (this.toggle) {
                this.audioEffects[audio].pause();
            } else {
                this.audioEffects[audio].play();
            }
        }
    }

    // Gradually increases the volume of the audio over the specified duration (in seconds).
    fadeIn(audio, duration) {
        const volumeIncrement = this.maxVolume / (duration * 100);
        audio.volume = 0;

        for (let i = 0; i <= duration * 100; i++) {
            setTimeout(() => {
                audio.volume = Math.min(audio.volume + volumeIncrement, this.maxVolume);
            }, i * 10);
        }
    }

    // Gradually decreases the volume of the audio over the specified duration (in seconds).
    // Pauses the audio when the volume reaches zero.
    fadeOut(audio, duration) {
        const volumeIncrement = this.maxVolume / (duration * 100);

        for (let i = 0; i <= duration * 100; i++) {
            setTimeout(() => {
                audio.volume = Math.max(audio.volume - volumeIncrement, 0);
                if (audio.volume === 0) {
                    audio.pause();
                }
            }, i * 10);
        }
    }
}

// Exports the AudioManager class for use in other modules.
export default AudioManager;