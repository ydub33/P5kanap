const params = new URLSearchParams(window.location.search)
/*
for (const param of params) {
    console.log(param)
  }
*/
const id = params.get("id")
//console.log({id})


fetch(`http://localhost:3000/api/products/${id} `, { method: "GET" })
    .then(res => res.json())
    .then(data => addOrder(data))
    .catch(err => console.error(err))

/** */

/* creation image */
const item__img = document.querySelector('.item__img')
let image = document.createElement("img")
item__img.appendChild(image)

/* les selectors */
const title = document.querySelector('#title')
const price = document.querySelector('#price')
const description = document.querySelector('#description')
const colors = document.querySelector('#colors')
const button = document.querySelector('#addToCart')

/************************* ****/
/*     fonction addOrder      */
/************************* ****/

let addOrder = (data) => {

    addProductDetails(data)

    let orderClick = () => {
        sendData(data)
    }
    button.addEventListener("click", orderClick)
}

/*********************************************** */

/************************* ****/
/* fonction addProductDetails */
/************************* ****/

let addProductDetails = (data) => {

    addData(data)
    colorOptions(data)
}

/************************* ****/
/*     fonction sendData      */
/************************* ****/
let sendData = (data) => {

    const orderImg = data.imageUrl
    const orderAlt = data.altTxt
    const orderName = data.name
    let orderColor = document.querySelector('#colors').value
    let orderQuantity = Number(document.querySelector('#quantity').value)
    let id2 = id + orderColor
    let key = id2

    if (((orderColor != "") && (orderQuantity > 0)) &&
        (localStorage.getItem(key))) {

        updateQuantity(key, orderQuantity)

    } else if ((orderColor != "") && (orderQuantity > 0)) {

        const orderData = {
            id2: id2,
            id: id,
            color: orderColor,
            quantity: orderQuantity,
            imageUrl: orderImg,
            altTxt: orderAlt,
            name: orderName
        }
        localStorage.setItem(key, JSON.stringify(orderData))
        window.location.href = 'cart.html'

    } else {
        alert('Veuillez sélectionner une couleur et une quantité')
    }
}

/************************* ****/
/* fonction addData           */
/************************* ****/

let addData = (data) => {
    image.src = data.imageUrl
    image.alt = data.altTxt
    title.textContent = data.name
    price.textContent = data.price
    description.textContent = data.description
}
/************************* ****/
/* fonction colorOptions      */
/************************* ****/
let colorOptions = (data) => {
    for (let i = 0; i < data.colors.length; i++) {
        let option = document.createElement("option")
        colors.appendChild(option)
        option.value = data.colors[i]
        option.textContent = data.colors[i]
    }
}
/************************* ****/
/* fonction updateQuantity   */
/************************* ****/
let updateQuantity = (key, orderQuantity) => {
    let local = {}
    local = JSON.parse(localStorage.getItem(key))
    local.quantity += orderQuantity
    localStorage.setItem(key, JSON.stringify(local))
    window.location.href = 'cart.html'
}








