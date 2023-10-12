import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../context/CartContext'
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom';
import { db } from '../../../firebaseConfig';
import {addDoc, collection, doc, updateDoc, serverTimestamp} from "firebase/firestore"

function Checkout() {

  const {cart, getTotalPrice, clearCart} = useContext(CartContext)
  initMercadoPago(import.meta.env.VITE_PUBLICKEY,
  {locale:"es-AR"})

  const [shipmentCost, setShipmentCost] = useState(0);
  const [preferenceId, setPreferenceId] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    cp: "",
    phone: ""
  })

  const [orderId, setOrderId] = useState(null)
  
  //una vez realizado el pago la url vuelve distinta, es lo q estoy recuperando
  const location = useLocation();
  const queryParams = new URLSearchParams(location);
  const paramValue = queryParams.get("status");//aproved o rejected

  useEffect(()=>{
    //guardamos la orden en fb y descontar stock
    let order = JSON.parse(localStorage.getItem("order"));
    if(paramValue === "approved"){
      let ordersCollections = collection(db, "orders");
      addDoc(ordersCollections, {
        ...order,
        date: serverTimestamp()
      }).then(res=>{
        setOrderId(res.id)
      })

      order.item.foreach((e)=>{
        updateDoc(doc(db, "products", e.id), {stock: e.stock - e.quantity})
      })

      localStorage.removeItem("order");
      clearCart();
    }

  }, [paramValue])

  useEffect(()=>{
    let shipmentCollection = collection(db, "shipment");
    let shipmentDoc = doc(shipmentCollection, "EfhZARxa8HUjxp542yyP");
    getDoc(shipmentDoc).then(res=> {
      setShipmentCost(res.data().cost);
    })
  }, [])

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }
  // let total = getTotalPrice();
  
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
    let order = {
      email: userData.email,
      cp: userData.cp,
      phone: userData.phone,
      items: cart,
      total: getTotalPrice + shipmentCost
    }
    localStorage.setItem("order", JSON.stringify(order))
    try {
      const id = await createPreference();
      if (id) {        setPreferenceId(id);      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      { !orderId ? <>
      
        <form className="form">
          <div className="input">
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="input"
            />
          </div>
          <div className="input">
            <input
              type="number"
              name="cp"
              onChange={handleChange}
              placeholder="Código Postal"
              className="input"
            />
          </div>
          <div className="input">
            <input
              type="number"
              name="phone"
              onChange={handleChange}
              placeholder="Número de Celular"
              className="input"
            />
          </div>
        </form>

        <button onClick={handleBuy}>Seleccionar metodo de pago</button>

        {
          preferenceId  && 
          <Wallet initialization={{preferenceId, redirectMode:"modal"}}/>
        }
      </> :
      <>
        <p>el pago se realizo con exito</p>
        <p>order id {orderId}</p>
        <Link to="/shop">seguir comprando </Link>
      </>

      }
    </div>
  )
}

export default Checkout