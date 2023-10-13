import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { db, uploadFile } from '../../../firebaseConfig';
import {addDoc, collection} from "firebase/firestore"

function EditAddModal({handleClose, setIsChange, productSelected, setProductSelected}) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    
  // const []
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

    if(productSelected) {
      setProductSelected({
        ...productSelected, image: url
      })
    } else {
      setNewProduct({...newProduct, image: url})
    }

    setIsLoading(false);
  }
   
  const handleChange = (e) => {
    if(productSelected) {
      setProductSelected({
        ...productSelected,  [e.target.name]: e.target.value
      })
    } else {
      setNewProduct({...newProduct, [e.target.name]: e.target.value})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const productsCollection = collection(db, "products")
    
    if(productSelected){
      let obj = {
        ...productSelected,
        unit_price: +productSelected.unit_price,
        stock: +productSelected.stock
      }

      updateDoc(doc(productsCollection, productSelected.id), obj).then(()=>{
        setIsChange(true);
        handleClose();
      })
      
    } else{
      let obj = {
        ...newProduct,
        unit_price: +newProduct.unit_price,
        stock: +newProduct.stock
      }
      addDoc(productsCollection, obj).then(()=> {
        setIsChange(true);
        handleClose();
      })

    }
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{productSelected?.title}</Modal.Title>
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
              defaultValue={productSelected?.title}
            />
          </div>
          <div className="input">
            <input
              type="number"
              name="stock"
              onChange={handleChange}
              placeholder="Stock"
              className="input"
              defaultValue={productSelected?.stock}
            />
          </div>
          <div className="input">
            <input
              type="number"
              name="unit_price"
              onChange={handleChange}
              placeholder="Precio"
              className="input"
              defaultValue={productSelected?.unit_price}
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="category"
              onChange={handleChange}
              placeholder="Categoria"
              className="input"
              defaultValue={productSelected?.category}
            />
          </div>

          <div className="input">
            <input
              type="file"
              // name="image"
              onChange={(e)=>setFile(e.target.files[0])}
              // placeholder="Imagen"
              className="input"
              // defaultValue={productSelected?.image}
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