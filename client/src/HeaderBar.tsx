import { Link, Route, Routes } from "react-router-dom"
import "./HeaderBar.css"
import CartPage from "./CartPage"

function HeaderBar() {


    return (
        <header className="inconsolata-default">
            <h1>Example e-commerce functionality</h1>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>

        </header>
    )
}

export default HeaderBar