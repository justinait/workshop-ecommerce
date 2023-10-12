import React, { useContext } from 'react'
import { CartContext } from '../../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css'

function Cart() {

    const {cart, clearCart, deleteById, getTotalPrice} = useContext(CartContext);

    let total = getTotalPrice();

  return (

    <div>
        <h2>Mi Carrito</h2>
        {
            total >= 1 &&
            <button className='buttonHover'>
                <Link to='/checkout'>Finalizar compra</Link>
            </button>
            
        }
        
        {
            cart.map(e=>{
                return (
                    <div key={e.id} className='cartProduct'>
                        <p>{e.title}</p>
                        <img src={e.image} alt={e.title} width={100}/>
                        <p>{e.quantity}</p>
                        <button className='buttonHover' onClick={()=>deleteById(e.id)}>Eliminar</button>
                    </div>
                )
            })
        }

        <p>total a pagar: ${total}</p>

        <button className='buttonHover' onClick={clearCart}>Limpiar carrito</button>
        
    </div>
  )
}

export default Cart