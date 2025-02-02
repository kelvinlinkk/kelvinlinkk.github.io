window.onload = () => {
    const startButton =document.getElementById('startbutton');
    startButton.onclick = () => {
        const dialogSystem = new DialogSystem("demo.txt");
        startButton.style.display = 'none';
    },{once:true};
}