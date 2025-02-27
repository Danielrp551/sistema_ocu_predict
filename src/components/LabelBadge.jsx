// src/components/common/LabelBadge.jsx
import React from "react";
import { Chip, Tooltip } from "@mui/material";

/**
 * Componente para mostrar un label tipo "chip" con color y tooltip.
 * @param {object} props
 *  - label: string => texto que se mostrará
 *  - bgColor: string => color de fondo (hex, rgb, etc.)
 *  - textColor: string => color del texto
 *  - tooltip: string => texto del tooltip (opcional)
 */
const LabelBadge = ({ label, bgColor, textColor, tooltip }) => {
  const chipElement = (
    <Chip
      label={label}
      sx={{
        backgroundColor: bgColor, // color de fondo
        color: textColor,         // color de texto
        fontWeight: "bold",
      }}
    />
  );

  if (!tooltip) {
    // Si no hay tooltip, renderizamos el chip sin envoltura
    return chipElement;
  }

  // Si hay tooltip, lo envolvemos
  return <Tooltip title={tooltip}>{chipElement}</Tooltip>;
};

export default LabelBadge;
