import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { menuItems } from "../../../router/navigation";
import { onLogOut } from "../../../firebaseConfig";
import { AuthContext } from "../../../context/AuthContext";


function Navbar(props) {
  
  const {handleLogoutAuth, user} = useContext(AuthContext);
  
  const { window } = props;
  let navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogOut = () => {
    onLogOut();
    handleLogoutAuth()
    navigate('/login')
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = ()=> {
    setMobileOpen(false);
  }

  const drawer = (
    <div className="drawer">
      <div className="toolbar" />

      <ul>
        {menuItems.map(({ id, path, title, Icon }) => {
          return (
            <li key={id}>
              <Link to={path} onClick={handleDrawerClose}>
                <div className="listItem">
                  {Icon && <Icon className="listItemIcon" />}
                  <span className="listItemText">{title}</span>
                </div>
              </Link>
            </li>
          );
        })}
        {/* dashboard */}
        {
          user.rol === import.meta.env.VITE_ROLADMIN &&
          <li>
            <Link to={"/dashboard"}>
              <div className="listItem">
                <DashboardIcon className="listItemIcon"/>
                <span className="listItemText">{"Dashboard"}</span>
              </div>
            </Link>
          </li>
        }

        <li>
          <div className="listItem">
            <LogoutIcon className="listItemIcon"  />
            <span className="listItemText" onClick={handleLogOut}>Cerrar sesión</span>
          </div>
        </li>
      </ul>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="navbar">
      <div className="appBar">
        <div className="toolbar">
          <Link to="/" className="appTitle">
            Cora Cuadernos
          </Link>
          <button className="menuButton button" onClick={handleDrawerToggle}>
            <MenuIcon className="burgerMenuIcon" />
          </button>
        </div>
      </div>
      <div className="navDrawer">
        <div className="drawerContainer" ref={container}>
          {
            mobileOpen ? drawer : ''
          }
        </div>
      </div>
      <div className="mainContent">
        <div className="toolbar" />
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
