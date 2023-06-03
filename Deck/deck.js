/*----- Imports -----*/
import { eventDelegation } from "../functions.js";

/*----- Storing DOM Elements -----*/
const decksUl = document.querySelector('.decks');
const plusSignSpan = document.querySelector('.plus-sign');

/*----- Global Variables -----*/
const url = 'https://ygo-store-backend.herokuapp.com/deck';
let getDeck = localStorage.getItem('Deck') || [];
if (getDeck.length > 0) JSON.parse(getDeck);

/*----- Functions -----*/
async function getDecks () {
    await fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            let deck = document.createElement('h2');
            deck.setAttribute('id', data[i].name);
            deck.setAttribute('class', 'deckList');
            deck.innerText = data[i].name;
            decksUl.append(deck);
        }
    })
}

/*----- Function Calls -----*/
getDecks();

/*----- Event Listener -----*/
eventDelegation('click', 'deckList', async (el) => {
    const deckName = el.getAttribute('id')
    await fetch(`https://ygo-store-backend.herokuapp.com/decklist/${deckName}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        localStorage.setItem('Deck', data.deck_list[0]);
        location.assign('../index.html');
    })
})

plusSignSpan.addEventListener('click', async () => {
    if (getDeck.length === 0) return false;

    const deckName = prompt('Deck Name');
    await fetch(url+'/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: deckName,
            deck_list: getDeck
        })
    })
    .then((response) => {
        location.reload();
    })

})