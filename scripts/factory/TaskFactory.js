import {Task} from '../objects/implementations/Task.js'
import {readTaskFromFile} from "../adapter/JSONReaderAdapter.js";

export class TaskFactory {

    constructor(scene, levelPath) {
        this.counter = 0;
        this.counterLimit = 200;
        this.index = 0;
        this.tasks = readTaskFromFile(levelPath);
        this.scene = scene;
        this.createdTasks = []
    }

    createTask(data) {
        let task = new Task(this.scene.context, 700, 0);
        task.setData(data);


        this.scene.items.push(task);
        this.createdTasks.push(task);
    }

    incrementCounter() {
        this.counter += 1 * this.getSpeedScaler();

        if (this.counter > this.counterLimit && this.index < this.tasks.length) {
            this.createTask(this.tasks[this.index]);
            this.counter = 0;
            this.index += 1;
        }
    }

    tick() {
        this.incrementCounter();
        this.deleteExpiredChildren();

    }

    getLastNotHitTask() {
        for (let i = 0; i < this.createdTasks.length; i++) {
            let task = this.createdTasks[i];
            if (task.reward !== undefined && task.reward > 0 && !task.isCollided) {
                return task;
            }
        }
        return undefined;
    }

    deleteExpiredChildren() {
        let tasksToRemove = [];


        for (let i = this.createdTasks.length - 1; i >= 0; i--) {
            let task = this.createdTasks[i];
            if (task.isExpired()) {
                tasksToRemove.push(i);
            }
        }

        for (let i = 0; i < tasksToRemove.length; i++) {
            let index = tasksToRemove[i];
            this.createdTasks.splice(index, 1);
        }

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