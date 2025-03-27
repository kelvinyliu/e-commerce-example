import { useEffect, useState } from 'react'
import './ShopItem.css'

function ShopItem({id, name, price, description, image, handleClick}: {id:number, name:string, price:number, description:string, image:string, handleClick: (id: number, quantity: number, price: number, name: string) => void}) {

    const [itemQuantity, setItemQuantity] = useState(0);


    function handleAddToCartClick() {
        if (Number.isNaN(itemQuantity) || itemQuantity <= 0) {
            alert("...")
        } else {
            handleClick(id, itemQuantity, price, name)
        }
    }

    return(
        <>
        <div className="shop-item">
            <img src={image} alt="" />
            <h1 className="shop-item-name">{name}</h1>
            <p className="shop-item-description">{description}</p>
            <div className="item-quantity-selection">
                <h2>{price}</h2>
                <label htmlFor="i-quantity">Quantity:</label>
                <input type="number" name="i-quantity" id="item-quantity" onChange={e => setItemQuantity(Number.parseInt(e.target.value))} />
                <input type="button" value="Add to cart" onClick={handleAddToCartClick}/>
            </div>
        </div>
        </>
    )
}

export default ShopItem