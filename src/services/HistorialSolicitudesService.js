import axiosInstance from "./axiosInstance";
import { handleError } from "../helpers/ErrorHandler";

const url = "history/";

/**
 * Servicio para gestionar operaciones relacionadas con el historial de solicitudes.
 * Utiliza axiosInstance para realizar las solicitudes HTTP.
 */
const HistorialSolicitudesService = {
  /**
   * Obtiene el historial de solicitudes de un usuario
   * @returns {Promise<object>} Historial de vacaciones del usuario.
   */
  async getSolicitudes(params){
    try{
      const response = await axiosInstance.get(url, {params});
      console.log("HistorialSolicitudesService.getSolicitudes:", response);
      return response.data;
    } catch (error){
      console.error(`Error en HistorialSolicitudesService.getSolicitudes(${params}):`, error);
      handleError(error);
      throw error;
    }

  },
  async getSingleSolicitud(historyId){
    try{
      const response = await axiosInstance.get(url + historyId);
      console.log("HistorialSolicitudesService.getSingleSolicitud:", response);
      return response.data;
    } catch (error){
      console.error(`Error en HistorialSolicitudesService.getSingleSolicitud(${historyId}):`, error);
      handleError(error);
      throw error;
    }
  }
};

export default HistorialSolicitudesService;
