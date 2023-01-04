import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"

import './checkout.styles.scss'


/*
I need:
cart context
cart items
quantity
adjust quantity



ability to remove items



total price
*/

const HEADERS = ['Product', 'Description', 'Quantity', 'Price', 'Remove']

const Checkout = () => {
    const { cartItems, decrementItemFromCart, addItemToCart  } = useContext(CartContext)
    
    



  return(
    <div className="checkout-container">
        <div className="checkout-header">
            {HEADERS.map((header) => {
                return(
                    <h3>{header}</h3>
                )
            })}
        </div>
        <hr/>
        {cartItems.map((item) => {
            const {id, imageUrl, name, quantity, price} = item

            const reduceQuantity = () => {
                decrementItemFromCart(item)
            }

            const increaseQuantity = () => {
                addItemToCart(item)
            }


            return(
                <div >
                    <div key={id} className="checkout-item-container">
                        <img src={imageUrl} alt={`${name}`}/>
                        <h3>{name}</h3>
                         <div className="quantity-container">  
                            <button onClick={reduceQuantity}>-</button> 
                            <h4>{quantity}</h4>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <h4>{price}</h4>
                        <button> remove</button>    
                    </div>
                <hr/>
                </div>
            )
        })}
        
        
        
    </div>
  )
}

export default Checkout