/*----- Imports -----*/
import { 
    //Normal Functions
    chooseRandom,
    createCardDivs, 
    deleteCardDivs,
    eventDelegation,
    //Async Functions
    getCards 
} from './functions.js'

/*----- Storing DOM Elements -----*/
const cardContainer = document.querySelector('.card-container');
const searchInput = document.querySelector('.search-index');

/*----- Event Listners -----*/
eventDelegation('click', 'search-button', () => {
    let foundCards = false;
    getCards('http://localhost:4000/', `archetype/${searchInput.value}`)
    .then((response) => {
        if (response.length !== 0) {
            deleteCardDivs();
            createCardDivs(cardContainer, response);
            foundCards = true;
            return true;
        }
        if (!foundCards) {
            getCards('http://localhost:4000/', `name/${searchInput.value}`)
            .then((response) => {
                if (response.length !== 0) {
                    deleteCardDivs();
                    createCardDivs(cardContainer, response);
                    foundCards = true;
                    return true;
                }
            })
        }
        if (!foundCards) {
            getCards('http://localhost:4000/', `similar/${searchInput.value}`)
            .then((response) => {
                if (response.length !== 0) {
                    deleteCardDivs();
                    createCardDivs(cardContainer, response);
                    foundCards = true;
                    return true;
                }
            })
        }
    })
})

//Getting 20 random cards for the opening page
getCards('http://localhost:4000/')
.then((response) => {
    let randomCards = chooseRandom(response, 20)
    console.log(randomCards)
    createCardDivs(cardContainer, randomCards);
})