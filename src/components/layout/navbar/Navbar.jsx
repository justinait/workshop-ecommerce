import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { menuItems } from "../../../router/navigation";


function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="drawer">
      <div className="toolbar" />

      <ul>
        {menuItems.map(({ id, path, title, Icon }) => {
          return (
            <li key={id}>
              <Link to={path}>
                <div className="listItem">
                  {Icon && <Icon className="listItemIcon" />}
                  <span className="listItemText">{title}</span>
                </div>
              </Link>
            </li>
          );
        })}

        <li>
          <div className="listItem">
            <LogoutIcon className="listItemIcon" />
            <span className="listItemText">Cerrar sesión</span>
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
          <button className="menuButton" onClick={handleDrawerToggle}>
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
