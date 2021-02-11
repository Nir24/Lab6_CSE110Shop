// Script.js
myStorage = window.localStorage;
window.addEventListener('DOMContentLoaded', () => {

  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => myStorage.setItem('data', JSON.stringify(data)));

});
//myStorage.setItem('data', JSON.stringify(data));
//console.log(myStorage.getItem('data'));
let arr = JSON.parse(myStorage.getItem('data'));
let list = document.getElementById('product-list');
//console.log(arr);

for (let i = 0; i < arr.length; i++) {
  let li = document.createElement('li');
  let product = document.createElement('product-item');

  product.setAttribute('price', (arr[i].price));
  product.setAttribute('title', arr[i].title);
  product.setAttribute('img', arr[i].image);
  product.setAttribute('class', 'product');
  product.setAttribute('id',arr[i].id);

  li.appendChild(product);
  list.appendChild(li);
}

function updateCartNumber(bool,id) {
  let count = document.getElementById('cart-count');
  if (bool) {
    count.innerText = Number(count.innerText) + 1;
    myStorage.setItem(id,'true');
  } else {
    count.innerText = Number(count.innerText) - 1;
    myStorage.removeItem(id);
  }
}
function updateCartAfterRefresh(){
  let count = document.getElementById('cart-count');
  count.innerText = Number(count.innerText) + 1;
}