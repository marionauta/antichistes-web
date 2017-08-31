interface AntiJoke {
    id: Number,
    first_part: string,
    second_part: string,
}

const version = '2.0.0';
const urlbase = 'https://get.eldiaque.tk/antichistes';

const first_part = document.getElementById('first-part');
const second_part = document.getElementById('second-part');

const button_next = document.getElementById('button-next');
const button_like = document.getElementById('button-like');
const button_show = document.getElementById('button-show');

var current: AntiJoke = null;

function random() {
    let req = new XMLHttpRequest();
    req.open('GET', `${urlbase}/random/one`, true);

    req.onload = e => {
        if (req.readyState === 4 && req.status === 200) {
            current = JSON.parse(req.responseText).items[0] as AntiJoke;

            first_part.textContent = current.first_part;
            second_part.textContent = current.second_part;

            first_part.style.display = 'block';
            button_show.style.display = 'block';
        }
    };

    req.send(null);
}

function aleatorio() {
    [first_part, second_part, button_like, button_next].forEach(b => {
        b.style.display = 'none';
    });

    random();
}

// CLICK HANDLERS

function like() {
    button_like.style.display = 'none';

    let req = new XMLHttpRequest();
    req.open('POST', `${urlbase}/vote`, true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send(`id=${current.id}`);
}

function show() {
    button_show.style.display = 'none';

    [second_part, button_like, button_next].forEach(b => {
        b.style.display = 'block';
    });
}

/// MAIN

function main() {
    console.log(`AntiChistes v${version}`);
    console.log('Mira el código en https://github.com/marionauta/antichistes');
    aleatorio();
}
