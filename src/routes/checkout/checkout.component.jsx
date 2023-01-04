import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"

import './checkout.styles.scss'


const HEADERS = ['Product', 'Description', 'Quantity', 'Price', 'Remove']

const Checkout = () => {
    const { cartItems, decrementItemFromCart, addItemToCart, setCartItems, totalCartPrice } = useContext(CartContext)
    
    



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
                if(item.quantity === 0 ){
                    const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id) 
                    setCartItems(newCartItems)
                }else{
                    decrementItemFromCart(item)
                }
            }

            const increaseQuantity = () => {
                addItemToCart(item)
            }

            const deleteButton = () => {
                const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id) 
                setCartItems(newCartItems)
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
                        <h4>{price * quantity}</h4>
                        <button onClick={deleteButton}> remove</button>    
                    </div>
                <hr/>              
                </div>
            )
        })}
        
        
        <h2>{`Price total: $${totalCartPrice}`}</h2>
    </div>
  )
}

export default Checkout