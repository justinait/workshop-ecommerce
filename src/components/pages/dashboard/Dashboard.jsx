import React, { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig';
import {collection, getDocs, updateDoc, doc} from "firebase/firestore"
import ProductsList from './ProductsList';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Dashboard() {

  const [isChange, setIsChange] = useState(false)
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [shipmentCost, setShipmentCost] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const updateShipment =async ()=> {
    updateDoc(doc(db, "shipment", "EfhZARxa8HUjxp542yyP"), {cost: shipmentCost});
    handleClose();
  }
  
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
      <button onClick={handleShow}>Modificar costo de envio</button>
      
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title>Costo de envio</Modal.Title>
        </Modal.Header>
        <input type="text" name='cost' onChange={(e)=>setShipmentCost(+e.target.value)} />
        <button onClick={updateShipment}>modificar</button>
      </Modal>
    </div>
  )
}

export default Dashboard