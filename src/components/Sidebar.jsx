import React, { useState } from "react";
import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  People as PeopleIcon,
  Inventory2 as Inventory2Icon,
  Settings as SettingsIcon,
  HelpOutline as HelpOutlineIcon,
  Logout as LogoutIcon,
  WorkOutline,
  History,
  Approval,
  ManageAccounts,
  Assessment,
  Shield,
  ExpandLess,
  ExpandMore,
  Visibility,
  Home
} from "@mui/icons-material";

/**
 * @param {boolean} isOpen - Indica si el sidebar está abierto o cerrado (para Drawer).
 * @param {function} onToggle - Función para alternar isOpen.
 * @param {function} onLogout - Función que llama a logout() del AuthContext.
 */
const Sidebar = ({ isOpen, onToggle, onLogout }) => {
  //const { allowedRoutes } = useAuth();

  const menuItems = [
    {
      icon: <Home sx={{ color: "#00A8C7" }} />,
      text: "Inicio",
      to: "/",
    },
    {
      icon: <Visibility sx={{ color: "#00A8C7" }} />,
      text: "Evaluación Ocular",
      to: "/evaluacion-ocular",
    },
    {
      icon: <History sx={{ color: "#00A8C7" }} />,
      text: "Historial evaluaciones",
      to: "/historial-solicitudes",
    }
  ];

  const NestedMenuItem = ({ item }) => {

    const hasChildren = item.menuItems && item.menuItems.length > 0;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      if (hasChildren) {
        setOpen((prev) => !prev);
      }
    };

    return (
      <>
        <ListItemButton
          onClick={handleClick}
          component={hasChildren ? "div" : Link}
          to={hasChildren ? undefined : item.to}
          sx={{
            pl: 2,
            "&:hover": {
              backgroundColor: "rgba(0, 44, 119, 0.1)",
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} sx={{ color: "#002C77" }} />
          {hasChildren ? open ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItemButton>
        {hasChildren && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.menuItems.map((child, index) => (
                <NestedMenuItem
                  key={index}
                  item={child}
                />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={isOpen}
      onClose={onToggle}
      sx={{
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          backgroundColor: "#FFFFFF",
          color: "#002C77",
          borderRight: "1px solid #E0E0E0",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <div className="px-4  py-2 text-xl font-bold text-[#002C77] flex" style={{ justifyContent: "center" }}>
        <img
          src="/logo-pucp-primary.svg"
          alt="PUCP Logo"
          className="h-12 mb-0 object-contain mt-2"
        />
      </div>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <NestedMenuItem key={index} item={item} />
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton
          onClick={onLogout}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(0, 44, 119, 0.1)",
            },
            mt: "auto", // Esto empujará el botón de cerrar sesión hacia abajo
          }}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: "#00A8C7" }} />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" sx={{ color: "#002C77" }} />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
