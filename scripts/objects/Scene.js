import {TaskFactory} from "../factory/TaskFactory.js";
import {Background} from "../visual/Background.js";
import {GameEndMenu} from "../menu/implementations/GameEndMenu.js"
import {InGameMenu} from "../menu/implementations/InGameMenu.js";
import {PauseMenu} from "../menu/implementations/PauseMenu.js";

export class Scene {
    constructor(context, uiContext) {
        this.context = context;
        this.uiContext = uiContext;
        this.items = []
        this.fixedItems = []
        this.hasGameStarted = false;
        this.doTick = false;
        this.backgroundDrawer = new Background(context);
        window.gamePaused = true;
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        let index = this.items.indexOf(item);
        this.items = this.items.splice(index, 1);
    }

    addFixedItem(item) {
        this.fixedItems.push(item);
    }

    drawItems() {
        this.context.beginPath();
        this.items.forEach(value => {
            value.draw();
        })

        this.fixedItems.forEach(value => {
            value.draw();
        })
    }

    clearItems() {
        this.items.forEach(value => {
            value.clear();
        })
        this.fixedItems.forEach(value => {
            value.clear();
            value.controller.resetScore();
        })
        window.score = 0;
    }

    collideTick() {
        for (let i = 0; i < this.items.length; i++) {
            for (let k = 0; k < this.items.length; k++) {
                if (i !== k) {
                    let collisionA = this.items[i].collision;
                    let collisionB = this.items[k].collision;

                    if (collisionA !== undefined && collisionB !== undefined) {
                        if (collisionA.collide(collisionB) && collisionB.collide(collisionA)) {
                            collisionA.collideAction(collisionB.drawable);
                            collisionB.collideAction(collisionA.drawable);
                        }
                    }
                }
            }

        }
    }

    checkGameEnd() {
        if (!this.hasGameStarted && this.factory.createdTasks.length !== 0) {
            this.hasGameStarted = true;
        }

        if (this.hasGameStarted && this.factory.createdTasks.length === 0) {
            return true;
        }

        return false;
    }

    tick() {
        if (!this.doTick) {
            return;
        }

        if (this.checkGameEnd()) {
            this.endGame();
        }

        this.factory.tick();
        this.collideTick();

        this.backgroundDrawer.drawBackground();

        this.items.forEach(value => {
            value.tick();
        })

        this.fixedItems.forEach(value => {
            if (this.withBot) {
                value.tick();
            }
        })

        this.drawItems();
    }

    setDoTick(doTick) {
        this.doTick = doTick;
    }

    loadNewGame(path, withBot = false) {
        window.gamePaused = false;
        this.lastGamePath = path;
        this.factory = new TaskFactory(this, path);
        this.doTick = true;
        this.hasGameStarted = false;
        this.items = [];

        this.withBot = withBot;
        this.setBotVisibility(withBot);

        let inGameMenu = new InGameMenu(this.uiContext);
        inGameMenu.generateMenu();
    }

    setBotVisibility(enable) {
        this.fixedItems.forEach(value => {
            if (value.type === "bot") {
                value.setVisibility(enable);
            }
        })
    }

    pauseGame() {
        this.doTick = false;
        window.gamePaused = true;
        let pauseMenu = new PauseMenu(this.uiContext);
        pauseMenu.generateMenu();
    }

    unpauseGame() {
        this.doTick = true;
        window.gamePaused = false;
        let inGameMenu = new InGameMenu(this.uiContext);
        inGameMenu.generateMenu();
    }


    restartGame() {
        // this.items = [];
        this.clearItems();
        this.loadNewGame(this.lastGamePath);
    }

    endGame() {
        this.hasGameStarted = false;
        this.menu = new GameEndMenu(this.uiContext);
        this.menu.generateMenu();
        this.clearItems();
    }
}
