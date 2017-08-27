var version = '2.0.0';
var urlbase = 'https://get.eldiaque.tk/antichistes';
var first_part = document.getElementById('first-part');
var second_part = document.getElementById('second-part');
var button_next = document.getElementById('button-next');
var button_like = document.getElementById('button-like');
var button_show = document.getElementById('button-show');
var current = null;
function random() {
    var req = new XMLHttpRequest();
    req.open('GET', urlbase + "/random/one", true);
    req.onload = function (e) {
        if (req.readyState === 4 && req.status === 200) {
            current = JSON.parse(req.responseText).items[0];
            first_part.textContent = current.first_part;
            second_part.textContent = current.second_part;
            first_part.style.display = 'block';
        }
    };
    req.send(null);
}
function aleatorio() {
    button_show.style.display = 'block';
    [first_part, second_part, button_like, button_next].forEach(function (b) {
        b.style.display = 'none';
    });
    random();
}
function like() {
    button_like.style.display = 'none';
    var req = new XMLHttpRequest();
    req.open('POST', urlbase + "/vote", true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send("id=" + current.id);
}
function show() {
    button_show.style.display = 'none';
    [second_part, button_like, button_next].forEach(function (b) {
        b.style.display = 'block';
    });
}
function main() {
    console.log("AntiChistes v" + version);
    console.log('Mira el código en https://github.com/marionauta/antichistes');
    aleatorio();
}
