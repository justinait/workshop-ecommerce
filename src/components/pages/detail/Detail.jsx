import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../../firebaseConfig';
import {getDoc, collection, doc} from "firebase/firestore"
import { CartContext } from '../../../context/CartContext';
import './Detail.css'

function Detail() {


  const {addToCartContext, getQuantityById} = useContext(CartContext)

  const {id} = useParams();
  const [product, setProduct] = useState(null);
  let quantity = getQuantityById(id);
  const [count, setCount] = useState(quantity || 1);


  useEffect(()=>{
    let refCollection = collection(db, 'products')
    let refDoc = doc(refCollection, id);
    getDoc(refDoc)
    .then((res)=>{
      setProduct({...res.data(), id: res.id});
    })
    .catch((err)=>console.log(err))
  }, [id])
  
  function onAdd () {
    if ( product.stock > count ){
      return setCount(count+1);
    }
    else{
      alert('stock maximo')
    }
  }
    
  function onRemove () {
    if( count > 0)   setCount ( count - 1 )
  }

  function addToCart () {
    let obj = {
      ...product,
      quantity: count
    }
    addToCartContext(obj)
  }

  return (
    <div>
      
      {
        product && 
        <div className='detailContainer'>
          <img src={product.image} className='detailImage'/>
          <div className='InfoDetailContainer'>
            <div className='detailTitle'>{product.title}</div>
            <div className='detailPrice'>$ {product.unit_price}</div>
            {
              product?.stock === quantity && <p>no hay mas stock!</p>
            }

            <div className='addCartButtonContainer'>
              
              <div className='itemCountContainer'>
                <button className='buttonCount' onClick={ onRemove }> - </button>
                <p> { count } </p>
                <button className='buttonCount' onClick={ onAdd }> + </button>
              </div>
              <button className="addCartButton" onClick={() => addToCart(count)} > Agregar al carrito </button>
            </div>

          </div>
        </div>
      }
      
    </div>
  )
}

export default Detail