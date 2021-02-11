// product-item.js

class ProductItem extends HTMLElement {
  static get observedAttributes() {
    return ['price', 'title','img'];
  }

  constructor(arr){
    super();
  }
  connectedCallback(){
    let shadow = this.attachShadow({mode: 'open'});

    const img = document.createElement('img');
    const price = document.createElement('p');
    const title = document.createElement('p');
    const button = document.createElement('button');

    img.setAttribute('class',"img");
    price.setAttribute('class','price');
    title.setAttribute('class','title');
    button.setAttribute('class','button');

    img.src = this.getAttribute('img');
    price.innerText = this.getAttribute('price');
    title.innerText = this.getAttribute('title');
    
    if(myStorage.getItem(this.getAttribute('id')) == "true"){
      button.innerText = "Remove from Cart";
      updateCartAfterRefresh();
    }else{
      button.innerText = 'Add to cart';
    }

    button.addEventListener('click', () => {
      if(button.innerText == "Add to cart"){
        button.innerText = "Remove from Cart";
        updateCartNumber(true,this.getAttribute('id'));
      }else{
        button.innerText = "Add to cart";
        updateCartNumber(false,this.getAttribute('id'));
      }
    })
    //button.setAttribute('onclick',"alert('Added to Cart!')");
    let style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
     img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }    
    `;
    shadow.appendChild(img);
    shadow.appendChild(price);
    shadow.appendChild(title);
    shadow.appendChild(button);
    shadow.appendChild(style);
    
  }
}

customElements.define('product-item', ProductItem);


