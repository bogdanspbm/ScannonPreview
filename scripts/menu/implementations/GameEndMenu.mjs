import {Menu} from "../Menu.mjs";

export class GameEndMenu extends Menu {
    constructor(context) {
        super(context);
    }

    generateMenu() {
        console.log("Game end");

        let content = document.createElement("div");
        content.setAttribute("class", "content");

        let panel = document.createElement("div");
        panel.setAttribute("class", "panel");
        content.appendChild(panel);

        let topLine = document.createElement("div");
        topLine.setAttribute("class", "topline");
        panel.appendChild(topLine)

        let header = document.createElement("h1");
        header.setAttribute("class", "header_white");
        header.innerHTML = "Game finished"
        topLine.appendChild(header);

        let splitter = document.createElement("div");
        splitter.setAttribute("class", "spliter");
        panel.appendChild(splitter);

        let infoPanel = document.createElement("div");
        infoPanel.setAttribute("class", "flexbox_horizontal");

        panel.appendChild(infoPanel);

        let leftColumn = document.createElement("div");
        leftColumn.setAttribute("class", "flexbox_vertical");
        infoPanel.appendChild(leftColumn);

        let rightColumn = document.createElement("div");
        rightColumn.setAttribute("class", "flexbox_vertical_reverse");
        infoPanel.appendChild(rightColumn);

        let errorText = document.createElement("h1");
        errorText.setAttribute("class", "text_white");
        errorText.innerHTML = "Mistakes: 2";
        leftColumn.appendChild(errorText);

        let hitsText = document.createElement("h1");
        hitsText.setAttribute("class", "text_white");
        hitsText.innerHTML = "Hits: 2";
        leftColumn.appendChild(hitsText);

        let scoreText = document.createElement("h1");
        scoreText.setAttribute("class", "text_white");
        scoreText.innerHTML = "Score: 2500";
        leftColumn.appendChild(scoreText);

        leftColumn.appendChild(this.generateStars());

        let button = document.createElement("div");
        button.setAttribute("class", "small_button");
        button.innerHTML = "FINISH";
        rightColumn.appendChild(button);

        this.context.appendChild(content);
    }

    generateStars() {
        let starsPanel = document.createElement("div");
        starsPanel.setAttribute("class", "flexbox_horizontal");
        starsPanel.setAttribute("style", "margin-left: 20px; margin-top: 80px");

        for (let i = 0; i < 5; i++) {
            let star = document.createElement("div");
            star.setAttribute("class", "margin_20");
            let img = document.createElement("img");
            img.setAttribute("class", "fit-picture-small");
            img.setAttribute("src", "../../icons/star.png");
            star.appendChild(img);
            starsPanel.appendChild(star);
        }

        return starsPanel;
    }


}