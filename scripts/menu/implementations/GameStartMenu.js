import {Menu} from "../Menu.js";
import {getToken} from "../../utils/AuthUtils.js";
import {createCookie, getCookie} from "../../utils/CookieUtils.js";
import {tryLoginAdapter} from "../../adapter/AuthAdapter.js";

export class GameStartMenu extends Menu {
    constructor(context, path) {
        super(context);
        window.lastPath = path;
    }


    generateMenu() {
        this.context.innerHTML = "";
        document.getElementById("ui").style.display = "";

        let content = document.createElement("div");
        content.setAttribute("class", "content");

        let panel = document.createElement("div");
        panel.setAttribute("class", "panel");
        panel.setAttribute("style", "width: 600px; height: 350px; margin-top:200px");
        content.appendChild(panel);

        let topic = document.createElement("h1");
        topic.setAttribute("class", "header");
        topic.setAttribute("style", "font-size: 100px; margin-top: -5px;");
        topic.innerHTML = "Scannon";
        panel.appendChild(topic);

        this.login = document.createElement("input");
        this.login.setAttribute("type", "email");
        this.login.setAttribute("id", "login");
        this.login.setAttribute("class", "input_scannon");
        this.login.setAttribute("placeholder", "Login");
        panel.appendChild(this.login);

        this.password = document.createElement("input");
        this.password.setAttribute("type", "password");
        this.password.setAttribute("id", "password");
        this.password.setAttribute("class", "input_scannon");
        this.password.setAttribute("placeholder", "Password");
        panel.appendChild(this.password);

        this.button = document.createElement("div");
        this.button.setAttribute("class", "small_button");
        this.button.setAttribute("style", "align-self: center; height: 60px; margin-top: 20px;font-size: 30px;");
        this.button.innerHTML = "START";
        this.button.onclick = this.startGame;

        panel.appendChild(this.button);

        this.context.appendChild(content);
    }

    startGame() {
        document.getElementById("background").style.display = "none";
        document.getElementById("ui").style.display = "none";
        document.getElementById("canvas").style.display = "";
        window.scene.loadNewGame(window.lastPath);
    }
}