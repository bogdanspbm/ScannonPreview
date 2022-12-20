import {Drawable} from "../Drawable.js";
import {Ball} from "./Ball.js";
import {PlayerController} from "../../controller/implementation/PlayerController.js";
import {Score} from "./Score.js";
import {BotController} from "../../controller/implementation/BotController.js";
import {drawImage} from "../../utils/DrawUtils.js";

export class Cannon extends Drawable {

    constructor(context, scene, x, y) {
        super(context, x, y);

        this.scene = scene;

        this.rotation = 0;
        this.relativeRotation = Math.PI;

        this.setLookAtLocation(0, 0);

        this.setSize(196, 196);

        this.setImage('scripts/resources/cannon.svg')
    }

    setController(controller) {

        this.type = controller;

        if (controller === "player") {
            this.controller = new PlayerController(this);
        }

        if (controller === "bot") {
            this.controller = new BotController(this);
        }

        this.score = new Score(this.context, this.x, 30, this.controller);
    }

    tick() {
        this.controller.tick();
    }

    setLookAtLocation(x, y) {
        this.targetX = x;
        this.targetY = y;

        this.calculateAngleByLookAtPoint();
    }


    calculateAngleByLookAtPoint() {
        let x = this.x - this.targetX;
        let y = this.y - this.targetY;

        let angle = Math.atan(y / x);

        if (x < 0) {
            this.rotation = Math.PI + angle;
        } else {
            this.rotation = angle;
        }
    }

    draw() {
        if (!this.visibility) {
            return;
        }

        try {
            drawImage(this.context, this.image, this.x, this.y, this.width, this.height, this.rotation + this.relativeRotation);
        } catch (e) {

        }

        if (this.score !== undefined) {
            this.score.draw();
        }
    }


    action() {
        let ball = new Ball(this.context, this.x + this.width / 2, this.y + this.height / 2, this);

        let x = this.targetX - this.x;
        let y = this.targetY - this.y;

        let speed = 5;

        let norm = Math.sqrt(x * x + y * y);

        ball.setSpeed(x * speed / norm, y * speed / norm);

        this.scene.addItem(ball);
    }
}