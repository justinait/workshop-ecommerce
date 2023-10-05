import React, { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import {getDocs, collection} from "firebase/firestore"
import { Link } from 'react-router-dom';

function ItemListContainer() {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        let refCollection = collection(db, 'products')
        getDocs(refCollection)
        .then((res)=>{
            let newArray = res.docs.map(e =>{
                return {
                    ...e.data(), 
                    id: e.id
                }
            })
            setProducts(newArray);
        })
        .catch((err)=>console.log(err))
    }, [])

  return (
    <div>
        <h1>shop</h1>
        {
            products.map(e=>{
                return(
                    <Link to={`/detail/${e.id}`}>
                        <div key={e.id}>
                            <img src={e.image} width='200' alt={e.title} />
                            <p>{e.title}</p>
                            <p>$ {e.unit_price}</p>
                            <p>{e.stock}</p>
                        </div>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default ItemListContainer