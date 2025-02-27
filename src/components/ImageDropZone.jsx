// src/components/EvaluacionOcular/ImageDropzone.jsx
import React, { useCallback } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

/**
 * Componente para arrastrar/soltar la imagen y mostrar preview.
 * @param {object} props
 *  - imagePreview: string (DataURL de la imagen)
 *  - setImagePreview: function
 *  - setSelectedFile: function
 *  - onReset: function para limpiar todo (resetea imagen y estados)
 */
const ImageDropzone = ({
  imagePreview,
  setImagePreview,
  setSelectedFile,
  onReset,
  disabled = false,
}) => {
  // onDrop se ejecuta cuando el usuario suelta el archivo.
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!disabled) {
        const file = acceptedFiles[0];
        if (file) {
          setSelectedFile(file);
          const reader = new FileReader();
          reader.onload = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [disabled, setImagePreview, setSelectedFile]
  );

  // Configuración de react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: false,
    disabled,
  });

  // Para borrar la imagen actual
  const clearImage = (e) => {
    e.stopPropagation();
    onReset();
  };

  const borderColor = disabled
    ? "grey.400"
    : isDragActive
    ? "primary.main"
    : "grey.300";

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed",
        borderColor: isDragActive ? "primary.main" : "grey.300",
        borderRadius: 2,
        padding: 3,
        textAlign: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: disabled ? "grey.400" : "primary.main",
          backgroundColor: disabled ? "transparent" : "action.hover",
        },
      }}
    >
      <input {...getInputProps()} />
      {!imagePreview ? (
        <Box sx={{ paddingY: 4 }}>
          <UploadIcon
            sx={{
              fontSize: 48,
              color: "text.secondary",
              marginBottom: 2,
            }}
          />
          <Typography variant="h6" gutterBottom>
            {disabled
              ? "Deshabilitado"
              : isDragActive
              ? "Suelta la imagen aquí"
              : "Arrastra y suelta una imagen o haz clic para seleccionar"}
          </Typography>
          {!disabled && (
            <Typography variant="body2" color="textSecondary">
              Formatos permitidos: PNG, JPG, JPEG, GIF
            </Typography>
          )}
        </Box>
      ) : (
        <Box sx={{ position: "relative", textAlign: "center" }}>
          {!disabled && (
            <IconButton
              onClick={clearImage}
              sx={{
                position: "absolute",
                top: -12,
                right: -12,
                backgroundColor: "background.paper",
                boxShadow: 1,
                "&:hover": { backgroundColor: "grey.100" },
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
          <img
            src={imagePreview || "/placeholder.svg"}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              objectFit: "contain",
              opacity: disabled ? 0.6 : 1,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ImageDropzone;
