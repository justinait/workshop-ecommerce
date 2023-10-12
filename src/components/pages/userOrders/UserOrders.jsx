import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig';
import {getDocs, collection, query, where} from "firebase/firestore"
import { AuthContext } from '../../../context/AuthContext';


function UserOrders() {

    const [myOrders, setMyOrders] =useState([]);
    const {user} = useContext(AuthContext);
    
    useEffect(()=> {

      const ordersCollections =collection(db, "orders");
      let ordersFiltered = query(ordersCollections, where("email", "==", user.email))
      getDocs(ordersFiltered).then(res=>{
        const newArr = res.docs.map(e => {
          return {...e.data(), id: e.id}
        });
        setMyOrders(newArr);
      }).catch(error => console.log(error));

    }, [user.email])

  return (
    <div>
      <div>UserOrders</div>
      
      {
        myOrders.map(order=> {
          return <div key={order.id}>
            {
              order.items?.map(e=>{
                return (
                  <div key={e.id}>
                    <p>{e.title}</p>
                    <p>{e.quantity}</p>
                    <p>{e.unit_price}</p>
                    
                  </div>
                )
              })
            }

            <p>el total: {order.total}</p>
          </div>
        })
      }

    </div>
  )
}

export default UserOrders