/*----- Storing DOM Elements -----*/
const cardImageDiv = document.querySelector('.card-image');
const cardStatsDiv = document.querySelector('.card-stats');


/*----- Global Variables -----*/
let image;
let cardHTML;
let card = localStorage.getItem('card-info');
card = JSON.parse(card);
card = card[0];
console.log(card);

let cardImage = card.card_image;

//Setting the card Image
if (cardImage) {
    cardImageDiv.innerHTML = `
    <img class='image' src=${cardImage}>
    `;
}

//Setting the Card Stats
if (card.type.includes("Monster")) {
    let lvlText;
    let atkDefText;
    let desc = card.desc.replace('\n', '<br>');

    if (card.type.includes("XYZ")) {
        lvlText = `Rank: ${card.level}`;
    }else if (card.type.includes("Link")) {
        lvlText = `Link Value: ${card.linkval}`;
    }else if (card.type.includes("Pendulum")) {
        lvlText = `Level: ${card.level}-Scale: ${card.scale}`;
    }else {
        lvlText = `Level: ${card.level}`;
    }

    if (card.def !== -1) {
        atkDefText = `Atk: ${card.atk} / Def: ${card.def}`;
    }else {
        atkDefText = `Atk: ${card.atk}`;
    }
    cardHTML = `
    <h2>${card.name} / ${lvlText}</h2>
    <h2>${card.attribute}-${card.race} / ${card.type}</h2>
    <h2>${atkDefText}</h2>
    <h3>${desc}</h3>
    `
}else if (card.type.includes("Spell") || card.type.includes("Trap")) {
    let desc = card.desc.replace('\n', '<br>');

    cardHTML = `
    <h2>${card.name}</h2>
    <h2>${card.race} - ${card.type}</h2>
    <h3>${desc}</h3>
    `
} else {
    let desc = card.desc.replace('\n', '<br>');

    cardHTML = `
    <h2>${card.name}</h2>
    <h2>${card.type}</h2>
    <h3>${desc}</h3>
    `
}

cardStatsDiv.innerHTML = cardHTML;
