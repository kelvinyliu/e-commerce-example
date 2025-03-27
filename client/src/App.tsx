import ShopItem from "./ShopItem.tsx";
import './App.css'
import { useEffect, useState } from "react";
import { ShoppingCartItem } from "./ShoppingCartItem.tsx";
import { exampleShopItems } from "./exampleShopItems.tsx";


function App() {

  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>(() => {
    const previousCart = localStorage.getItem("exampleShoppingCart")
    return previousCart ? JSON.parse(previousCart) : []
  });

  const [removeQuantityPerID, setRemoveQuantityForID] = useState<{[id: number]: number}>({});

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
  }

  function removeFromCart(id: number, quantity: number): void {
    const item = shoppingCart.find(item => item.id === id)

    // if item does not exist
    if (!item) {
      alert("Tried to remove item which does not exist in cart?")
      return;
    };

    // if quantity is incorrect (less than 0 or more than quantity of item)
    if (quantity < 0 || quantity > item.quantity) {
      alert("Incorrect quantity to remove from item in cart...")
      return;
    }

    // if item quantity = remove quantity, remove entirely from cart
    if (item.quantity === quantity) {
      setShoppingCart(shoppingCart.filter(item => item.id !== id))
    } else {
      // subtract from cart if not entirely.
      setShoppingCart(shoppingCart.map(item => 
        item.id === id ? {...item, quantity: item.quantity - quantity} : item
      ))
    }
  }

  function changeIDRemoveQuantity(id: number, value: number): void {
    setRemoveQuantityForID(previous => ({...previous, [id]: value}))
  }

  // updates local storage on shopping cart change
  useEffect(() => {
    localStorage.setItem("exampleShoppingCart", JSON.stringify(shoppingCart))
  }, [shoppingCart])

  return (
    <>
      <div id="shopping-cart" className="inconsolata-default">
        {
          exampleShopItems.map((item) => (
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
                <input type="number" name="cart-remove-quantity" id="cart-remove-quantity" min={1} max={item.quantity} onChange={(e) => changeIDRemoveQuantity(item.id, Number.parseInt(e.target.value))}/>
                <input type="button" value="Remove" onClick={()=> removeFromCart(item.id, removeQuantityPerID[item.id])} />
              </li>
            ))}
          </ul>
          <h1>Total: {shoppingCart.reduce((sum, current) => sum += current.quantity * current.price, 0).toFixed(2)}</h1>
          </>
        )}
        <input type="button" value="Checkout" />
      </div>
    </>
  )
}

export default App
