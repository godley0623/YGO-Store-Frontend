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
        <input class='card-amount' id='card-amount-${i+1}' value='1'>
        <button class='cart' id='cart-${i+1}'>Add to Cart</button>
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