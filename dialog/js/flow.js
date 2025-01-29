window.onload = () => {
    const startButton = document.getElementById('startbutton');
    startButton.onclick = () => {
        const dialogSystem = new DialogSystem("story.txt");
        startButton.style.display = 'none';
    },{once:true};
}