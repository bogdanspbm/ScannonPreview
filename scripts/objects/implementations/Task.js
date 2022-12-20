import {Drawable} from "../Drawable.js";
import {Collision} from "../Collision.js";
import {roundedRect} from "../../utils/DrawUtils.js"
import {Hint} from "./Hint.js";
import {createErrorMetric, createHitMetric} from "../../utils/MetricsUtils.js";

export class Task extends Drawable {

    constructor(context, x, y) {
        super(context, x, y);

        this.isCollided = false;

        this.setSize(300, 150);
        this.setSpeed(0, 1);

        this.collision = new Collision('rectangle', this);
        this.collision.setSize(300, 150);
        this.collision.setOffset(150, 75);
    }

    draw() {
        this.context.fillStyle = this.selectBackgroundColor();

        roundedRect(this.context, this.x, this.y, this.width, this.height, 20, true);

        this.context.strokeStyle = this.selectBorderColor();
        this.context.lineWidth = 6;
        roundedRect(this.context, this.x, this.y, this.width, this.height, 20, false);

        this.context.fillStyle = 'white'
        this.context.font = '48px FredokaOne';
        this.context.fillText(this.text, this.x + 25, this.y + this.height / 2 + 16);

        this.drawTutorial();
    }

    drawTutorial() {

        if (this.tutorial === undefined) {
            return;
        }

        let lines = this.tutorial.split("\\n");
        let width = this.getMaxWidth(lines);

        this.context.fillStyle = this.selectBackgroundColor();

        roundedRect(this.context, this.x + this.width + 10, this.y, width, this.height, 20, true);

        this.context.strokeStyle = this.selectBorderColor();
        this.context.lineWidth = 6;
        roundedRect(this.context, this.x + this.width + 10, this.y, width, this.height, 20, false);


        this.context.fillStyle = 'white'
        this.context.font = '24px FredokaOne';

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            this.context.fillText(line, this.x + 25 + this.width + 10, this.y + this.height / 2 - 8 + i * 32);
        }

    }

    getMaxWidth(lines) {
        let result = 0;
        this.context.font = '24px FredokaOne';

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            const metrics = this.context.measureText(line);

            if (metrics.width > result) {
                result = metrics.width;
            }
        }

        return result + 50;
    }

    clear() {
        this.context.clearRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);

        if (this.tutorial !== undefined) {
            this.clearTutorial();
        }
    }

    clearTutorial() {
        this.context.clearRect(this.x + this.width - 5 + 10, this.y - 5, this.width + 10, this.height + 10);
    }

    getName() {
        return 'task'
    }

    tick() {
        this.move();
    }

    move() {
        this.x += this.speedX * this.getSpeedScaler();
        this.y += this.speedY * this.getSpeedScaler();
    }

    setData(data) {
        this.data = data;
        this.text = data.expression.split("*").join("∙");
        this.context.font = '48px FredokaOne';

        this.reward = data.reward;
        this.punishment = data.punishment;
        this.types = data.errors;
        this.tutorial = data.tutorial;
        this.id = data.id;

        const metrics = this.context.measureText(this.text);

        this.setSize(metrics.width + 50, 100);
        this.collision.setSize(metrics.width + 50, 100);
    }

    selectBorderColor() {
        return 'white';
    }

    selectBackgroundColor() {
        if (this.isCollided) {
            if (this.reward > 0) {
                return '#84ff00';
            } else {
                return '#ff00a5';
            }
        } else {
            return '#32c9eb';
        }
    }

    collideAction(instigator) {
        if (!this.isCollided) {
            this.calculateStatistics(this.reward);
            this.isCollided = true;
            instigator.owner.controller.addScore(this.reward);

            if (instigator.owner.controller !== window.playerController) {
                return;
            }

            createHitMetric(this.id, window.playerController.score);

            if (this.types === undefined) {
                return;
            }
            window.score += this.reward;

            if (this.reward < 0) {
                window.negAmount++;
                let hint = new Hint(this.context, 0, 0);
                hint.setText(this.types.toString());
                window.scene.addItem(hint);
                createErrorMetric(this.id, window.playerController.score, this.types[0]);
            } else {
                window.posAmount++;
            }
        }
    }

    calculateStatistics(value) {
        for (let i = 0; i < this.types.length; i++) {
            let type = this.types[i];
            let stat = window.statistics.get(type);

            if (value > 0) {
                stat.incPosAmount();
            } else{
                stat.incNegAmount();
            }
        }
    }

}