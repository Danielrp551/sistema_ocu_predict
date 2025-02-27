// src/pages/EvaluacionOcularPage.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  Paper,
  LinearProgress,
  Fade,
  Alert,
  AlertTitle,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ImageDropzone from "../../components/ImageDropZone";
import AnalysisResults from "../../components/AnalysisResults";
import FeedbackButtons from "../../components/FeedbackButtons";

import EvaluationService from "../../services/EvaluationService";

// Lista de clases como en tu demo
const CLASES = ["Glaucoma", "Catarata", "Normal", "Retinopatía Diabética"];

export default function EvaluacionOcularPage() {
  const theme = useTheme();

  // Estados de la imagen
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Estados de resultados
  const [probabilities, setProbabilities] = useState([]);
  const [className, setClassName] = useState("");
  const [historyId, setHistoryId] = useState(null);

  // Estados de carga y error
  const [analysisLoading, setAnalysisLoading] = useState(false); // Carga para analizar imagen
  const [feedbackLoading, setFeedbackLoading] = useState(false); // Carga para feedback
  const [error, setError] = useState("");

  const [feedbackGiven, setFeedbackGiven] = useState(false);
  /**
   * Sube la imagen al backend para analizar.
   */
  const handleAnalyzeImage = async () => {
    if (!selectedFile) {
      setError("Por favor selecciona una imagen antes de enviar.");
      return;
    }
    setError("");
    setAnalysisLoading(true);

    try {
      const data = await EvaluationService.analyzeImage(selectedFile);
      // El backend debe retornar "probabilities", "predicted_class_name" y (opcional) "history_id"
      setProbabilities(data.probabilities || []);
      setClassName(data.predicted_class_name || "");
      setHistoryId(data.history_id || null);
      setFeedbackGiven(false);
    } catch (err) {
      setError(`Error: ${err.message || "Ocurrió un error desconocido"}`);
    } finally {
      setAnalysisLoading(false);
    }
  };

  /**
   * Envía la retroalimentación al backend.
   * @param {"correcto" | "incorrecto"} feedbackValue
   */
  const handleFeedback = async (feedbackValue) => {
    if (!historyId) {
      setError("No hay un ID de historial para dar feedback.");
      return;
    }
    setError("");
    setFeedbackLoading(true);
    try {
      await EvaluationService.sendFeedback(historyId, feedbackValue);
      setFeedbackGiven(true);
    } catch (err) {
      setError(`Error al enviar feedback: ${err.message}`);
    } finally {
      setFeedbackLoading(false);
    }
  };

  /**
   * Limpia todo para subir otra foto.
   */
  const handleReset = () => {
    setSelectedFile(null);
    setImagePreview("");
    setProbabilities([]);
    setClassName("");
    setHistoryId(null);
    setError("");
    setAnalysisLoading(false);
    setFeedbackLoading(false);
    setFeedbackGiven(false);
  };

  /**
   * Asigna color a la barra según probabilidad.
   */
  const getClassColor = (probability) => {
    if (probability > 0.7) return theme.palette.success.main;
    if (probability > 0.4) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const isAnalyzed = probabilities.length > 0;

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ marginBottom: 4 }}
        color="primary"
      >
        Evaluación Ocular
      </Typography>

      {/* Dropzone: subir imagen */}
      <Card sx={{ padding: 3, marginBottom: 4, textAlign: "center" }}>
        <ImageDropzone
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          setSelectedFile={setSelectedFile}
          onReset={handleReset}
          disabled={isAnalyzed || analysisLoading || feedbackLoading}
        />

        <Button
          variant="contained"
          size="large"
          onClick={handleAnalyzeImage}
          disabled={
            !selectedFile || analysisLoading || feedbackLoading || isAnalyzed
          }
          sx={{ marginTop: 3 }}
        >
          {analysisLoading ? "Procesando..." : "Analizar Imagen"}
        </Button>
      </Card>

      {/* === Indica progreso mientras se analiza imagen o envía feedback === */}
      {(analysisLoading || feedbackLoading) && (
        <Paper sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom align="center">
            {analysisLoading
              ? "Analizando imagen..."
              : "Enviando retroalimentación..."}
          </Typography>
          <LinearProgress />
        </Paper>
      )}

      {/* Mensajes de error */}
      {error && (
        <Fade in>
          <Alert severity="error" sx={{ marginBottom: 4 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Fade>
      )}

      {/* === Resultados de la clasificación === */}
      {!analysisLoading && probabilities.length > 0 && (
        <Fade in>
          <div>
            <AnalysisResults
              className={className}
              probabilities={probabilities}
              getClassColor={getClassColor}
              clases={CLASES}
            />
          </div>
        </Fade>
      )}

      {/* === Sección de feedback === */}
      {!analysisLoading && probabilities.length > 0 && (
        <FeedbackButtons
          feedbackLoading={feedbackLoading}
          feedbackGiven={feedbackGiven}
          onFeedback={handleFeedback}
          onReset={handleReset}
          disabled={!historyId || feedbackLoading}
        />
      )}
    </Container>
  );
}
