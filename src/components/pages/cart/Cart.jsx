import React, { useContext } from 'react'
import { CartContext } from '../../../context/CartContext';

function Cart() {

    const {cart} = useContext(CartContext);

  return (
    <div>Cart

        {
            cart.map(e=>{
                return (
                    <div key={e.id}>
                        <p>{e.title}</p>
                        <p>{e.quantity}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Cart