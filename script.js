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

/*----- Global Variables -----*/
let cart = [];

/*----- Storing DOM Elements -----*/
const cardContainer = document.querySelector('.card-container');
const searchInput = document.querySelector('.search-index');

/*----- Event Listners -----*/
eventDelegation('click', 'search-button', () => {
    let foundCards = false;
    getCards('https://ygo-store-backend.herokuapp.com/', `archetype/${searchInput.value}`)
    .then((response) => {
        if (response.length !== 0) {
            deleteCardDivs();
            createCardDivs(cardContainer, response);
            foundCards = true;
            return true;
        }
        if (!foundCards) {
            getCards('https://ygo-store-backend.herokuapp.com/', `name/${searchInput.value}`)
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
            getCards('https://ygo-store-backend.herokuapp.com/', `similar/${searchInput.value}`)
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

eventDelegation('click', 'card-image', (el) => {
    if (el.classList[1] === 'shrink' || el.classList[1] === undefined) {
        let allCards = document.querySelectorAll('.card-image');
        
        el.classList.add('expand');
        el.classList.remove('shrink');

        for (let i = 0; i < allCards.length; i++) {
            let expandCheck = allCards[i].getAttribute('class').split(' ')[1];
            if (allCards[i].getAttribute('id') !== el.getAttribute('id') && expandCheck === 'expand') {
                allCards[i].classList.remove('expand');
                allCards[i].classList.add('shrink');
            }
        }
    } else {
        el.classList.add('shrink')
        el.classList.remove('expand');
    }
})

//Clicking the cart button
eventDelegation('click', 'cart', async (el) => {
    const buttonIdSplit = el.getAttribute('id').split('-');
    const buttonNum = buttonIdSplit[buttonIdSplit.length-1];
    
    const cardName = document.querySelector(`#card-name-${buttonNum}`);
    const cardAmount = document.querySelector(`#card-amount-${buttonNum}`);

    let cardInCart = false
    await getCards(`https://ygo-store-backend.herokuapp.com/name/${cardName.innerText}`)
    .then((response) => {
        if (cart.length === 0) {
            cart.push({
                item: response[0],
                quantity: Number(cardAmount.value),
                price: response[0].card_price
            });
        } else {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].item._id === response[0]._id) {
                    cart[i].quantity += Number(cardAmount.value);
                    cardInCart = true;
                    break;
                }
            }
            if (!cardInCart) cart.push({
                item: response[0],
                quantity: Number(cardAmount.value),
                price: response[0].card_price
            });
        }
    })
    alert(`${cardAmount.value} ${cardName.innerText} was added to your cart`);
    addToCart('https://ygo-store-backend.herokuapp.com/cart/add', {cart: cart});
})

//Getting 20 random cards for the opening page
getCards('https://ygo-store-backend.herokuapp.com/')
.then((response) => {
    let randomCards = chooseRandom(response, 20)
    createCardDivs(cardContainer, randomCards);
})

async function addToCart(url, body) {
    console.log(body)
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    console.log(response)
    return response;
}