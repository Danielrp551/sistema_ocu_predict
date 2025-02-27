import { useState,React } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

/**
 * @param {function} onToggleSidebar - Llamado al hacer clic en el ícono del menú para abrir/cerrar el Sidebar.
 * @param {function} onLogout - Llamado cuando el usuario hace clic en "Cerrar sesión".
 * @param {string}   userName - Nombre del usuario (opcional, si quieres mostrarlo).
 */
const Header = ({ userName, onToggleSidebar, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#002C77' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={onToggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#FFFFFF' }}>
          Sistema OcuPredict
        </Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenMenu}
          color="inherit"
        >
          <Avatar alt={userName} sx={{ bgcolor: '#00A8C7', color: '#FFFFFF' }}>
            {userName.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          PaperProps={{
            sx: {
              backgroundColor: '#FFFFFF',
              color: '#002C77',
            },
          }}
        >
          <MenuItem onClick={() => navigate("perfil")} sx={{ '&:hover': { backgroundColor: 'rgba(0, 168, 199, 0.2)' } }}>Perfil</MenuItem>
          <MenuItem onClick={handleLogout} sx={{ '&:hover': { backgroundColor: 'rgba(0, 168, 199, 0.2)' } }}>Cerrar sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
