import Cart from "../components/pages/cart/Cart";
import Checkout from "../components/pages/checkout/Checkout";
import Detail from "../components/pages/detail/Detail";
import Home from "../components/pages/home/Home";
import ItemListContainer from "../components/pages/itemList/ItemListContainer";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },
  {
    id: "shop",
    path: "/shop",
    Element: ItemListContainer,
  },
  {
    id: "detalle",
    path: "/detail/:id",
    Element: Detail,
  },
  {
    id: "cart",
    path: "/cart",
    Element: Cart,
  },
  {
    id: "checkout",
    path: "/checkout",
    Element: Checkout,
  },
 
];
