class ButtonManager {
    constructor(main) {
        this.buttonArea = this.createElement("div", { id: "buttons" });
        this.buttonArea.style.display = 'none';
        this.buttonElements = [];
        this.isInteractive = true;

        main.appendChild(this.buttonArea);
    }

    createElement(tag, attributes) {
        const element = document.createElement(tag);
        Object.assign(element, attributes);
        return element;
    }

    addButton(info, text) {
        const newButton = this.createElement('button', { innerHTML: text, className: info });
        this.buttonArea.appendChild(newButton);
        this.buttonElements.push(newButton);
        return newButton;
    }

    async showButton() {
        this.buttonArea.style.display = "flex";
        return new Promise((resolve) => {
            let select = -1;

            const handleWheelEvent = (flag) => {
                if (!this.isInteractive) return;
                select = flag ? select + 1 : select - 1;
                const children = Array.from(this.buttonArea.children);
                if (select >= children.length) select = 0;
                if (select < 0) select = children.length - 1;
            };

            const handleKeyEvent = (n) => {
                if (!this.isInteractive) return;
                if (n.key === "Enter" && select !== -1) {
                    resolve(this.buttonArea.children[select].className);
                    this.clearButton();
                    document.removeEventListener("keydown", handleKeyEvent);
                } else if (["ArrowUp", "ArrowDown", "w", "s"].includes(n.key)) {
                    handleWheelEvent(n.key === "ArrowDown" || n.key === "s");
                }
            };

            document.addEventListener("wheel", handleWheelEvent, true);
            document.addEventListener("keydown", handleKeyEvent);

            Array.from(this.buttonArea.children).forEach((btn, num) => {
                btn.addEventListener("mouseover", () => {
                    if (this.isInteractive) select = num
                });
                btn.addEventListener("mouseout", () => {
                    if (this.isInteractive) {
                        select = -1;
                        btn.style.background = "#111111";
                    }
                });
                btn.addEventListener("click", () => {
                    if (this.isInteractive) {
                        resolve(btn.className);
                        this.clearButton();
                    }
                });
                ["mousemove", "wheel", "keydown"].forEach(event => {
                    document.addEventListener(event, () => {
                        btn.style.background = select === num ? "#555555" : "#111111";
                    });
                });
            });
        });
    }

    clearButton(name) {
        if (name) {
            const button = this.buttonElements.find(btn => btn.className === name);
            if (button) {
                this.buttonArea.removeChild(button);
                this.buttonElements = this.buttonElements.filter(btn => btn !== button);
                if (this.buttonElements.length === 0) {
                    this.buttonArea.style.display = "none";
                }
            }
        } else {
            this.buttonArea.innerHTML = "";
            this.buttonElements = [];
            this.buttonArea.style.display = "none";
        }
    }
}

export default ButtonManager;