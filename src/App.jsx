import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import CartContextComponent from "./context/CartContext";
import AuthContextComponent from "./context/AuthContext";
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <CartContextComponent>
          <AppRouter />
        </CartContextComponent>
        
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
