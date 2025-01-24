# DialogJS (experimental)

## Table of Contents
- [Introduction](#introduction)
- [Setup](#setup)
- [Commands](#commands)
- [TODO](#todo)
- [Contribute](#contribute)

## Introduction
**DialogJS** is a JavaScript-based library designed to create interactive dialogue systems for games. Inspired by the [Flower System](https://github.com/emptygamer/flower), DialogJS allows developers to manage dialogues, display images, and play audio seamlessly, enhancing the narrative experience in games.

## Setup
### Integration
**Integrating** [DialogJS](#introduction) into your website([example](https://kelvinlinkk.github.io/dialog/dialog.html)) is a relatively simple process. To begin, simply add the following HTML line to your project:
```html
    <script src="js/dialog.js">const dialogSystem = new DialogSystem();</script>
```
**Advice**: It is recommended to preload your resources (images and audio) to ensure a smooth experience. You can do this by adding the following lines in your HTML:
```html
    <link rel="preload" href="resources/image.png" as="image">
    <link rel="preload" href="resources/audio.mp3" as="audio">
```
For experienced developers, adjustments can be made to meet specific needs.

### Usage
To create your interactive dialogue system, start by writing your script in a file named `story.txt`. 

>Remember, each line in `story.txt` represents a single paragraph in your game's narrative. 

This file will contain the narrative of your game, including character dialogues, scene descriptions, and [commands](#commands) to control the visual and audio elements. 
Use the commands listed below to enhance your story with features such as displaying [images](#image), playing [audio](#audio), and managing the dialogue box.

**Note**: To further enhance the narrative in `story.txt`, HTML elements can be incorporated. For font size adjustments, it is recommended to use the `em` unit, a relative font size measurement.

### File Management
Music and images should be stored in the `resources` folder for system access.

## Commands

**DialogJS** provides several commands to enhance your interactive dialogue system: use `[show]` to display the dialog box, `[hide]` to conceal it, and `[n]` to insert a line break. Change the background image with `[bg]`, where the first parameter is the image source and the second is the object-fit style. To display images, use `[img]`, and for audio playback, utilize `[audio]`, which allows for duration and fade-in/out effects.

### show
> [ show ]
- Displays the dialog box.
### hide
> [ hide ]
- Hides the dialog box.
### newline
> [ n ]
- Inserts a line break in the dialog.
### background
> [ b src object-fit ]
-  Changes the background image. The first parameter is the image source, and the second is the object-fit style.
### image
> [ img name src x y z width height show ]
- Displays an image with specified parameters.
### audio
>[ audio name src play time(s) fade(ms) ]
- Plays an audio file with options for duration and fade-in/out effects.

## TODO
### New Commands
- [ effect ] : This command enables users to manipulate images or modify audio files.

- [ particle ] : This command can be used to create effects such as wind, rain, shooting stars, or other visual elements.

### functions
- **Variables**: Enables the use of custom variables within the dialogue system.

- **Buttons**: Facilitates player interaction by allowing them to respond to prompts.

- **Process Logic**: Supports the creation of conditional statements and loops, enabling the development of more intricate narrative structures and player interactions.

- **Custom Font and Color Scheme**: Allows developers to personalize the visual appearance of the dialogue system by applying custom font styles and color schemes.

## Contribute

We're always open to feedback, bug reports, and contributions. If you've found an issue or have an idea for making DialogJS better, go ahead and submit a pull request. Your help is super important in making DialogJS more awesome!