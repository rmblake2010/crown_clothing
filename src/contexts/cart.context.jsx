import { createContext, useState, useEffect } from "react";



const addCartItem = (cartItems, productToAdd) => {
    //find if cart items contains a product to add
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    //if found , increment quantity
    if(existingCartItem){
        
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ?  {...cartItem, quantity: cartItem.quantity+1}
            : cartItem
        )
    }
    //return new array with modified cart items / new cart items    
    
    return [...cartItems, {...productToAdd, quantity: 1},]
}

const removeCartItem = (cartItems, productToRemove) => {
    // if quantity is 0 then remove cart item entirely 



    return cartItems.map((cartItem) => 
        cartItem.id === productToRemove.id
        ? {...cartItem, quantity: cartItem.quantity-1}
        : productToRemove.quantity === 0 
        ? {}
        : cartItem
    )

    //returning new array with modified cart items / removed quantity of cart items
    
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartQuantity: 0,

})






export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartQuantity, setCartQuantity] = useState(0)

    //Updating cart quantity
    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0)
        setCartQuantity(newCartCount)
    }, [cartItems])

    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const decrementItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, decrementItemFromCart ,cartItems, setCartItems, setCartQuantity, cartQuantity}

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}


