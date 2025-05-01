// Function to load image and audio resources from JSON files.
async function loadSource(img, aud) {
    try {
        // Fetch and process image resources.
        const response = await fetch('resources/img/image.json'); // Endpoint to list image resources.
        const resources = await response.json();
        resources.forEach(async resource => {
            await img.getImg(resource.name, "resources/img/" + resource.src); // Preload images.
        });
    } catch (error) {
        console.error('Error fetching image resources:', error); // Log errors related to image fetching.
    }

    try {
        // Fetch and process audio resources.
        const response = await fetch('resources/aud/audio.json'); // Endpoint to list audio resources.
        const resources = await response.json();
        resources.forEach(resource => {
            aud.addAudio(resource.name, "resources/aud/" + resource.src); // Preload audio files.
        });
    } catch (error) {
        console.error('Error fetching audio resources:', error); // Log errors related to audio fetching.
    }
}

// Export the loadSource function for use in other modules.
export { loadSource };