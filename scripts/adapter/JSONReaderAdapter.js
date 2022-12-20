import {STask} from "../structures/STask.js";
import {SType} from "../structures/SType.js";
import {SLevel} from "../structures/SLevel.js";
import {SGroup} from "../structures/SGroup.js";
import {STheory} from "../structures/STheory.js";

export function readTaskFromFile(path) {
    let result = [];
    let request = new XMLHttpRequest();
    if(window.pingBd){
        path = "http://" + window.ip + ":" + window.port + path;
        request.open("GET", path, false);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status == 0) {
                    let content = request.responseText;
                    let json = JSON.parse(content);
                    let sequence = json.sequence;

                    for (let i = 0; i < sequence.length; i++) {
                        let node = sequence[i];
                        let task = new STask();
                        task.setExpression(node.unicode);
                        task.setReward(node.scoreForHit);
                        task.setPunishment(node.scoreForSkip);
                        task.setErrors(node.types);
                        task.setTutorial(node.tutorial);

                        result.push(task);
                    }
                }
            }
        }
        request.send(null);
    }else{
        request.open("GET", path, false);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status == 0) {
                    let content = request.responseText;
                    let json = JSON.parse(content);
                    let sequence = json.sequence;


                    for (let i = 0; i < sequence.length; i++) {
                        let node = sequence[i];
                        let task = new STask();

                        task.setExpression(node.unicode);
                        task.setReward(node.scoreForHit);
                        task.setPunishment(node.scoreForSkip);
                        task.setErrors(node.types);
                        task.setTutorial(node.tutorial);

                        result.push(task);
                    }
                }
            }
        }
        request.send(null);
    }
    return result;
}

export function readLevelFromFile(path, local = false) {
    let result = new SLevel();
    let request = new XMLHttpRequest();
    if(window.pingBd && !local){
        path = "http://" + window.ip + ":" + window.port + path;
        request.open("GET", path, false);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status == 0) {
                    let content = request.responseText;
                    let json = JSON.parse(content);
                    let sequences = json.sequences.replace("}","").replace("{","").split(",");
                    result.setName(json.name);
                    result.setType(json.type);
                    result.setIcon(json.icon);

                    for (let i = 0; i < sequences.length; i++) {
                        let node = sequences[i];
                        let sequencePath = "/sequences/" + node;
                        result.addSequence(sequencePath);
                    }
                }
            }
        }
        request.send(null);
    } else{
        request.open("GET", path, false);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status == 0) {
                    let content = request.responseText;
                    let json = JSON.parse(content);
                    let sequences = json.sequences;
                    result.setName(json.name);
                    result.setType(json.type);
                    result.setIcon(json.icon);

                    for (let i = 0; i < sequences.length; i++) {
                        let node = sequences[i];
                        let sequencePath = "./levels/sequences/" + node + ".json";
                        result.addSequence(sequencePath);
                    }
                }
            }
        }
        request.send(null);
    }
    return result;
}

export function readGroupFromFile(path) {
    let result = new SGroup();
    let request = new XMLHttpRequest();

    if(window.pingBd){
        path = "http://" + window.ip + ":" + window.port + path;
        request.open("GET", path, false);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status == 0) {
                    let content = request.responseText;
                    let json = JSON.parse(content);

                    let levels = json.levels.replace("}","").replace("{","").split(",");

                    result.setName(json.name);
                    result.setIconPath(json.icon);

                    let levelPath = "./levels/levels/level_theory.json";
                    let sLevel = readLevelFromFile(levelPath, true);
                    result.addLevel(sLevel);

                    for (let i = 0; i < levels.length; i++) {
                        let node = levels[i];
                        let levelPath = "/levels/" + node;
                        let sLevel = readLevelFromFile(levelPath);
                        result.addLevel(sLevel);
                    }
                }
            }
        }

        request.send(null);
    } else {
        request.open("GET", path, false);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status == 0) {
                    let content = request.responseText;
                    let json = JSON.parse(content);

                    let levels = json.levels;

                    result.setName(json.name);
                    result.setIconPath(json.icon);

                    for (let i = 0; i < levels.length; i++) {
                        let node = levels[i];
                        let levelPath = "./levels/levels/" + node + ".json";
                        let sLevel = readLevelFromFile(levelPath);
                        result.addLevel(sLevel);
                    }
                }
            }
        }
        request.send(null);
    }
    return result;
}

export function readGroupPathsFromConfig(path) {
    let result = []
    let request = new XMLHttpRequest();
    if(window.pingBd){
        request.open("GET", path, false);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status == 0) {
                    let content = request.responseText;
                    let json = JSON.parse(content);

                    let groups = json.array;
                    for (let i = 0; i < groups.length; i++) {
                        let node = groups[i];
                        // let groupPath = "./levels/groups/" + node + ".json";
                        let groupPath = "/groups/" + node["id"];
                        result.push(groupPath);
                    }
                }
            }
        }
        request.send(null);
    }else{
        request.open("GET", path, false);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status == 0) {
                    let content = request.responseText;
                    let json = JSON.parse(content);

                    let groups = json.groups;

                    for (let i = 0; i < groups.length; i++) {
                        let node = groups[i];
                        let groupPath = "./levels/groups/" + node + ".json";
                        result.push(groupPath);
                    }
                }
            }
        }
        request.send(null);
    }
    return result;
}


export function readExpressionTypes(path) {
    let result = [];
    let request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200 || request.status == 0) {
                let content = request.responseText;
                let json = JSON.parse(content);
                let types = json.types;

                for (let i = 0; i < types.length; i++) {
                    let node = types[i];
                    let sType = new SType();
                    sType.setType(node.type);
                    sType.setName(node.eng);
                    result.push(sType);
                }
            }
        }
    }
    request.send(null);
    return result;
}


export function readBackendConfigFromFile(path) {
    let request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200 || request.status == 0) {
                let content = request.responseText;
                let json = JSON.parse(content);

                window.ip = json.ip;
                window.port = json.port;
            }
        }
    }
    request.send(null);
}

export function readTheoryFromFile(path) {
    let result = [];
    let request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200 || request.status == 0) {
                let content = request.responseText;
                let json = JSON.parse(content);
                let array = json.theory;

                for (let i = 0; i < array.length; i++) {
                    let element = array[i];
                    let sTheory = new STheory(element.type);
                    sTheory.setExamples(element.examples);
                    result.push(sTheory);
                }
            }
        }
    }
    request.send();
    return result;
}