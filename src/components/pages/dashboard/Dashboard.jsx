import React, { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig';
import {collection, getDocs} from "firebase/firestore"
import ProductsList from './ProductsList';

function Dashboard() {

  const [isChange, setIsChange] = useState(false)
  const [products, setProducts] = useState([]);
  
  useEffect(()=> {
    setIsChange(false)
    let productsCollection = collection(db, "products");
    getDocs(productsCollection).then(res =>{
      let newArr = res.docs.map(product=>{
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(newArr)
    })
  }, [isChange])
  
  return (
    <div>
      Dashboard de Administrador
      <ProductsList products={products} setIsChange={setIsChange} />
    </div>
  )
}

export default Dashboard