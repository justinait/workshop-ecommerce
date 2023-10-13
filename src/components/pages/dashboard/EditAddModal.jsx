import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { db, uploadFile } from '../../../firebaseConfig';
import {addDoc, collection} from "firebase/firestore"

function EditAddModal({product, handleClose, setIsChange}) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    

  const [newProduct, setNewProduct] = useState({
    title:"",
    unit_price:0,
    stock:0,
    image:"",
    category:""
  })
  const [file, setFile] = useState(null);

  const handleImage = async () => {
    setIsLoading(true);
    let url = await uploadFile(file);
    setNewProduct({...newProduct, image:url})
    setIsLoading(false);
  }
  const handleChange = (e) => {
    setNewProduct({...newProduct, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      ...newProduct,
      unit_price: +newProduct.unit_price,
      stock: +newProduct.stock
    }
    const productsCollection = collection(db, "products")
    addDoc(productsCollection, obj).then(()=> {
      setIsChange(true);
      handleClose();
    })
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         
        <form className="form">
          <div className="input">
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Nombre"
              className="input"
            />
          </div>
          <div className="input">
            <input
              type="number"
              name="stock"
              onChange={handleChange}
              placeholder="Stock"
              className="input"
            />
          </div>
          <div className="input">
            <input
              type="number"
              name="unit_price"
              onChange={handleChange}
              placeholder="Precio"
              className="input"
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="category"
              onChange={handleChange}
              placeholder="Categoria"
              className="input"
            />
          </div>

          <div className="input">
            <input
              type="file"
              name="image"
              onChange={(e)=>setFile(e.target.files[0])}
              placeholder="Imagen"
              className="input"
            />
          </div>
          {
            file &&
            <button type='button' onClick={handleImage}>Confirmar imagen</button>
          }

        </form>
         
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        
        {
          file && !isLoading && <Button type='submit' onClick={handleSubmit} variant="primary">Guardar</Button>
        }
        
    </Modal.Footer>
    </>
  );
}

export default EditAddModal;