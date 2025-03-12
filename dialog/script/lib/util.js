async function loadSource(img, aud) {
    try {
        const response = await fetch('resources/image.json'); // Endpoint to list resources
        const resources = await response.json();
        resources.forEach(async resource => {
            await img.getImg(resource.name, resource.src);
        });
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
    try {
        const response = await fetch('resources/audio.json'); // Endpoint to list resources
        const resources = await response.json();

        resources.forEach(resource => {
            aud.addAudio(resource.name, resource.src);
        });
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}
export { loadSource };