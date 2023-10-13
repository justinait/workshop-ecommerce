import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../../../firebaseConfig';
import {deleteDoc, doc} from "firebase/firestore"
import EditAddModal from './EditAddModal';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditIcon from '@mui/icons-material/Edit';

function ProductsList({products, setIsChange}) {

    const [productSelected, setProductSelected] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleOpen = (product) => {
        handleShow();
        setProductSelected(product);
    }
  
    const deleteProduct = (id) => {
        deleteDoc(doc(db, "products", id));
        setIsChange(true);
    }
    const addProduct = () => {
        handleShow();
    }

  return (
    <div>
        <button onClick={()=>handleOpen(null)}>Agregar Nuevo Producto</button>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Imagen</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                {/* 7 */}
                </tr>
            </thead>
            <tbody>
                {products.map((e, i)=>{
                    return (
                        <tr key={e.id}>
                            <td> {i+1} </td>
                            <td>{e.title}</td>
                            <td>{e.unit_price}</td>
                            <td><img src={e.image} width={80} alt={e.title} /></td>
                            <td>{e.stock}</td>
                            <td>
                                <button onClick={()=> handleOpen(e) }> <EditIcon/> Editar</button>
                                <button onClick={()=>deleteProduct(e.id)}> <DeleteIcon/> Eliminar</button>
                            </td>

                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                                >
                                <EditAddModal handleClose={handleClose} setIsChange={setIsChange} productSelected={productSelected} setProductSelected={setProductSelected} />
                                
                            </Modal>
                        </tr>
                    )
                })}
                    

            </tbody>
        </table>
    </div>
  )
}

export default ProductsList