import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../../firebaseConfig';
import {getDoc, collection, doc} from "firebase/firestore"
import { CartContext } from '../../../context/CartContext';

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

      <div>Detail</div>
      {
        product && 
        <div>
          <img src={product.image}/>
        </div>
      }
      {
        product?.stock === quantity && <p>no hya mas stock!</p>
      }
      <div>
        <div className='ItemCountContainer'>
            <button onClick={ onAdd }> + </button>
            <p> { count } </p>
            <button onClick={ onRemove }> - </button>
        </div>
        <button variant="outline-dark" onClick={() => addToCart(count)} className='cartButton'> Agregar al carrito </button>
            
        </div>
    </div>
  )
}

export default Detail