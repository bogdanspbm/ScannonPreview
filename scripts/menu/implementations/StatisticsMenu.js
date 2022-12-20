import {Menu} from "../Menu.js";
import {readExpressionTypes} from "../../adapter/JSONReaderAdapter.js";

export class StatisticsMenu extends Menu {
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
        header.innerHTML = "Statistics"
        topLine.appendChild(header);

        let splitter = document.createElement("div");
        splitter.setAttribute("class", "spliter");
        panel.appendChild(splitter);


        panel.appendChild(this.generateStats());


        this.context.appendChild(content);
    }

    gotoMainMenu() {
        window.mainmenu.generateMenu();
    }

    generateStats() {
        let types = readExpressionTypes("./config/expression_types.json");
        let stats = window.statistics;


        let infoPanel = document.createElement("div");
        infoPanel.setAttribute("class", "scroll");

        for (let i = 0; i < types.length; i++) {
            let sType = types[i];

            let stat = stats.get(sType.type);

            let percent = 0;
            if (stat !== undefined){
                if (stat.getSum() !== 0) {
                    percent = (stat.posAmount / stat.getSum()) * 100;
                }
            } else {
                percent = 0;
            }


            let box = document.createElement("div");
            box.setAttribute("class", "flexbox_horizontal");

            let name = document.createElement("h1");
            name.setAttribute("class", "text_white");
            let margin = 20;
            if (sType.name.length > 21) {
                margin = 5;
            }

            name.setAttribute("style", "margin-top: " + margin + "px;font-size: 30px; width: 500px")
            name.innerHTML = sType.name;

            box.appendChild(name);

            let bar = document.createElement("div");
            bar.setAttribute("class", "progress-container");

            let fill = document.createElement("div");
            fill.setAttribute("class", "progress");
            fill.setAttribute("style", "width:" + percent + "%;")
            bar.appendChild(fill);


            box.setAttribute("style", "height: 100px;");
            box.appendChild(bar)

            infoPanel.appendChild(box);
        }

        return infoPanel;
    }

    gotoMainMenu() {
        window.mainmenu.generateMenu();
    }


}