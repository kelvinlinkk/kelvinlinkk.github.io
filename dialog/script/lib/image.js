// ImageManager class handles the creation, display, and manipulation of image elements.
class ImageManager {
    constructor(main) {
        // Object to store image elements by name.
        this.imageElements = {};

        // Hidden container for image elements.
        this.imgfile = this.createElement("span", { id: "imgfile" });
        main.appendChild(this.imgfile);
    }

    // Utility method to create a DOM element with specified attributes.
    createElement(tag, attributes) {
        const element = document.createElement(tag);
        Object.assign(element, attributes);
        return element;
    }

    // Retrieves an image element by name or creates a new one if it doesn't exist.
    async getImg(name, src) {
        if (this.imageElements[name]) {
            return this.imageElements[name];
        } else {
            let imgElement = await this.createElement('img', { src: src });
            this.imgfile.appendChild(imgElement);
            this.imageElements[name] = imgElement;
            return imgElement;
        }
    }

    // Displays an image element by name.
    async showImg(name) {
        const imgElement = this.imageElements[name];
        if (imgElement) {
            imgElement.style.display = 'initial';
            await new Promise(resolve => {
                imgElement.onload = resolve;
            });
        }
    }

    // Hides an image element by name.
    hideImg(name) {
        const imgElement = this.imageElements[name];
        if (imgElement) {
            imgElement.style.display = 'none';
        }
    }

    // Sets the appearance of an image element (position, size, and z-index).
    setAppearance(name, { left = 0, top = 0, zIndex = 1, width = 100, height = 100 }) {
        let img = this.imageElements[name];
        // Set image styles (1920x1080 grid).
        Object.assign(img.style, {
            left: (parseFloat(left) / 1920 * 100) + '%',
            top: (parseFloat(top) / 1080 * 100) + '%',
            width: (parseFloat(width) / 1920 * 100) + '%',
            height: (parseFloat(height) / 1080 * 100) + '%'
        });
        img.style.zIndex = parseFloat(zIndex);
    }

    // Moves an image element by a specified delta over a given duration.
    move(name, deltaX, deltaY, time) {
        let imgElement = this.imageElements[name];
        let start = performance.now();
        let startX = parseFloat(imgElement.style.left);
        let startY = parseFloat(imgElement.style.top);
        let duration = parseFloat(time) * 1000;
        return new Promise((resolve) => {
            function animate(currentTime) {
                let elapsed = currentTime - start;
                let progress = Math.min(elapsed / duration, 1);

                // Calculate current position.
                let currentX = startX + parseFloat(deltaX) / 1920 * 100 * progress;
                let currentY = startY + parseFloat(deltaY) / 1080 * 100 * progress;

                // Update element position.
                imgElement.style.left = currentX + '%';
                imgElement.style.top = currentY + '%';

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            }
            requestAnimationFrame(animate);
        });
    }

    // Scales an image element to a specified width and height over a given duration.
    scale(name, w, h, time) {
        const imgElement = this.imageElements[name];
        const start = performance.now();

        // Get current scale or default to 1.
        const computedStyle = window.getComputedStyle(imgElement);
        const currentTransform = computedStyle.transform;
        const [startScaleX, startScaleY] = currentTransform === 'none' ?
            [1, 1] :
            currentTransform.match(/matrix\(([\d\s,.-]+)\)/)?.[1].split(',').map(Number).filter((_, i) => i === 0 || i === 3) || [1, 1];

        const targetScaleX = parseFloat(w);
        const targetScaleY = parseFloat(h);
        const duration = parseFloat(time) * 1000;
        return new Promise((resolve) => {
            function animate(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Interpolate scale values.
                const currentScaleX = startScaleX + (targetScaleX - startScaleX) * progress;
                const currentScaleY = startScaleY + (targetScaleY - startScaleY) * progress;

                // Apply transform.
                imgElement.style.transform = `scale(${currentScaleX}, ${currentScaleY})`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            }

            requestAnimationFrame(animate);
        });
    }

    // Skews an image element by specified angles over a given duration.
    skew(name, angleX, angleY, time) {
        const imgElement = this.imageElements[name];
        const start = performance.now();

        const computedStyle = window.getComputedStyle(imgElement);
        const currentTransform = computedStyle.transform;
        const [a, b, c, d] = currentTransform === 'none' ?
            [1, 0, 0, 1] :
            currentTransform.match(/matrix\(([\d\s,.-]+)\)/)?.[1].split(',').map(Number) || [1, 0, 0, 1];
        const startSkewX = Math.atan(c) * (180 / Math.PI);
        const startSkewY = Math.atan(b) * (180 / Math.PI);

        const targetSkewX = parseFloat(angleX);
        const targetSkewY = parseFloat(angleY);
        const duration = parseFloat(time) * 1000;
        return new Promise((resolve) => {
            function animate(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                const currentSkewX = startSkewX + (targetSkewX - startSkewX) * progress;
                const currentSkewY = startSkewY + (targetSkewY - startSkewY) * progress;

                imgElement.style.transform = `skew(${currentSkewX}deg, ${currentSkewY}deg)`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            }

            requestAnimationFrame(animate);
        });
    }

    // Rotates an image element by a specified angle over a given duration.
    rotate(name, angle, time) {
        const imgElement = this.imageElements[name];
        const start = performance.now();

        const computedStyle = window.getComputedStyle(imgElement);
        const currentTransform = computedStyle.transform;
        const startAngle = currentTransform === 'none' ?
            0 :
            Math.round(Math.atan2(currentTransform.split(',')[1], currentTransform.split(',')[0].slice(7)) * (180 / Math.PI));

        const targetAngle = parseFloat(angle);
        const duration = parseFloat(time) * 1000;

        return new Promise((resolve) => {
            function animate(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                const currentAngle = startAngle + (targetAngle - startAngle) * progress;
                imgElement.style.transform = `rotate(${currentAngle}deg)`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            }

            requestAnimationFrame(animate);
        });
    }
}

// Export the ImageManager class for use in other modules.
export default ImageManager;