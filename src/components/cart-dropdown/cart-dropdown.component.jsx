import './cart-dropdown.styles.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import CartItem from '../cart-item/cart-item.component'
import Button from '../button/button.component'

const CartDropDown = () => {
    const { cartItems } = useContext(CartContext)

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                { cartItems.map((item) => ( 
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Link to='/checkout'>
                <Button>CHECKOUT</Button>
            </Link>
        </div>
    )
}

export default CartDropDown