import {Menu} from "../Menu.js";
import {StatisticsMenu} from "./StatisticsMenu.js";
import {SignInMenu} from "./SignInMenu.js";
import {GameStartMenu} from "./GameStartMenu.js"
import {readStatisticsAdapter} from "../../adapter/StatisticsAdapter.js";
import {TheoryMenu} from "./TheoryMenu.js";

export class MainMenu extends Menu {
    constructor(context) {
        super(context);
        if ((window.userLogin === "" || window.userLogin === undefined)) {
            let loginMenu = new SignInMenu(context);
            if (!window.pingBd && window.pingBd !== undefined) {
                this.generateMenu();
            } else {
                loginMenu.generateMenu();
            }
        } else {
            this.generateMenu();
        }
    }

    updateStat() {
        let staticsMap = readStatisticsAdapter();
        window.statistics = new Map();
        for (let i = 0; i < staticsMap.length; i++) {
            let stat = staticsMap[i];
            window.statistics.set(stat.type, stat);
        }
    }

    generateMenu() {
        this.updateStat();

        document.getElementById("background").style.display = "";
        document.getElementById("canvas").style.display = "none";

        this.context.innerHTML = "";

        let panel = document.createElement("div");
        panel.setAttribute("id", "menu");
        panel.setAttribute("class", "content");

        let stats = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("class", "fit-picture-small-button");
        img.setAttribute("src", "./icons/trophy.png");
        stats.appendChild(img);
        stats.onclick = this.openStatistics;
        panel.appendChild(stats);

        let div = document.createElement("div");
        panel.appendChild(div);

        let topic = document.createElement("h1");
        topic.setAttribute("class", "header");
        topic.innerHTML = "Scannon";
        div.appendChild(topic);

        let groupBox = document.createElement("div");
        groupBox.setAttribute("class", "flexbox_horizontal");
        panel.appendChild(groupBox);
        this.groupBox = groupBox;

        this.generateGroupsCars()

        this.context.appendChild(panel);
    }

    openStatistics() {
        let stats = new StatisticsMenu(document.getElementById("ui"));
        stats.generateMenu();
    }

    generateGroupsCars() {
        this.groupBox.innerHTML = "";

        for (let i = 0; i < window.levelGroups.length; i++) {
            let group = window.levelGroups[i];
            this.groupBox.appendChild(this.createGroupCard(group));
        }

    }

    createGroupCard(group) {
        let levelCard = document.createElement("div");
        levelCard.setAttribute("class", "level_card");
        levelCard.setAttribute("style", "align-self: center; margin-left: 20px; margin-right: 20px;");

        let playButton = document.createElement("div");
        playButton.setAttribute("class", "level_design");
        playButton.setAttribute("id", "playButton");

        let menu = this;

        //playButton.onclick = this.func;
        playButton.type = "button";
        playButton.addEventListener("click", function () {
            menu.generateLevels(group.levels);
        })

        let button = document.createElement("div");
        button.setAttribute("class", "button");
        button.innerHTML = group.name;
        playButton.appendChild(button);

        let splitter = document.createElement("div");
        splitter.setAttribute("class", "spliter");
        playButton.appendChild(splitter);

        let div = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("class", "fit-picture");
        img.setAttribute("src", "./icons/" + group.iconPath);
        div.appendChild(img);
        playButton.appendChild(div);

        levelCard.appendChild(playButton);

        return levelCard;
    }

    createLevelCard(level) {
        let levelCard = document.createElement("div");
        levelCard.setAttribute("class", "level_card");
        levelCard.setAttribute("style", "align-self: center; margin-left: 20px; margin-right: 20px;");

        let playButton = document.createElement("div");
        playButton.setAttribute("class", "level_design");
        playButton.setAttribute("id", "playButton");

        let menu = this;
        let path = level.getRandomSequence();

        //playButton.onclick = this.func;
        playButton.type = "button";
        playButton.addEventListener("click", function () {
            if (level.type !== "theory") {
                let gameStartMenu = new GameStartMenu(menu.context, path);
                gameStartMenu.generateMenu();
            } else {
                menu.generateTheory(level);
            }
        })

        let button = document.createElement("div");
        button.setAttribute("class", "button");
        button.innerHTML = level.name;
        playButton.appendChild(button);

        let splitter = document.createElement("div");
        splitter.setAttribute("class", "spliter");
        playButton.appendChild(splitter);

        let div = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("class", "fit-picture");
        img.setAttribute("src", "./icons/" + level.iconPath);
        div.appendChild(img);
        playButton.appendChild(div);

        levelCard.appendChild(playButton);

        return levelCard;
    }

    generateTheory(level) {
        let theoryMenu = new TheoryMenu(this.context);
        theoryMenu.generateMenu();
    }

    generateLevels(levels) {
        this.groupBox.innerHTML = "";

        if (levels.length == 1 && levels[0].name == 'Tutorial') {
            let level = levels[0];
            let path = level.getRandomSequence();

            document.getElementById("background").style.display = "none";
            document.getElementById("ui").style.display = "none";
            document.getElementById("canvas").style.display = "";
            window.scene.loadNewGame(path);
        }

        for (let i = 0; i < levels.length; i++) {
            let level = levels[i];
            this.groupBox.appendChild(this.createLevelCard(level));
        }
    }


}