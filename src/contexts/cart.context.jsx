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

const decrementCartItem = (cartItems, productToRemove) => {
    // if quantity is 0 then remove cart item entirely 


    return cartItems.map((cartItem) => 
        cartItem.id === productToRemove.id
        ? {...cartItem, quantity: cartItem.quantity-1}
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
    totalCartPrice: 0

})






export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartQuantity, setCartQuantity] = useState(0)
    const [totalCartPrice, setTotalCartPrice] = useState(0)

    //Updating cart quantity
    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0)

        const newCartPrice = cartItems.reduce(
            (total, cartItem) => (total + cartItem.price) * cartItem.quantity, 0
        )
        setTotalCartPrice(newCartPrice)
        setCartQuantity(newCartCount)
    }, [cartItems])

    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const decrementItemFromCart = (productToRemove) => {
        setCartItems(decrementCartItem(cartItems, productToRemove))
    }



    const value = {isCartOpen, setIsCartOpen, addItemToCart, decrementItemFromCart ,cartItems, setCartItems, setCartQuantity, cartQuantity, totalCartPrice}

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}


