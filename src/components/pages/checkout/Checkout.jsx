import React, { useContext, useState } from 'react'
import { CartContext } from '../../../context/CartContext'
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from 'axios'

function Checkout() {

    const {cart} = useContext(CartContext)
    initMercadoPago("APP_USR-9cd33c8c-34a3-4056-832b-08adca935b08",
    {locale:"es-AR"})

    const [preferenceId, setPreferenceId] = useState(null)

    const createPreference = async () => {
      const newArray = cart.map ( e=>{
        return {
          title: e.title,
          unit_price: +e.unit_price,
          quantity: e.quantity
        }
        //solo mandamos las props del producto q necesitamos p comrpar
      })

      try {        
        let response = await axios.post(
          "http://localhost:8080/create_preference", 
          {
            items: newArray ,
            shipment_cost: 10,
          }
        );
        console.log('preference');
        console.log(response.data);
        const {id} = response.data
        return id;
      } catch (error) {
        console.log(error);
      } 
    }
    const handleBuy = async () => {
      try {
        console.log('buy');
        const id = await createPreference();
        if (id) {
          setPreferenceId(id);
          console.log('anda');
        }
      } catch (error) {
        console.error(error);
      }
    }
  return (
    <div>
      <button onClick={handleBuy}>seleccionar metodo de pago</button>

      {
        preferenceId  && 
        <Wallet initialization={{preferenceId, redirectMode:"modal"}}/>
      }
    </div>
  )
}

export default Checkout