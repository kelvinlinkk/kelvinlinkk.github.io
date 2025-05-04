export class DrumGame {
    constructor(options = {}) {
        this.notesContainer = document.getElementById(options.notesContainerId || 'notes');
        this.scoreDisplay = document.getElementById(options.scoreDisplayId || 'score');
        this.missesDisplay = document.getElementById(options.missesDisplayId || 'misses');
        this.colors = options.colors || ['red', 'blue'];
        this.buttons = {
            red: document.getElementById('redbtn'),
            blue: document.getElementById('bluebtn')
        };
        this.backgroundImage = null; // Current background image.
        this.score = 0;
        this.misses = 0;
        this.notes = [];
        this.noteSpeed = options.noteSpeed || 2; // px per frame
        this.spawnInterval = options.spawnInterval || 1000; // ms
        this.hitZoneLeft = options.hitZoneLeft || 80;
        this.hitZoneRight = options.hitZoneRight || 140;
        this.spawnTimer = null;
        this.animationFrame = null;
    }

    async start() {
        document.getElementById('drumgame').style.display = 'block';
        this.setBackgroundImage('resources/img/livehouse.jpg');
        this.spawnTimer = setInterval(() => this.spawnNote(), this.spawnInterval);
        this.animationFrame = requestAnimationFrame(() => this.animate());
        document.addEventListener('keydown', this._keyHandler);
        this.buttons.red.addEventListener('click', () => this.hit('red'));
        this.buttons.blue.addEventListener('click', () => this.hit('blue'));
        return new Promise((resolve) => { }); // Placeholder for async operation
    }

    stop() {
        document.getElementById('drumgame').style.display = 'none';
        clearInterval(this.spawnTimer);
        cancelAnimationFrame(this.animationFrame);
        document.removeEventListener('keydown', this._keyHandler);
        this.buttons.red.removeEventListener('click', () => this.hit('red'));
        this.buttons.blue.removeEventListener('click', () => this.hit('blue'));
    }

    setBackgroundImage(src) {
        if (this.backgroundImage) {
            this.backgroundImage.src = src;
            return this.backgroundImage;
        }
        this.backgroundImage = Object.assign(document.createElement("img"), {
            id: "bg",
            src: src
        });
        document.getElementById('drumgame').appendChild(this.backgroundImage);
        return this.backgroundImage;
    }

    spawnNote() {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const note = document.createElement('div');
        note.classList.add('note', color);
        this.notesContainer.appendChild(note);
        this.notes.push({ el: note, x: this.notesContainer.offsetWidth });
    }

    animate() {
        for (let i = this.notes.length - 1; i >= 0; i--) {
            const noteObj = this.notes[i];
            noteObj.x -= this.noteSpeed;
            noteObj.el.style.left = noteObj.x + 'px';
            if (noteObj.x + 50 < 0) { // note width = 50
                if (this.notesContainer.contains(noteObj.el)) this.notesContainer.removeChild(noteObj.el);
                this.notes.splice(i, 1);
                this.misses++;
                this.score--; // Lose point if miss
                this.missesDisplay.textContent = this.misses;
                this.scoreDisplay.textContent = this.score;
            }
        }
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    hit(color) {
        for (let i = 0; i < this.notes.length; i++) {
            const noteObj = this.notes[i];
            const noteLeft = noteObj.x;
            const noteRight = noteObj.x + 50;
            if (
                noteLeft < this.hitZoneRight &&
                noteRight > this.hitZoneLeft &&
                noteObj.el.classList.contains(color)
            ) {
                // Calculate accuracy: closer to center of hit zone = higher score
                const hitCenter = (this.hitZoneLeft + this.hitZoneRight) / 2;
                const noteCenter = noteObj.x + 25;
                const distance = Math.abs(noteCenter - hitCenter);
                let accuracyScore = 0;
                if (distance < 10) {
                    accuracyScore = 3; // perfect
                } else if (distance < 25) {
                    accuracyScore = 2; // good
                } else {
                    accuracyScore = 1; // ok
                }
                if (this.notesContainer.contains(noteObj.el)) this.notesContainer.removeChild(noteObj.el);
                this.notes.splice(i, 1);
                this.score += accuracyScore;
                this.scoreDisplay.textContent = this.score;
                return;
            }
        }
        // Optional: lose a point for wrong hit (no note in zone)
        this.score--;
        this.scoreDisplay.textContent = this.score;
    }

    _keyHandler = (e) => {
        if (e.key.toLowerCase() === 'f') this.hit('red');
        if (e.key.toLowerCase() === 'j') this.hit('blue');
    }
}