import ShopItem from "./ShopItem.tsx";
import './App.css'
import { useEffect, useState } from "react";
import { ShoppingCartItem } from "./ShoppingCartItem.tsx";


function App() {

  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>(() => {
    const previousCart = localStorage.getItem("exampleShoppingCart")
    return previousCart ? JSON.parse(previousCart) : []
  });

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
        return [...prevCart, { id, quantity: quantity, price, name }]
      }
    });
  }

  useEffect(() => {
    localStorage.setItem("exampleShoppingCart", JSON.stringify(shoppingCart))
  }, [shoppingCart])

  return (
    <>
      <div id="shopping-cart">
        <ShopItem id={23} 
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis delectus error ad dignissimos, voluptate deleniti facere labore at tempora est soluta culpa debitis maiores laudantium nulla maxime in, neque molestias." 
        name="Lorem" 
        price={25.58} 
        image=""
        handleClick={addToCart}></ShopItem>

        <ShopItem id={2} 
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis delectus error ad dignissimos, voluptate deleniti facere labore at tempora est soluta culpa debitis maiores laudantium nulla maxime in, neque molestias." 
        name="Lorem2" 
        price={5.99} 
        image=""
        handleClick={addToCart}></ShopItem>
      </div>

      <div id="cart">
        <h2>Shopping Cart</h2>
        {shoppingCart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
          <ul>
            {shoppingCart.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
          <h1>Total: {shoppingCart.reduce((sum, current) => sum += current.quantity * current.price, 0).toFixed(2)}</h1>
          </>
        )}
      </div>
    </>
  )
}

export default App
