// ButtonManager class handles the creation, display, and interaction of buttons in a UI.
class ButtonManager {
    constructor(main) {
        // Container for button elements.
        this.buttonArea = this.createElement("div", { id: "buttons" });
        this.buttonArea.style.display = 'none'; // Initially hidden.

        // Array to store button elements.
        this.buttonElements = [];

        // Flag to control interactivity of buttons.
        this.isInteractive = true;

        // Append the button container to the provided main element.
        main.appendChild(this.buttonArea);
    }

    // Utility method to create a DOM element with specified attributes.
    createElement(tag, attributes) {
        const element = document.createElement(tag);
        Object.assign(element, attributes);
        return element;
    }

    // Adds a new button with the specified class name and text.
    addButton(info, text) {
        const newButton = this.createElement('button', { innerHTML: text, className: info });
        this.buttonArea.appendChild(newButton);
        this.buttonElements.push(newButton);
        return newButton;
    }

    // Displays the button area and handles user interaction with buttons.
    async showButton() {
        this.buttonArea.style.display = "flex"; // Show the button area.

        // Return a promise that resolves when a button is selected.
        return new Promise((resolve) => {
            let select = -1; // Index of the currently selected button.

            // Handles mouse wheel events to navigate through buttons.
            const handleWheelEvent = (flag) => {
                if (!this.isInteractive) return;
                select = flag ? select + 1 : select - 1;
                const children = Array.from(this.buttonArea.children);
                if (select >= children.length) select = 0; // Wrap around to the first button.
                if (select < 0) select = children.length - 1; // Wrap around to the last button.
            };

            // Handles keyboard events for navigation and selection.
            const handleKeyEvent = (n) => {
                if (!this.isInteractive) return;
                if (n.key === "Enter" && select !== -1) {
                    // Resolve the promise with the class name of the selected button.
                    resolve(this.buttonArea.children[select].className);
                    this.clearButton(); // Clear buttons after selection.
                    document.removeEventListener("keydown", handleKeyEvent);
                } else if (["ArrowUp", "ArrowDown", "w", "s"].includes(n.key)) {
                    handleWheelEvent(n.key === "ArrowDown" || n.key === "s");
                }
            };

            // Add event listeners for mouse wheel and keyboard events.
            document.addEventListener("wheel", handleWheelEvent, true);
            document.addEventListener("keydown", handleKeyEvent);

            // Add event listeners for mouse interactions with buttons.
            Array.from(this.buttonArea.children).forEach((btn, num) => {
                btn.addEventListener("mouseover", () => {
                    if (this.isInteractive) select = num;
                });
                btn.addEventListener("mouseout", () => {
                    if (this.isInteractive) {
                        select = -1;
                        btn.style.background = "#111111"; // Reset background color.
                    }
                });
                btn.addEventListener("click", () => {
                    if (this.isInteractive) {
                        resolve(btn.className); // Resolve with the clicked button's class name.
                        this.clearButton(); // Clear buttons after selection.
                    }
                });

                // Update button background color based on selection.
                ["mousemove", "wheel", "keydown"].forEach(event => {
                    document.addEventListener(event, () => {
                        btn.style.background = select === num ? "#555555" : "#111111";
                    });
                });
            });
        });
    }

    // Clears buttons from the button area.
    // If a specific button name is provided, only that button is removed.
    clearButton(name) {
        if (name) {
            const button = this.buttonElements.find(btn => btn.className === name);
            if (button) {
                this.buttonArea.removeChild(button); // Remove the button from the DOM.
                this.buttonElements = this.buttonElements.filter(btn => btn !== button); // Update the button list.
                if (this.buttonElements.length === 0) {
                    this.buttonArea.style.display = "none"; // Hide the button area if no buttons remain.
                }
            }
        } else {
            // Clear all buttons.
            this.buttonArea.innerHTML = "";
            this.buttonElements = [];
            this.buttonArea.style.display = "none"; // Hide the button area.
        }
    }
}

// Export the ButtonManager class for use in other modules.
export default ButtonManager;