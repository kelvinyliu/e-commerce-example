import ShopItem from "./ShopItem.tsx";
import './App.css'
import { useEffect, useState } from "react";
import axios from 'axios';
import { ShoppingCartItem } from "./ShoppingCartItem.tsx";
// import { exampleShopItems } from "./exampleShopItems.tsx";
import { Product } from "./Product.tsx";


function App() {

  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>(() => {
    const previousCart = localStorage.getItem("exampleShoppingCart")
    return previousCart ? JSON.parse(previousCart) : []
  });

  const [shopProducts, setShopProducts] = useState<Product[]>([]);
  const [notification, setNotification] = useState<string | null>(null);


  function addToCart(id: number, quantity: number, price: number, name: string) {
    setShoppingCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id)
      if (existingItem) {
        // if item in cart
        return prevCart.map(item =>
          item.id === id ? { id, quantity: item.quantity + quantity, price, name } : item
        )
      } else {
        // new item to cart
        return [...prevCart, { id, quantity, price, name }]
      }
    });

    setNotification(`${quantity} ${name} added to cart!`);
    // auto remove notification after 1.5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 1500);
  }

  // updates local storage on shopping cart change
  useEffect(() => {
    localStorage.setItem("exampleShoppingCart", JSON.stringify(shoppingCart))
  }, [shoppingCart])

  // fetches products from api
  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get('http://localhost:5000/api/products')
      console.log(response)
      setShopProducts(JSON.parse(response.data))
    }
    getProducts()
  }, [])

  return (
    <>
      {/* Load products */}
      <div id="shopping-cart" className="inconsolata-default">
        {
          shopProducts.map((item) => (
            <ShopItem
              id={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
              handleClick={addToCart} />
          ))
        }
      </div>

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

    </>
  )
}

export default App
