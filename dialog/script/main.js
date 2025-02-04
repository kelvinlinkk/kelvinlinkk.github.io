const intro = document.getElementById('intro');
const startbtn = intro.querySelector('button');
startbtn.addEventListener("click", async () => {
    intro.style.display = 'none';
    const myDialog = new DialogSystem();

    // Basic dialog setup
    myDialog.dialogBoxInstance.setColor("#333333");
    myDialog.dialog.style.color = "#ffffff";

    // Add images
    const characterImg = myDialog.imgContainer.addImg("character", "bocchi.jpg");
    myDialog.imgContainer.setAppearance("character", {
        left: 960,    // center horizontally
        top: 540,     // center vertically
        zIndex: 1,
        width: 400,
        height: 600
    });

    // Add background
    const bgImg = myDialog.imgContainer.addImg("background", "sunset.jpg");
    myDialog.imgContainer.setAppearance("background", {
        left: 0,
        top: 0,
        zIndex: 0,
        width: 1920,
        height: 1080
    });

    // Add audio
    const bgm = myDialog.audContainer.addAudio("bgm", "Music.mp3");

    // Play background music with fade in
    myDialog.audContainer.audPlay("bgm", 0, 2000); // 0 for continuous play, 2s fade

    // Fetch and display story text
    const response = await fetch("demo.txt");
    const data = await response.text();
    let text = data.replace(/\r\n|\r|\n/g, '\n').split('\n').filter(line => line.trim() !== '');
    // Show dialog system
    myDialog.show();
    await myDialog.showStory("Click or space to continue...");
    await myDialog.showStory("Showing the dialog system.");
    myDialog.dialogBoxInstance.setSpeaker(await myDialog.dialogBoxInstance.getMessage("what's your name?"));

    // Display a story with typewriter effect
    const demoText = ["This is a demo of DialogJS.", "We will showcase various features."];
    await myDialog.showStory(demoText);
    await myDialog.showStory("Displayed a story with typewriter effect using showStory function.");

    // Wait for player choice
    myDialog.btnContainer.addButton("choice1", "Choice 1");
    myDialog.btnContainer.addButton("choice2", "Choice 2");
    await myDialog.showStory("Please make a choice.");
    const choice = await myDialog.btnContainer.showButton();
    await myDialog.showStory(`You selected ${choice}.`);

    // Animate character based on choice
    if (choice === "choice1") {
        myDialog.imgContainer.move("character", -200, 0, 1); // move left
        await myDialog.showStory("Character moved left using move function.");
    } else {
        myDialog.imgContainer.move("character", 200, 0, 1); // move right
        await myDialog.showStory("Character moved right using move function.");
        myDialog.imgContainer.rotate("character", 360, 1); // spin
        await myDialog.showStory("Character rotated using rotate function.");
    }

    // use break to pause the story
    await myDialog.showStory("Reading story from file \"demo.txt\"");
    await myDialog.showStory(text,1);

    // Cleanup
    setTimeout(() => {
        myDialog.audContainer.audStop("bgm", 1000); // fade out BGM
        myDialog.hide();
    }, 5000);
    await myDialog.showStory("Background music will fade out and dialog will hide after 5 seconds.");
});

main();