// src/components/EvaluacionOcular/FeedbackButtons.jsx
import React from "react";
import { Box, Button, Card, Typography } from "@mui/material";

/**
 * Botones para enviar feedback (correcto/incorrecto) y para "Subir otra foto".
 * @param {object} props
 *  - onFeedback: function(feedbackValue) -> envía "correcto" o "incorrecto"
 *  - onReset: function -> limpia todo para subir otra imagen
 *  - disabled: boolean -> desactiva botones de feedback (por ej., si no hay historyId)
 */
const FeedbackButtons = ({
  onFeedback,
  onReset,
  disabled,
  feedbackGiven,
  feedbackLoading,
}) => {
  // Si ya se envió el feedback, mostrar mensaje de agradecimiento.
  if (feedbackGiven) {
    return (
      <Card sx={{ textAlign: "center", marginBottom: 4, padding: 3 }}>
        <Typography variant="h6" color="success.main" marginBottom={2}>
          ¡Gracias por tu retroalimentación!
        </Typography>
        <Button variant="text" onClick={onReset}>
          Subir otra foto
        </Button>
      </Card>
    );
  }

  // Si no se ha enviado feedback, mostramos los botones "Correcto/Incorrecto
  return (
    <Card
      sx={{
        textAlign: "center",
        marginBottom: 4,
        backgroundColor: "white",
        padding: 3,
      }}
    >
      <Typography variant="h5" color="#002C77" marginBottom={1}>
        ¿La orientación del modelo te parece correcta?
      </Typography>
      <Button
        variant="outlined"
        color="success"
        sx={{ marginRight: 2 }}
        onClick={() => onFeedback("correcto")}
        disabled={disabled || feedbackLoading}
      >
        Correcto
      </Button>
      <Button
        variant="outlined"
        color="error"
        sx={{ marginRight: 2 }}
        onClick={() => onFeedback("incorrecto")}
        disabled={disabled || feedbackLoading}
      >
        Incorrecto
      </Button>
      <Button variant="text" onClick={onReset}>
        Subir otra foto
      </Button>
    </Card>
  );
};

export default FeedbackButtons;
