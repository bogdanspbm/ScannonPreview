import {tryLogin} from "../utils/AuthUtils.js";



export function tryPing() {
    let request = new XMLHttpRequest();
    let url = "http://" + window.ip + ":" + window.port + "/";
    request.open("GET", url, false);
    let result = 0;
    request.onreadystatechange = function receiveResponse() {

        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log("We got a response : " + this.response);
            } else if (this.status == 0) {
                return 0;
            }
        }
    };

    try {
        result = request.send();
        console.log("True");
        window.pingBd = true;
        return result;
    } catch (e) {
        window.pingBd = false;
        console.log("False");
        return false;
    }
}


export function tryLoginAdapter(token) {
    let ping = tryPing();
    let loginResult;
    if (ping === undefined) {
        loginResult = tryLogin(token);
        window.pingBd = true;
    } else {
        window.pingBd = false;
    }
    return loginResult;
}