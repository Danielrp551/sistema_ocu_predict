// src/pages/HomePage/TipsSection.jsx
import React from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import GlassesIcon from "@mui/icons-material/Visibility";
import OpacityIcon from "@mui/icons-material/Opacity";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TipsSection = ({
  setOpenGlaucomaModal,
  setOpenCataractModal,
  setOpenRetinopathyModal,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 5, mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" color="textPrimary">
          Recomendaciones Clínicas
        </Typography>
        <Divider sx={{ flex: 1, ml: 2 }} />
      </Box>

      <Grid container spacing={3}>
        {/* Glaucoma Card */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  borderRadius: "50%",
                  p: 1.5,
                  width: 56,
                  height: 56,
                  mb: 2,
                }}
              >
                <GlassesIcon fontSize="large" />
              </Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Glaucoma
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Considere evaluación de presión intraocular en pacientes con
                factores de riesgo. Recuerde que el glaucoma de ángulo abierto
                es asintomático en etapas iniciales y requiere detección
                temprana.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => setOpenGlaucomaModal(true)}
              >
                <Typography variant="body2" fontWeight="medium">
                  Leer más
                </Typography>
                <ExpandMoreIcon fontSize="small" style={{ marginLeft: 4 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Catarata Card */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: alpha(theme.palette.secondary.main, 0.1),
                  color: theme.palette.secondary.main,
                  borderRadius: "50%",
                  p: 1.5,
                  width: 56,
                  height: 56,
                  mb: 2,
                }}
              >
                <OpacityIcon fontSize="large" />
              </Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Catarata
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Evalúe la madurez de la catarata y considere la remisión
                quirúrgica cuando la agudeza visual sea inferior a 20/50.
                Recuerde documentar el tipo y localización para planificación
                quirúrgica.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  color: theme.palette.secondary.main,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => setOpenCataractModal(true)}
              >
                <Typography variant="body2" fontWeight="medium">
                  Leer más
                </Typography>
                <ExpandMoreIcon fontSize="small" style={{ marginLeft: 4 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Retinopatía Card */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  color: theme.palette.warning.main,
                  borderRadius: "50%",
                  p: 1.5,
                  width: 56,
                  height: 56,
                  mb: 2,
                }}
              >
                <LocalHospitalIcon fontSize="large" />
              </Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Retinopatía Diabética
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Realice examen de fondo de ojo anual en pacientes diabéticos. La
                clasificación ETDRS es esencial para determinar el tratamiento.
                Considere OCT para evaluar edema macular.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  color: theme.palette.warning.main,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => setOpenRetinopathyModal(true)}
              >
                <Typography variant="body2" fontWeight="medium">
                  Leer más
                </Typography>
                <ExpandMoreIcon fontSize="small" style={{ marginLeft: 4 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Imagen temática */}
      <Box
        sx={{
          mt: 4,
          textAlign: "center",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        <a
          href="https://www.kenhub.com/es/library/anatomia-es/anatomia-del-ojo"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <img
            src="partes_ojo_home.jpg"
            alt="Tips Vision"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </a>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: 3,
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
            color: "white",
            textAlign: "left",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            La Anatomía del Ojo
          </Typography>
          <Typography variant="body1">
            Explora cada parte y sus funciones en un
            artículo especializado.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TipsSection;
