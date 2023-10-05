import React, { useContext } from 'react'
import { CartContext } from '../../../context/CartContext';

function Cart() {

    const {cart, clearCart, deleteById, getTotalPrice} = useContext(CartContext);

    let total = getTotalPrice();

  return (
    <div>
        <p>Cart</p>
        <button onClick={clearCart}>Limpiar carrito</button>
        {
            cart.map(e=>{
                return (
                    <div key={e.id}>
                        <p>{e.title}</p>
                        <p>{e.quantity}</p>
                        <button onClick={()=>deleteById(e.id)}>eliminar</button>
                    </div>
                )
            })
        }
        <p>total a pagar: ${total}</p>
    </div>
  )
}

export default Cart