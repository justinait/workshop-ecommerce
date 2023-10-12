import {createContext, useState} from "react"

export const CartContext = createContext();

function CartContextComponent({children}) {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) ||[]);

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
            localStorage.setItem("cart", JSON.stringify(newArr))//pisando lo  qhay en el carrito
            setCart(newArr)

        } else {
            localStorage.setItem("cart", JSON.stringify([...cart, product]))//pisando lo  qhay en el carrito
            setCart([...cart, product])
        }
    }

    const getQuantityById = (id) =>{
        let product = cart.find(e=> e.id ===id);
        return product?.quantity;
    }

    const clearCart = ( ) => {
        setCart([]);
        localStorage.removeItem("cart")
    }

    const deleteById = (id) => {
        const newArr = cart.filter(e=> {
            e.id !== id;
        })
        localStorage.setItem("cart", JSON.stringify(newArr))
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