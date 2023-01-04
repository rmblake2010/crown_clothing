import './cart-icon.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'


const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartQuantity  } = useContext(CartContext)

    // Sets inverse
    const toggleCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <div className='cart-icon-container' onClick={toggleCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartQuantity}</span>
        </div>
    )
}

export default CartIcon