

export default class Rectangle {
    constructor(name, x, y, width, height, className, speed = undefined){
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.element = document.createElement("div");
        this.element.classList.add(this.color);
        this.element.style.position = "absolute";
        this.speed = this.speed;



        this.draw();

    }

    get top() {
        return this.y;
    }
    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.width;
    }
    get bottom() {
        return this.y + this.height;
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

}

export class Wall extends Rectangle {
    constructor(name, x, y, width, height, color, className){
        super(name, x, y, width, height, color, className);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.element.classList.add("wall");

        // console.log(`Ball collided with ${this.name}`);

        this.draw()
    }

    draw() {
        this.element.style.position = 'absolute';
        this.element.style.backgroundColor = 'black';
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
    }

}
export class Brick extends Rectangle {
    constructor(name, x, y, width, height, className){
        super(name, x, y, width, height, className);

        this.element.classList.add('brick');
        this.element.id = 'brick';


        this.draw()
    }

    draw(){
        this.element.style.position = 'absolute';
        this.element.style.backgroundColor = 'orange';
        this.element.style.border = '1px solid #ccc';
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

    }

    destroy(){
        this.element.remove();
    }
}



