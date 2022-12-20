export class Drawable {
    constructor(context, x, y) {
        this.x = x;
        this.y = y;
        this.context = context;
        this.visibility = true;

        this.setSize(64, 64);
    }


    setVisibility(enable) {
        this.visibility = enable;
    }

    setSize(x, y) {
        this.width = x;
        this.height = y;
    }

    setSpeed(x, y) {
        this.speedX = x;
        this.speedY = y;
    }

    setImage(path) {
        let self = this
        let image = new Image();
        image.onload = function () {
            self.context.drawImage(image, self.x, self.y, self.width, self.height);
            self.image = image;
        }
        image.src = path;
    }

    draw() {
        try {
            this.context.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        } catch (e) {

        }
    }

    clear() {
        this.context.clearRect(this.x - this.width / 2 - 2, this.y - this.height / 2 - 2, this.width + 4, this.height + 4);
    }

    getName() {
        return 'drawable'
    }

    tick() {
    }

    collideAction() {

    }

    isExpired() {
        if (this.y > this.context.height + this.height) {
            return true;
        }

        if (this.x > this.context.width + this.width) {
            return true;
        }

        if (this.x < -this.width) {
            return true;
        }

        if (this.y < -this.height) {
            return true;
        }

        return false;
    }

    getSpeedScaler() {
        let mode = window.speed;

        let scaler = 1;

        if (mode === undefined) {
            return scaler;
        }

        if (mode === 0) {
            return 0.2;
        }

        if (mode === 1) {
            return 0.6;
        }

        if (mode === 2) {
            return 1;
        }

        if (mode === 3) {
            return 1.5;
        }

        if (mode === 4) {
            return 2;
        }
    }

}