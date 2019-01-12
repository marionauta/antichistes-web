var version = '2.0.0';
var urlbase = 'https://api.antichistes.ga/antichistes';
var first_part = document.getElementById('first-part');
var second_part = document.getElementById('second-part');
var loading = document.getElementById('loading');
var button_next = document.getElementById('button-next');
var button_like = document.getElementById('button-like');
var button_show = document.getElementById('button-show');
var current = null;
var queue = null;
function display(e) {
    e.style.display = 'block';
}
function hide(e) {
    e.style.display = 'none';
}
function random() {
    var req = new XMLHttpRequest();
    req.open('GET', urlbase + "/random", true);
    req.onload = function (e) {
        if (req.readyState === 4 && req.status === 200) {
            var response = JSON.parse(req.responseText);
            if (response.error === 0) {
                queue = response.items;
                fillAntijoke();
                hide(loading);
            }
        }
    };
    display(loading);
    req.send(null);
}
function fillAntijoke() {
    current = queue[0];
    queue.shift();
    first_part.textContent = current.first_part;
    second_part.textContent = current.second_part;
    display(first_part);
    display(button_show);
}
function aleatorio() {
    [first_part, second_part, button_like, button_next].forEach(hide);
    if (queue === null || queue.length < 1) {
        random();
    }
    else {
        fillAntijoke();
    }
}
function like() {
    hide(button_like);
    var req = new XMLHttpRequest();
    req.open('POST', urlbase + "/vote", true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send("id=" + current.id);
}
function show() {
    hide(button_show);
    [second_part, button_like, button_next].forEach(display);
}
function main() {
    console.log("AntiChistes v" + version);
    console.log('Mira el código en https://github.com/marionauta/antichistes');
    aleatorio();
}
