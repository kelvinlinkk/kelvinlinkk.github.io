# DialogJS v1.0

DialogJS is a JavaScript library designed to create and manage interactive dialog systems for web applications. It provides a flexible and easy-to-use interface for displaying dialogs, images, and audio, as well as handling user interactions through buttons and input fields.

## Features

- Display dialogs with text, images, and audio.
- Handle user interactions with buttons and input fields.
- Animate images with various effects (move, scale, skew, rotate).
- Manage dialog history and log.

## Installation

To use DialogJS in your project, simply include the necessary JavaScript and CSS files in your HTML:

```html
<link rel="stylesheet" href="style/appearance.css">
<script src="path/to/dialog.js"></script>
```

## Usage

### Initialization

To initialize the dialog system, create an instance of the `DialogSystem` class:

```javascript
const dialogSystem = new DialogSystem();
```

### Displaying Dialogs

To display a dialog, use the `showStory` method. The second parameter of `showStory` specifies the part number from which to start reading. A part is defined by a line containing "break" in the story:

```javascript
const texts = [
    "Hello, welcome to our story!",
    "This is the second line of the dialog.",
    "break",
    "This is after a break."
];
dialogSystem.showStory(texts, 0).then(() => {
    console.log("This is the beginning.");
});

dialogSystem.showStory(texts, 1).then(() => {
    console.log("This is after a break.");
});
```

### Showing and Hiding the Dialog

To show or hide the dialog, use the `show` and `hide` methods:

```javascript
dialogSystem.show(); // Show the dialog
dialogSystem.hide(); // Hide the dialog
```

### Adding Images

To add and manipulate images, use the `ImageContainer` class:

```javascript
const imgContainer = dialogSystem.imgContainer;
imgContainer.addImg("character", "character.png");
imgContainer.setAppearance("character", { left: 100, top: 200, zIndex: 1, width: 300, height: 400 });
imgContainer.move("character", 100, 0, 2); // Move the image 100px to the right over 2 seconds
imgContainer.scale("character", 1.5, 1.5, 2); // Scale the image to 1.5x over 2 seconds
imgContainer.rotate("character", 45, 2); // Rotate the image 45 degrees over 2 seconds
```

### Adding Audio

To add and control audio, use the `AudioContainer` class:

```javascript
const audContainer = dialogSystem.audContainer;
audContainer.addAudio("backgroundMusic", "background.mp3");
audContainer.audPlay("backgroundMusic", 0, 5); // Play the audio with a 5-second fade-in
audContainer.audStop("backgroundMusic", 5); // Stop the audio with a 5-second fade-out
```

### Adding Buttons

To add and handle buttons, use the `ButtonContainer` class:

```javascript
const btnContainer = dialogSystem.btnContainer;
btnContainer.addButton("btn1", "Option 1");
btnContainer.addButton("btn2", "Option 2");

btnContainer.showButton().then((selectedButton) => {
    console.log("Selected button:", selectedButton);
});
```

### Customizing Dialog Box

To customize the dialog box, use the `dialogBox` class:

```javascript
const dialogBoxInstance = dialogSystem.dialogBoxInstance;
dialogBoxInstance.setColor("#ff000060"); // Set background color
dialogBoxInstance.setText("This is a custom dialog text."); // Set dialog text
dialogBoxInstance.setImg("customImage.png"); // Set dialog image
dialogBoxInstance.setSpeaker("Narrator"); // Set speaker name
```

### Handling User Input

To handle user input within the dialog, use the `getMessage` method of the `dialogBox` class. This method displays an input field and waits for the user to enter a response:

```javascript
dialogBoxInstance.getMessage("What's your name?").then((name) => {
    console.log("User's name is:", name);
});
```

### Managing Dialog History

DialogJS allows you to manage and display the history of dialogs. This can be useful for creating a log of all interactions:

```javascript
document.addEventListener("keydown", (event) => {
    if (event.key === "l" && dialogSystem.isDisplaying) {
        dialogSystem.dialogHistory.style.display = dialogSystem.dialogHistory.style.display === "none" ? "initial" : "none";
    }
});
```

### Animating Images

DialogJS provides various methods to animate images, such as moving, scaling, skewing, and rotating. These animations can be used to create dynamic and engaging dialog experiences:

```javascript
imgContainer.move("character", -200, 0, 1); // Move the image 200px to the left over 1 second
imgContainer.scale("character", 2, 2, 1); // Scale the image to 2x over 1 second
imgContainer.skew("character", 20, 10, 1); // Skew the image by 20 degrees horizontally and 10 degrees vertically over 1 second
imgContainer.rotate("character", 360, 1); // Rotate the image 360 degrees over 1 second
```

### Playing and Stopping Audio

DialogJS allows you to play and stop audio with optional fade-in and fade-out effects. This can be used to create immersive audio experiences:

```javascript
audContainer.audPlay("bgm", 0, 2000); // Play background music with a 2-second fade-in
audContainer.audStop("bgm", 1000); // Stop background music with a 1-second fade-out
```

### Handling Player Choices

DialogJS supports handling player choices through buttons. You can add buttons and wait for the player to make a selection:

```javascript
btnContainer.addButton("choice1", "Choice 1");
btnContainer.addButton("choice2", "Choice 2");

btnContainer.showButton().then((choice) => {
    console.log("Player selected:", choice);
});
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.
