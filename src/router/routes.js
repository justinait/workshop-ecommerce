import Cart from "../components/pages/cart/Cart";
import Checkout from "../components/pages/checkout/Checkout";
import Detail from "../components/pages/detail/Detail";
import ItemListContainer from "../components/pages/itemList/ItemListContainer";
import UserOrders from "../components/pages/userOrders/UserOrders";

export const routes = [
  {
    id: "shop",
    path: "/",
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
  {
    id: "userOrders",
    path: "/user-orders",
    Element: UserOrders,
  },
 
];
