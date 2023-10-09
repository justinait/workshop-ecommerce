import React, { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import {getDocs, collection} from "firebase/firestore"
import { Link } from 'react-router-dom';
import './ItemList.css'

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
        <h1>Nuestros Productos</h1>
        <div className='itemListContainer'>
        {
            products.map(e=>{
                return(
                    <Link to={`/detail/${e.id}`} key={e.id}  className='itemContainer'>
                        <div>
                            <img src={e.image} alt={e.title} />
                            <p className='titleItemList'>{e.title}</p>
                            <p className='priceItemList'>$ {e.unit_price}</p>
                        </div>
                    </Link>
                )
            })
        }

        </div>
    </div>
  )
}

export default ItemListContainer