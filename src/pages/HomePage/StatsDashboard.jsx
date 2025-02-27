// src/pages/HomePage/StatsDashboard.jsx
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Skeleton,
  Box,
  IconButton,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PieChartIcon from "@mui/icons-material/PieChart";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatsDashboard = ({ stats, loading, dateRange, onRefresh }) => {
  const theme = useTheme();

  // Función para generar opciones de chart
  const getChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            family: theme.typography.fontFamily,
          },
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: theme.typography.fontFamily,
        },
        titleFont: {
          family: theme.typography.fontFamily,
          weight: "bold",
        },
      },
    },
  });

  // Si no hay stats y no está cargando, no mostramos nada
  if (!stats && !loading) return null;

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {/* Card 1: Solicitudes Totales */}
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
              transform: "translateY(-2px)",
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {loading ? (
              <>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="40%" height={48} sx={{ mt: 1 }} />
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                    }}
                  >
                    <VisibilityIcon fontSize="medium" />
                  </Box>
                  <Typography variant="h6" color="textSecondary">
                    Solicitudes Totales
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {stats.totalRequests}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {dateRange === "hoy"
                    ? "Hoy"
                    : dateRange === "semana"
                    ? "Esta semana"
                    : "Este mes"}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Card 2: Tus Solicitudes */}
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
              transform: "translateY(-2px)",
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {loading ? (
              <>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="40%" height={48} sx={{ mt: 1 }} />
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                      color: theme.palette.secondary.main,
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                    }}
                  >
                    <PersonIcon fontSize="medium" />
                  </Box>
                  <Typography variant="h6" color="textSecondary">
                    Tus Solicitudes
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {stats.userRequests}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {dateRange === "hoy"
                    ? "Hoy"
                    : dateRange === "semana"
                    ? "Esta semana"
                    : "Este mes"}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Card 3: % Recs Correctas */}
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
              transform: "translateY(-2px)",
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {loading ? (
              <>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="40%" height={48} sx={{ mt: 1 }} />
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main,
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                    }}
                  >
                    <CheckCircleIcon fontSize="medium" />
                  </Box>
                  <Typography variant="h6" color="textSecondary">
                    % Recs Correctas
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {stats.correctPct}%
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {dateRange === "hoy"
                    ? "Hoy"
                    : dateRange === "semana"
                    ? "Esta semana"
                    : "Este mes"}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Gráfico de feedback */}
      <Grid item xs={12}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            transition: "box-shadow 0.2s",
            "&:hover": {
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.info.main,
                    borderRadius: "50%",
                    p: 1,
                    mr: 2,
                  }}
                >
                  <PieChartIcon fontSize="medium" />
                </Box>
                <Typography variant="h6">Distribución de Feedback</Typography>
              </Box>
              <IconButton onClick={onRefresh} size="small">
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{ height: 320, position: "relative" }}>
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Skeleton variant="circular" width={250} height={250} />
                </Box>
              ) : stats ? (
                <Pie
                  data={{
                    labels: stats.chartData.labels,
                    datasets: [
                      {
                        ...stats.chartData.datasets[0],
                        borderWidth: 2,
                        borderColor: theme.palette.background.paper,
                        hoverOffset: 10,
                      },
                    ],
                  }}
                  options={getChartOptions()}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography variant="body1" color="textSecondary">
                    No hay datos disponibles
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatsDashboard;
