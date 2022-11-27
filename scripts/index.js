

import {Scene} from './objects/Scene.mjs'
import {Cannon} from './objects/implementations/Cannon.mjs'
import {PlayerController} from "./controller/implementation/PlayerController.mjs";

let can = document.getElementById("canvas");
let context = canvas.getContext("2d");
can.style.display = "none";

can.width = 1920;
can.height = 1080;

let scene = new Scene(context);

let cannon = new Cannon(context, scene, 0, 500);

scene.addItem(cannon);

let controller = new PlayerController(cannon);

setInterval(tick, 10);

function tick() {
    scene.tick();
}
