export class Ball {
    constructor(name, x, y, square_size, xVelocity, yVelocity, className){
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = square_size;
        this.height = square_size;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.square_size = square_size;
        this.element = document.createElement("div");
        this.element.classList.add(this.name);
        this.element.id = this.name;

        this.draw()

    }
    bounceY() {
        this.yVelocity = -this.yVelocity;

    }
    bounceX() {
        this.xVelocity = -this.xVelocity;
    }
    get top() {
        return this.y;
    }
    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.square_size;
    }
    get bottom() {
        return this.y + this.square_size;
    }
    move() {
        this.x = this.x + this.xVelocity;
        this.y = this.y + this.yVelocity;
        // console.log("Ball position:", this.x, this.y, this.xVelocity, this.yVelocity);
        this.draw();

    }
    draw() {
        this.element.style.position = 'absolute';
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.square_size}px`;
        this.element.style.height = `${this.square_size}px`;
        // this.element.style.borderRadius = "5%";
        this.element.style.backgroundColor = 'grey';
        this.element.style.borderColor = 'black';

    }

    detect_wall_collision(wall) {
        if (wall.name == 'top' && this.bottom > wall.top && this.top < wall.bottom){
            this.bounceY()
            return true
        }

        const isHittingWall = this.right > wall.left && this.left < wall.right
                                    && this.bottom > wall.top && this.top < wall.bottom;
        console.log(wall.name);
        if (isHittingWall) {
                this.bounceX();
            }

        return isHittingWall;
    }

    detect_paddle_collision(paddle, rebound) {
        if (this.right > paddle.left && this.left < paddle.right
            && this.bottom > paddle.top && this.top < paddle.bottom) {
            if (rebound) {
                ball.color = 'red';
                paddle.color = 'blue';

                let ratio = (paddle.center - ball.x)/(paddle.width);
                console.log(ratio, ball.xVelocity, ball.yVelocity);
                ball.xVelocity *= ratio;
                ball.yVelocity *= ratio;
                this.bounceY();

            }
            else {
                this.bounceY();
            }
            // this.bounceX();
            return true
        }
        else
        {
            return false
        }
    }

    detect_brick_collisions(bricks) {
        let remainingBricks = [];

        for (let i = 0; i < bricks.length; i++) {
            if (this.right > bricks[i].left &&
                this.left  < bricks[i].right &&
                this.top < bricks[i].bottom  &&
                this.bottom > bricks[i].top) {

                bricks[i].destroy();
                this.bounceY();

                console.log(bricks, bricks.length)

            }
            else {
                remainingBricks.push(bricks[i]);
            }
        }
        return remainingBricks;
    }


}