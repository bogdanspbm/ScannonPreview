import {Background} from "./visual/Background.js";
import {Scene} from './objects/Scene.js'
import {Cannon} from './objects/implementations/Cannon.js'
import {MainMenu} from './menu/implementations/MainMenu.js'
import {
    readBackendConfigFromFile,
    readGroupFromFile,
    readGroupPathsFromConfig, readTheoryFromFile
} from "./adapter/JSONReaderAdapter.js";
import {
    tryPing
} from "./adapter/AuthAdapter.js";
import {Logger} from "./objects/Logger.js";

readBackendConfigFromFile("./config/backend.json");
tryPing();

window.levelGroups = readLevelGroups();
window.logger = new Logger();

loadFont();

let background = initBackground();
window.scene = initScene();
window.score = 0;
window.negAmount = 0;
window.posAmount = 0;


setInterval(tick, 10);

function tick() {
    background.drawBackground();
    window.scene.tick();
}

window.mainmenu = new MainMenu(document.getElementById("ui"));

function initScene() {
    let canvas = document.getElementById("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.style.display = "none";

    let context = canvas.getContext("2d");
    context.width = 1920;
    context.height = 1080;

    let uiContext = document.getElementById("ui");

    let scene = new Scene(context, uiContext);

    let cannon = new Cannon(context, scene, 75, 350);
    cannon.setController("player");
    scene.addFixedItem(cannon);

    let botCannon = new Cannon(context, scene, 1600, 350);
    botCannon.setController("bot");
    scene.addFixedItem(botCannon);

    return scene;
}

function initBackground() {
    let bg = document.getElementById("background");
    bg.width = 1920;
    bg.height = 1080;
    bg.display = "";
    let bgContext = bg.getContext("2d");
    return new Background(bgContext);
}

function loadFont() {
    let f = new FontFace('FredokaOne', 'url(./fonts/FredokaOne-Regular.ttf)');

    f.load().then(function (font) {
        document.fonts.add(font);
        //context.font = '48px FredokaOne';
    });
}


function readLevelGroups() {
    let result = [];
    let path;
    if (window.pingBd){
        path = "http://" + window.ip + ":" + window.port + "/groups";
        window.pingBd = true;
    } else {
        path = "./levels/game/game_config.json";
        window.pingBd = false;
    }
    let groupPaths = readGroupPathsFromConfig(path);
    for (let i = 0; i < groupPaths.length; i++) {
        let path = groupPaths[i];
        result.push(readGroupFromFile(path));
    }
    return result;
}

