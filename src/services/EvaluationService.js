// src/services/EvaluationService.js
import axiosInstance from './axiosInstance';
import { handleError } from '../helpers/ErrorHandler';

/**
 * Servicio para la Evaluación Ocular (subir imagen y dar retroalimentación).
 */
const EvaluationService = {
  /**
   * Envia la imagen para que el modelo la procese.
   * @param {File} file - Archivo de imagen seleccionado
   * @returns {object} Respuesta del servidor (probabilities, predicted_class_name, history_id, etc.)
   */
  async analyzeImage(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axiosInstance.post('predict/', formData);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  /**
   * Envía la retroalimentación del médico sobre la recomendación.
   * @param {number} historyId - ID del registro en el historial
   * @param {string} feedback - "correcto" o "incorrecto"
   * @returns {object} Respuesta del servidor
   */
  async sendFeedback(historyId, feedback) {
    try {
      // Suponiendo que en el backend existe un PUT /history/feedback/<history_id>
      const { data } = await axiosInstance.put(`history/feedback/${historyId}`, {
        feedback
      });
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

export default EvaluationService;
