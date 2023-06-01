/*----- Storing DOM Elements -----*/
const noItemsDiv = document.querySelector('.no-items');
const itemsUl = document.querySelector('.items');
const totalDiv = document.querySelector('.total');
const emptyCartBtn = document.querySelector('.empty-cart');

/*----- Global Variables -----*/
const formatting_options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
}
const USD = new Intl.NumberFormat( 'en-US', formatting_options );

/*----- Functions -----*/
async function getCheckoutItems () {
    const response = await fetch ('https://ygo-store-backend.herokuapp.com/cart/');
    const cart = await response.json();
    return cart[0].cart;
}

async function emptyCart () {
    const response = await fetch ('https://ygo-store-backend.herokuapp.com/cart/delete', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    location.reload();
}

/*----- Function Calls -----*/
getCheckoutItems()
.then((cart) => {
    if (cart.length === 0) {
        noItemsDiv.innerText = 'You have no items in your cart'
    } else {
        //Adding your items to the list
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * cart[i].quantity;

            let itemList = document.createElement('li');

            itemList.setAttribute('class', 'items');
            itemList.setAttribute('id', `items-${i+1}`);
            itemList.innerHTML = `${cart[i].item.name} x${cart[i].quantity}: <span class='price-color'>${USD.format(cart[i].price * cart[i].quantity)}</span>`;

            itemsUl.append(itemList);
        }
        totalDiv.innerHTML = `Total: <span class='price-color'>${USD.format(total)}</span>`
        console.log(USD.format(total))
    }
})

/*----- Event Listners -----*/
emptyCartBtn.addEventListener('click', () => {
    emptyCart();
})