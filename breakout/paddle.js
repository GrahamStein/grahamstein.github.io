import Rectangle from "./rectangle.js";

export class Paddle extends Rectangle {
    constructor(name, x, y, width, height, className, speed) {
            super(name, x, y, width, height, className)

            this.element.classList.add('paddle');
            this.element.id = this.name;
            this.speed = speed;

            this.draw()

        }

        get center()
        {
            return this.x + 0.5 * this.width;
        }


        draw() {
            this.element.style.position = 'absolute';
            this.element.style.backgroundColor = 'grey';
            this.element.style.borderColor = 'black';
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
            this.element.style.width = `${this.width}px`;
            this.element.style.height = `${this.height}px`;
            // debugger
        }

        move(direction, wall)
        {

            if (direction === "right" && this.right <= wall) {
                this.x += this.speed;
            } else if (direction === "left" && this.left >= wall) {
                this.x -= this.speed;
            }
            this.draw()

            // if keyboard input is left, x = x-1
            // if keyboard input is right, x = x+1
        }


}