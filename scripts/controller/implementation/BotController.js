import {Controller} from "../Controller.js";

export class BotController extends Controller {

    constructor(controllable) {
        super(controllable);
        this.factory = this.controllable.scene.factory;
    }

    getFactory(){
        return this.controllable.scene.factory;
    }

    tick() {
        this.targetTask = this.getFactory().getLastNotHitTask()


        if (this.targetTask === undefined) {
            return;
        }


        let x = this.targetTask.x;
        let y = this.targetTask.y - 100;

        let deltaX = x - this.controllable.targetX;
        let deltaY = y - this.controllable.targetY;

        let norm = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        deltaX /= norm;
        deltaY /= norm;

        this.calcShoot();

        this.controllable.setLookAtLocation(this.controllable.targetX + deltaX, this.controllable.targetY + deltaY);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    calcShoot() {
        let randValue = this.getRandomInt(100);
        if (randValue == 0) {
            this.controllable.action();
        }
    }

}