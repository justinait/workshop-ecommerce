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

    const clearCart = ( ) => {
        setCart([]);
    }

    const deleteById = (id) => {
        const newArr = cart.filter(e=> {
            e.id !== id;
        })
        setCart(newArr);
    }
    
    const getTotalPrice = ()=> {
        const total = cart.reduce((acc, e)=>{
            return acc + (e.unit_price * e.quantity);
        }, 0)
        // al ser un arreglo de numeros no pasa nada pero si es de OBJETOS como este hay q poner 0
        return total;
    }


    let data={
        cart,
        addToCartContext,
        getQuantityById,
        clearCart,
        deleteById,
        getTotalPrice
    }

  return (
    <CartContext.Provider value={data}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextComponent