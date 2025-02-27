import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import "dayjs/locale/es";
import LabelBadge from "./LabelBadge";
import {
  EYE_CLASSES_DEFINITIONS,
  FEEDBACK_DEFINITIONS,
} from "../constants/EyeDefinitions";

dayjs.locale("es");

const componenteFeedBack = (value) => {
  if (!value) return <em>Sin feedback</em>;
  const def = FEEDBACK_DEFINITIONS[value];
  if (!def) return value; // fallback
  return (
    <LabelBadge
      label={def.label}
      bgColor={def.bgColor}
      textColor={def.textColor}
      tooltip={def.tooltip}
    />
  );
};

const componenteClase = (value) => {
  const def = EYE_CLASSES_DEFINITIONS[value];
  if (!def) return value; // fallback
  return (
    <LabelBadge
      label={def.label}
      bgColor={def.bgColor}
      textColor={def.textColor}
      tooltip={def.tooltip}
    />
  );
};

const ViewSolicitudModal = ({ open, onClose, row, loading }) => {
  if (loading) {
    // Modal de carga
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            textAlign: "center",
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.common.white,
          }}
        >
          Cargando...
        </DialogTitle>
        <DialogContent dividers>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="200px"
          >
            <CircularProgress size={40} />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  if (!row && !loading) return null;

  const fechaCreacion = row.created_at
    ? dayjs(row.created_at).format("DD [de] MMMM, YYYY")
    : "N/A";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.common.white,
        }}
      >
        <Typography variant="h6">
          Detalle de la Solicitud: HU{String(row.id).padStart(4, "0")}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ color: (theme) => theme.palette.common.white }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Columna Izquierda */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="body1">
                <strong>ID:</strong> HU{String(row.id).padStart(4, "0")}
              </Typography>

              <Typography variant="body1">
                <strong>Clase:</strong>{" "}
                {componenteClase(row.predicted_class_name)}
              </Typography>

              <Typography variant="body1">
                <strong>Feedback:</strong>{" "}
                {componenteFeedBack(row.doctor_feedback)}
              </Typography>

              <Typography variant="body1">
                <strong>Archivo:</strong> {row.image_filename || "N/A"}
              </Typography>

              <Typography variant="body1">
                <strong>Fecha de creación:</strong> {fechaCreacion}
              </Typography>
            </Stack>
          </Grid>

          {/* Columna Derecha: Imagen */}
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {row.image_base64 ? (
              <img
                src={row.image_base64}
                alt="Imagen ocular"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                No hay imagen disponible
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSolicitudModal;
