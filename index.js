import { menuArray } from './data.js'

const menuItems = document.getElementById('menu-items')
const orderSection = document.getElementById('order-section')
const paymentModal = document.getElementById('payment-modal')
const payBtn = document.getElementById('pay-btn')
const nameInput = document.getElementById('name')

let totalPrice = 0
let order = []

////////////////////////////////////*GENERATING THE HTML OF MENU, SECTION, AND ITEMS *////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getMenuHtml() {
    let menuHtml = ''
    menuArray.forEach(function(item) {
        menuHtml += `
            <div class="menu-item">
                <div class="menu-info">
                    <div class="item-graphic">
                        ${item.emoji}
                    </div>
                    <div>
                        <p class="item-name">${item.name}</p>
                        <p class="item-ingredients">${item.ingredients}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                </div>
                <div class="add-btn-section">
                    <button class="add-btn" data-add="${item.id}"><div class="plus" data-add="${item.id}">+</div></button>
                </div>
            </div>`
    })
    return menuHtml
}



function getOrderSectionHtml() {
    

    return `
        <div class="order-section-header">
            <p>Your Order</p>
        </div>

        <div id="order-items" class="order-items">

        </div>

        <div class="total-container">

            <div class="total-price">
                <p>Total Price:</p>
            </div>

            <div class="total-price-figure">
                <p>$${totalPrice}</p>
            </div>

        </div>
        <div class="btn-container">
            <button class="complete-order-btn" id="complete-order">Complete order</button>
        </div>`
}

function getOrderItemHtml() {
    let orderHtml = ''
    order.forEach(function(item) {
        orderHtml += `
            <div class="order-container">
                    <div class="order-item">
                        <p>${item.name}</p>
                        <button class="remove-item-btn" data-remove="${item.id}">remove</button>
                    </div>
                <div class="order-price">
                    <p>$${item.price}</p>
                </div>
            </div>`
    })
    return orderHtml
}


////////////////////////////////////////////////*EVENTLISTENER*//////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        addItemToOrder(e.target.dataset.add)
    }
    else if (e.target.dataset.remove){
        removeItemFromOrder(e.target.dataset.remove)
    }
    else if(e.target.id === "complete-order") {
        paymentModal.style.display = "flex"
    }
    else if (e.target.id === "pay-btn"){
        paymentModal.style.display = "none"
        orderSection.innerHTML = `
        <div class="completed-order-txt">
            <p>Thanks, ${nameInput.value}! Your order is on its way!</p>
        </div>`
    }
})
 
///////////////////////////////////////////////*FOOD MODIFICATION FUNCTIONS*///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
function addItemToOrder(itemId) {
    const targetItemObj = menuArray.filter(function(item) {
        return item.id == itemId
    })[0]
    order.push(targetItemObj)
    totalPrice += targetItemObj.price
    renderOrderSection()
    renderOrderItems()
}

function removeItemFromOrder(itemId) {
    itemId = Number(itemId)
    let targetItemObj = menuArray.find(obj => obj.id === itemId);
    if (order.includes(targetItemObj)) {
        order.splice(order.indexOf(targetItemObj), 1);
        totalPrice -= targetItemObj.price
        renderOrderSection()
        renderOrderItems()
    }
}

 ////////////////////////////////////////////////////*RENDERING*//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderOrderItems() {
    document.getElementById('order-items').innerHTML = getOrderItemHtml()
}

function renderOrderSection() {
    orderSection.innerHTML = getOrderSectionHtml()
}


function renderMenu() {
    menuItems.innerHTML = getMenuHtml()
}

renderMenu()

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

