import { Link, Route, Routes } from "react-router-dom"
import "./HeaderBar.css"
import { useState } from "react"
import { ShoppingCartItem } from "./ShoppingCartItem";

function HeaderBar() {
    const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>(() => {
        const previousCart = localStorage.getItem("exampleShoppingCart")
        return previousCart ? JSON.parse(previousCart) : []
    });
    const [showingHoverCart, setHoverState] = useState<boolean>(false)

    return (
        <>
            <header className="inconsolata-default">
                <h1>Example e-commerce functionality</h1>
                <div id="links-holder">
                    <Link to="/">Home</Link>
                    <Link to="/cart"
                        onMouseEnter={() => {
                            const cart = localStorage.getItem("exampleShoppingCart")
                            
                            setShoppingCart(cart ? JSON.parse(cart) : [])
                            setHoverState(true)
                        }}
                        onMouseLeave={() => setHoverState(false)}>Cart</Link>
                </div>
            </header>
            {showingHoverCart ? (
                <div className="cart-preview">
                    {shoppingCart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <ul>
                            {shoppingCart.map((item) => (
                                <li key={item.id}>
                                    {item.name} x {item.quantity} - {(item.price * item.quantity).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : null}
        </>
    )
}

export default HeaderBar