import {Menu} from "../Menu.js";
import {readTheoryFromFile} from "../../adapter/JSONReaderAdapter.js";

export class TheoryMenu extends Menu {
    constructor(context) {
        super(context);
        this.context = context;
    }

    generateMenu() {
        this.context.innerHTML = "";
        document.getElementById("ui").style.display = "";

        let content = document.createElement("div");
        content.setAttribute("class", "content");

        let button = document.createElement("div");
        button.setAttribute("class", "small_button");
        button.setAttribute("style", "align-self: start; margin-left: 20px; margin-top:20px");
        button.innerHTML = "BACK";
        button.onclick = this.gotoMainMenu;

        content.appendChild(button);

        let panel = document.createElement("div");
        panel.setAttribute("class", "panel");
        panel.setAttribute("style", "margin-top:20px");
        content.appendChild(panel);

        let topLine = document.createElement("div");
        topLine.setAttribute("class", "topline");
        panel.appendChild(topLine)

        let header = document.createElement("h1");
        header.setAttribute("class", "header_white");
        header.innerHTML = "Theory";
        topLine.appendChild(header);

        let splitter = document.createElement("div");
        splitter.setAttribute("class", "spliter");
        panel.appendChild(splitter);


        panel.appendChild(this.generateTheory());


        this.context.appendChild(content);
    }

    gotoMainMenu() {
        window.mainmenu.generateMenu();
    }

    generateTheory() {
        let theory = readTheoryFromFile("./levels/theory/theory.json");

        let infoPanel = document.createElement("div");
        infoPanel.setAttribute("class", "scroll");

        for (let i = 0; i < theory.length; i++) {
            let sTheory = theory[i];

            let box = document.createElement("div");
            box.setAttribute("class", "flexbox_horizontal");

            let name = document.createElement("h1");
            name.setAttribute("class", "text_white");
            let margin = 20;
            if (sTheory.type.length > 21) {
                margin = 5;
            }
            name.setAttribute("style", "margin-top: " + margin + "px;font-size: 30px; width: 500px")
            name.innerHTML = sTheory.type;
            box.appendChild(name);

            let example = document.createElement("h1");
            example.setAttribute("class", "text_white");
            example.setAttribute("style", "margin-top: " + margin + "px;font-size: 30px; width: 500px")
            example.innerHTML = sTheory.getRandomExample();
            box.appendChild(example);

            box.setAttribute("style", "height: 100px;");

            infoPanel.appendChild(box);
        }

        return infoPanel;
    }

    gotoMainMenu() {
        window.mainmenu.generateMenu();
    }


}