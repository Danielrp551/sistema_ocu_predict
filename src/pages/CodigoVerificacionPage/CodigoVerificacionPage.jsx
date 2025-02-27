import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { toast } from "react-toastify";
// Importa tu servicio o método para verificar
import AuthService from "../../services/AuthService";

/**
 * @param {string} mode - Modo de la página: "crear" | "recuperar"
 *  - "crear": verificar la cuenta recién registrada
 *  - "recuperar": verificar la cuenta para recuperación de contraseña
 */
export default function CodigoVerificacionPage({ mode = "crear" }) {
  const navigate = useNavigate();
  
  // Estados para los campos
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // Para ayudar a la lógica, definimos un título y un botón distinto para cada modo
  const titulo = mode === "crear"
    ? "Verificar tu cuenta"
    : "Recuperar tu contraseña";
  const botonTexto = mode === "crear"
    ? "Verificar Cuenta"
    : "Verificar para Recuperar";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!email || !verificationCode) {
        toast.error("Por favor, ingresa tu email y el código de verificación");
        return;
      }

      if (mode === "crear") {
        const response = await AuthService.verifyAccount(email, verificationCode);
        toast.success("Cuenta verificada correctamente. Ahora puedes iniciar sesión.");
        navigate("/login");

      } else {
        const response = await AuthService.verifyRecovery(email, verificationCode);
        toast.success("Código de recuperación verificado. Establece tu nueva contraseña.");
      }
    } catch (error) {
      // Maneja el error, por ejemplo mostrando un toast
      toast.error(error?.response?.data?.error || "Error al verificar código");
    }
  };

  return (
    <AuthLayout>
      <Box className="w-full max-w-md">
        <Box className="mb-12 text-center ">
          <img
            src="./marsh_svg_edit_1.svg"
            alt="EY Logo"
            className="h-20 !mb-8 mx-auto"
            style={{
              filter: "brightness(1.2)",
              objectFit: "contain",
            }}
          />
          <Typography
            variant="h4"
            className="text-[#002C77] font-bold mb-2"
            sx={{
              fontFamily: '"Orbitron", sans-serif',
              letterSpacing: "0.05em",
            }}
          >
            {titulo}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Correo"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">@</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Código de verificación"
            variant="outlined"
            fullWidth
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#002C77",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "0.75rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#0044A6",
              },
            }}
          >
            {botonTexto}
          </Button>
        </form>
      </Box>
    </AuthLayout>
  );
}
