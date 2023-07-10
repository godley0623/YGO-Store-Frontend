/*----- Global Variables -----*/
const formatting_options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
}
const USD = new Intl.NumberFormat( 'en-US', formatting_options );

/*----- Normal -----*/
export function chooseRandom (arr, amount = 1) {
    let newArr = [];
    let randomIdx;
    while (amount > 0) {
        randomIdx = Math.floor(Math.random() * arr.length);
        if (newArr === [] || !newArr.some((i) => i === arr[randomIdx])) {
            newArr.push(arr[randomIdx]);
            amount--;
        }
    }
    return newArr;
}

function resizeText (el) {
    if (el.innerText.length >= 25) {
        el.style.fontSize = '14px';
    }
    if (el.innerText.length >= 30) {
        el.style.fontSize = '12px';
    }
}

export function createCardDivs (container, cards) {
    for (let i = 0; i < cards.length; i++) {
        let cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'card');
        cardDiv.setAttribute('id', `card-${i+1}`);
        cardDiv.innerHTML = `
        <img src=${cards[i].card_image} class='card-image' id='card-image-${i+1}'>
        <h3 class='card-name' id='card-name-${i+1}'>${cards[i].name}</h3>
        <p class='card-price' id='card-price-${i+1}'>${USD.format(cards[i].card_price)}</p>
        <div class='buy-container'>
            <button class='info' id='cart-${i+1}'>Card Info</button>
            <input class='card-amount' id='card-amount-${i+1}' value='1'>
            <button class='cart' id='cart-${i+1}'>Add to Cart</button>
        </div>
        `;
        container.append(cardDiv);
        resizeText(container.querySelector(`#card-name-${i+1}`));
    }
}

export function deleteCardDivs () {
    let cardDivs = document.querySelectorAll('.card');
    for (let i = 0; i < cardDivs.length; i++) {
        cardDivs[i].remove();
    }
}

export function eventDelegation (action, selector, cb = (el=null)=>{}) {
    let body = document.querySelector('body');
    try {
        body.addEventListener(action, (e)=> {
            if (selector === e.target.getAttribute('class').split(' ')[0]) {
                cb(e.target);
            }
        })
    } catch (err) {
        console.log(err);
    }
}


export function deckSizeCheck (deck, max) {
    let deckSize = 0;

    if (deck.length === 0) return true;


    deck.forEach((card) => {
        deckSize += card.quantity;
    });

    if (deckSize < max) {
        return true;
    }else {
        return false;
    }
}

export function deckCreate (mainDeck, extraDeck) {
    let monsters = [];
    let spells = [];
    let traps = [];
    let md = [];
    let ed = [];
    let fullDeck = [];
    let temp;

    if (mainDeck.length > 0) {
        for (let i = 0; i < mainDeck.length; i++) {
            if (mainDeck[i].type.includes('Monster')) {
                temp = Array(mainDeck[i].quantity).fill(mainDeck[i])
                monsters = monsters.concat(temp);
            } else if (mainDeck[i].type.includes('Spell')) {
                temp = Array(mainDeck[i].quantity).fill(mainDeck[i])
                spells = spells.concat(temp); 
            } else {
                temp = Array(mainDeck[i].quantity).fill(mainDeck[i])
                traps = traps.concat(temp);
            }
        }
        md = md.concat(monsters);
        md = md.concat(spells);
        md = md.concat(traps);
    } else {
        return false
    }

    if (extraDeck.length > 0) {
        for (let i = 0; i < extraDeck.length; i++) {
            temp = Array(extraDeck[i].quantity).fill(extraDeck[i]);
            ed = ed.concat(temp);
        }
    }

    fullDeck = fullDeck.concat(md);
    fullDeck = fullDeck.concat(ed);

    return fullDeck;
}


/*----- Async -----*/
export async function getCards (url, route = '') {
    let jsonArr;
    await fetch(url+route)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        jsonArr = json;
    })
    return jsonArr;
}

//Adding Cards to cart database
export async function addToCart(url, body) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return response;
}