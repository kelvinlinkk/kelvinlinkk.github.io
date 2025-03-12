class AudioManager {
    constructor(main) {
        this.audioEffects = {};
        this.audfile = this.createElement("span", { id: "audiofile", style: "visibility:hidden" });
        this.maxVolume = 1;
        main.appendChild(this.audfile);
    }

    createElement(tag, attributes) {
        const element = document.createElement(tag);
        Object.assign(element, attributes);
        return element;
    }

    addAudio(name, src) {
        if (!this.audioEffects[name]) {
            const audioElement = this.createElement('audio', { src: src });
            this.audfile.appendChild(audioElement);
            this.audioEffects[name] = audioElement;
        }
        return this.audioEffects[name];
    }

    setVolume(volume) {
        this.maxVolume = volume;
        for (let audio in this.audioEffects) {
            this.audioEffects[audio].volume = volume;
        }
    }

    audPlay(name, time = 0, fade = 0) {
        const audio = this.audioEffects[name];
        audio.play();

        if (time > 0) {
            setTimeout(() => audio.pause(), time * 1000);
        }

        if (fade > 0) {
            this.fadeIn(audio, fade);
        }
    }

    audStop(name, fade = 0) {
        const audio = this.audioEffects[name];
        if (fade > 0) {
            this.fadeOut(audio, fade);
        } else {
            audio.pause();
        }
    }

    fadeIn(audio, duration) {
        const volumeIncrement = this.maxVolume / (duration * 100);
        audio.volume = 0;

        for (let i = 0; i <= duration * 100; i++) {
            setTimeout(() => {
                audio.volume = Math.min(audio.volume + volumeIncrement, this.maxVolume);
            }, i * 10);
        }
    }

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

export default AudioManager;