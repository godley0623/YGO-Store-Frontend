/*----- Storing DOM Elements -----*/
const decksUl = document.querySelector('.decks');
const plusSignSpan = document.querySelector('.plus-sign');

/*----- Global Variables -----*/
const url = 'https://ygo-store-backend.herokuapp.com/deck';

/*----- Functions -----*/
async function getDecks () {
    await fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let deck = document.createElement('h2');
            deck.setAttribute('id', data[i]._id);
            deck.setAttribute('class', 'deckList');
            deck.innerText = data[i].name;
            decksUl.append(deck);
        }
    })
}

/*----- Function Calls -----*/
getDecks();

/*----- Event Listener -----*/
plusSignSpan.addEventListener('click', async () => {
    const deckName = prompt('Deck Name');
    await fetch(url+'/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: deckName,
            main_deck_list: [],
            extra_deck_list: []
        })
    })
    .then((response) => {
        location.reload();
    })

})