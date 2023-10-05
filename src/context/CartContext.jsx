import {createContext, useState} from "react"

export const CartContext = createContext();

function CartContextComponent({children}) {

    const [cart, setCart] = useState([]);

    const addToCartContext = (product) =>{
        let exist = cart.some(e=> e.id ===product.id)
        if(exist){
            let newArr = cart.map (e =>{
                if(e.id === product.id){
                    return {...e, quantity: product.quantity}
                } else {
                    return e;
                }
            })
            setCart(newArr)

        } else {
            setCart([...cart, product])
        }
    }

    const getQuantityById = (id) =>{
        let product = cart.find(e=> e.id ===id);
        return product?.quantity;
    }

    let data={
        cart,
        addToCartContext,
        getQuantityById
    }

  return (
    <CartContext.Provider value={data}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextComponent