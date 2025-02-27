// src/components/EvaluacionOcular/AnalysisResults.jsx
import React from 'react';
import { Box, Card, Typography, LinearProgress } from '@mui/material';

/**
 * Muestra las probabilidades de cada clase y la clase más probable.
 * @param {object} props
 *  - className: string (clase más probable)
 *  - probabilities: array de floats
 *  - getClassColor: function(prob) => color
 *  - clases: array de strings (nombres de cada clase)
 */
const AnalysisResults = ({ className, probabilities, getClassColor, clases }) => {
  return (
    <Card sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h6" gutterBottom>
        Resultados del Análisis
      </Typography>

      <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
        Clase más probable: <strong>{className}</strong>
      </Typography>

      <Box sx={{ marginTop: 2 }}>
        {probabilities.map((prob, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 0.5,
              }}
            >
              <Typography variant="body2">{clases[index]}</Typography>
              <Typography variant="body2" fontWeight="medium">
                {(prob * 100).toFixed(1)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={prob * 100}
              sx={{
                height: 8,
                borderRadius: 1,
                backgroundColor: "grey.100",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getClassColor(prob),
                  borderRadius: 1,
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default AnalysisResults;
