/*----- Imports -----*/
import { 
    //Normal Functions
    chooseRandom,
    createCardDivs, 
    deleteCardDivs,
    eventDelegation,
    deckSizeCheck,
    deckCreate,
    //Async Functions
    getCards,
    addToCart
} from './functions.js'

/*----- Global Variables -----*/
let cart = [];
let mainDeck = [];
let extraDeck = [];
let getDeck = localStorage.getItem('Deck') || [];

/*----- Storing DOM Elements -----*/
const cardContainer = document.querySelector('.card-container');
const searchInput = document.querySelector('.search-index');
const deckModeInput = document.querySelector('.deck-mode');
const emptyDeckBtn = document.querySelector('.empty-deck');
const showDeckBtn = document.querySelector('.show-deck');

/*----- Event Listners -----*/

//Keyboard events
document.addEventListener('keydown', (key) => {
    if (key.code === 'KeyD') deckModeInput.click();
    
    let focusEl = searchInput;
    let isFocus = (document.activeElement === focusEl);
    if (key.code === 'Enter' && isFocus) document.querySelector('.search-button').click();
})

//DeckMode Toggle
deckModeInput.addEventListener('click', () => {

    if (deckModeInput.checked) {
        //Replacing the cart button with the deck button
        const cartBtns = document.querySelectorAll('button.cart');
        if (cartBtns.length) {
            for (let i = 0; i < cartBtns.length; i++) {
                cartBtns[i].remove();

                let cardDiv = document.querySelector(`#card-${i+1}`);

                let addToDeckBtn = document.createElement('button');
                addToDeckBtn.setAttribute('class', 'deck');
                addToDeckBtn.setAttribute('id', `deck-${i+1}`);
                addToDeckBtn.innerText = 'Add to Deck';
                cardDiv.append(addToDeckBtn);
            }
        }else {
            deckModeInput.checked = false;
        }
    } else {
        //Replacing the deck button with the cart button
        const deckBtns = document.querySelectorAll('button.deck');
        if (deckBtns.length) {
            for (let i = 0; i < deckBtns.length; i++) {
                deckBtns[i].remove();

                let cardDiv = document.querySelector(`#card-${i+1}`);

                let addToCartBtn = document.createElement('button');
                addToCartBtn.setAttribute('class', 'cart');
                addToCartBtn.setAttribute('id', `cart-${i+1}`);
                addToCartBtn.innerText = 'Add to Cart';
                cardDiv.append(addToCartBtn);
            }
        }else {
            deckModeInput.checked = true;
        }
    }
})

//Adding cards to deck
eventDelegation('click', 'deck', async (el) => {
    const deckNum = el.id.split('-')[1];
    const cardName = document.querySelector(`#card-name-${deckNum}`).innerText;
    const quantity = Number(document.querySelector(`#card-amount-${deckNum}`).value);
    
    if (quantity > 3) {
        alert('You can only have 3 of the same card in a deck');
        return false;
    }

    await getCards(`https://ygo-store-backend.herokuapp.com/name/${cardName}`)
    .then((response) => {
        const card = response[0]
        if (card.type.includes('Token') || card.type.includes('Skill')) {
            alert(`${card.type}s cannot be added to the deck`);
            return false;
        }else if (card.type.includes('Fusion') || card.type.includes('Synchro') || card.type.includes('XYZ') || card.type.includes('Link')) {
            if (!deckSizeCheck(extraDeck, 15)) {
                alert('You can only have a max of 15 cards in your Extra Deck');
                return false;
            }

            if (extraDeck.length === 0 || !extraDeck.some((ed) => ed.name === card.name)) {
                card.quantity = quantity;
                extraDeck.push(card);
            } else if (extraDeck.some((ed) => ed.name === card.name)) {
                for (let i = 0; i < extraDeck.length; i++) {
                    if (extraDeck[i].name === card.name) extraDeck[i].quantity = quantity;
                    if (extraDeck[i].quantity === 0) extraDeck.splice(i, 1);
                }
 
            }
        } else {
            if (!deckSizeCheck(mainDeck, 60)) {
                alert('You can only have a max of 60 cards in your Main Deck');
                return false;
            }

            if (mainDeck.length === 0 || !mainDeck.some((md) => md.name === card.name)) {
                card.quantity = quantity;
                mainDeck.push(card);
            } else if (mainDeck.some((md) => md.name === card.name)) {
                for (let i = 0; i < mainDeck.length; i++) {
                    if (mainDeck[i].name === card.name) mainDeck[i].quantity = quantity;
                    if (mainDeck[i].quantity === 0) mainDeck.splice(i, 1);
                }
            }
        }
    })
})

//Showing cards in deck
eventDelegation('click', 'show-deck', () => {
    const fullDeck = deckCreate(mainDeck, extraDeck);
    if (fullDeck) {
        deleteCardDivs();
        createCardDivs(cardContainer, fullDeck);
        deckModeInput.checked = false;
        localStorage.setItem('Deck', JSON.stringify(fullDeck));
    } else {
        alert('Your Main Deck is empty');
        return false;
    }
})

//Empty cards in deck
eventDelegation('click', 'empty-deck', () => {
    mainDeck = [];
    extraDeck = [];
    localStorage.setItem('Deck', JSON.stringify([]));
    location.reload();
})

//Searching for Cards
eventDelegation('click', 'search-button', () => {
    if (searchInput.value.length < 3) {
        alert('Character string must at least be 3 characters long');
        return;
    }

    let foundCards = false;
    getCards('https://ygo-store-backend.herokuapp.com/', `archetype/${searchInput.value}`)
    .then((response) => {
        if (response.length !== 0) {
            deleteCardDivs();
            createCardDivs(cardContainer, response);
            foundCards = true;
            deckModeInput.checked = false;
            return true;
        }
        if (!foundCards) {
            getCards('https://ygo-store-backend.herokuapp.com/', `name/${searchInput.value}`)
            .then((response) => {
                if (response.length !== 0) {
                    deleteCardDivs();
                    createCardDivs(cardContainer, response);
                    foundCards = true;
                    deckModeInput.checked = false;
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
                    deckModeInput.checked = false;
                    return true;
                }
            })
        }
    })
})

//Enlarge Card Image
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

//Clicking the card info button
eventDelegation('click', 'info', async (el) => {
    const infoNum = el.getAttribute('id').split('-')[1];
    const cardName = document.querySelector(`#card-name-${infoNum}`).innerText

    await getCards(`https://ygo-store-backend.herokuapp.com/name/exact/${cardName}`)
    .then((response) => {
        localStorage.setItem('card-info', JSON.stringify(response));
        location.assign('./Info/info.html');
    })
})

//Adding cards to the cart
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
                item: cardName.innerText,
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
                item: cardName.innerText,
                quantity: Number(cardAmount.value),
                price: response[0].card_price
            });
        }
    })
    alert(`${cardAmount.value} ${cardName.innerText} was added to your cart`);
    addToCart('https://ygo-store-backend.herokuapp.com/cart/add', {cart: cart});
})

/*----- Function Calls -----*/

//Getting 20 random cards for the opening page
getCards('https://ygo-store-backend.herokuapp.com/')
.then((response) => {
    let randomCards = chooseRandom(response, 20)
    if (getDeck.length === 0) createCardDivs(cardContainer, randomCards);
})

//Showing the cards that are saved in your deck
if (getDeck.length > 0) {
    getDeck = JSON.parse(getDeck);
    deleteCardDivs();
    createCardDivs(cardContainer, getDeck);
}