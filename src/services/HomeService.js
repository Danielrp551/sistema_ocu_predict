import axiosInstance from "./axiosInstance";
import { handleError } from "../helpers/ErrorHandler";

/**
 * Servicio para gestionar operaciones relacionadas con el historial de solicitudes.
 * Utiliza axiosInstance para realizar las solicitudes HTTP.
 */
const HomeService = {
  /**
   * Obtiene el historial de solicitudes de un usuario
   * @returns {Promise<object>} Historial de vacaciones del usuario.
   */
  async getStats(dateRange){
    try{
      const response = await axiosInstance.get(`/home/stats?range=${dateRange}`);
      console.log("HomeService.getStats:", response);
      return response.data;
    } catch (error){
      console.error(`Error en HomeService.getStats(${dateRange}):`, error);
      handleError(error);
      throw error;
    }

  },
};

export default HomeService;
