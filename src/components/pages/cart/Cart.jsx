import React, { useContext } from 'react'
import { CartContext } from '../../../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {

    const {cart, clearCart, deleteById, getTotalPrice} = useContext(CartContext);

    let total = getTotalPrice();

  return (
    <div>
        <h4>Carrito de compras</h4>
        {
            total >= 1 &&
            <Link to='/checkout'>Finalizar compra</Link>
        }
        
        {
            cart.map(e=>{
                return (
                    <div key={e.id}>
                        <p>{e.title}</p>
                        <p>{e.quantity}</p>
                        <button onClick={()=>deleteById(e.id)}>Eliminar</button>
                    </div>
                )
            })
        }

        <p>total a pagar: ${total}</p>

        <button onClick={clearCart}>Limpiar carrito</button>
        
    </div>
  )
}

export default Cart