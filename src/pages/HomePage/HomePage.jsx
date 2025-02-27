// src/pages/HomePage/HomePage.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RefreshIcon from "@mui/icons-material/Refresh";

import HomeService from "../../services/HomeService";

// Importamos componentes separados
import StatsDashboard from "./StatsDashboard";
import TipsSection from "./TipsSection";
import InfoModals from "./InfoModals";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Estados para dashboard
  const [dateRange, setDateRange] = useState("hoy");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // Estados para modales en Tips
  const [openGlaucomaModal, setOpenGlaucomaModal] = useState(false);
  const [openCataractModal, setOpenCataractModal] = useState(false);
  const [openRetinopathyModal, setOpenRetinopathyModal] = useState(false);

  // Efecto para cargar estadísticas al cambiar dateRange
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await HomeService.getStats(dateRange);
        setStats(data);
      } catch (error) {
        console.error("Error al obtener stats:", error);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    fetchStats();
  }, [dateRange]);

  // Función para refrescar
  const handleRefresh = () => {
    setLoading(true);
    HomeService.getStats(dateRange)
      .then((data) => setStats(data))
      .catch((error) => console.error("Error al actualizar:", error))
      .finally(() => setTimeout(() => setLoading(false), 600));
  };

  // Render principal
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Encabezado con título y select de fecha */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom color="textPrimary">
          Dashboard de Visión
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CalendarTodayIcon
            fontSize="medium"
            style={{ marginRight: 9, opacity: 0.9 }}
            color="primary"
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150, backgroundColor: "white" }}>
            <InputLabel id="date-range-label">Rango de fechas</InputLabel>
            <Select
              labelId="date-range-label"
              id="date-range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              label="Rango de fechas"
            >
              <MenuItem value="hoy">Hoy</MenuItem>
              <MenuItem value="semana">Última semana</MenuItem>
              <MenuItem value="mes">Último mes</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Actualizar datos">
            <IconButton
              onClick={handleRefresh}
              sx={{ ml: 1 }}
              disabled={loading}
            >
              <RefreshIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Sección de métricas y gráfico */}
      <StatsDashboard
        stats={stats}
        loading={loading}
        dateRange={dateRange}
        onRefresh={handleRefresh}
      />

      {/* Sección de tips con tarjetas */}
      <TipsSection
        setOpenGlaucomaModal={setOpenGlaucomaModal}
        setOpenCataractModal={setOpenCataractModal}
        setOpenRetinopathyModal={setOpenRetinopathyModal}
      />

      {/* Modales informativos */}
      <InfoModals
        openGlaucomaModal={openGlaucomaModal}
        setOpenGlaucomaModal={setOpenGlaucomaModal}
        openCataractModal={openCataractModal}
        setOpenCataractModal={setOpenCataractModal}
        openRetinopathyModal={openRetinopathyModal}
        setOpenRetinopathyModal={setOpenRetinopathyModal}
      />
    </Container>
  );
};

export default HomePage;
