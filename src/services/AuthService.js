import axiosInstance from './axiosInstance';
import { handleError } from '../helpers/ErrorHandler';

/**
 * Servicio de autenticación (login, register).
 * Usa axiosInstance para no repetir baseURL ni configuraciones.
 */
const AuthService = {
  /**
   * Inicia sesión con username y password.
   * @param {string} username
   * @param {string} password
   * @returns {object} Respuesta del servidor (por ej. { token: '...', userName: '...' })
   */
  async login(email, password) {
    try {
      const payload = { email, password };
      const { data } = await axiosInstance.post('auth/login', payload);
      return data;
    } catch (error) {
      console.log('Error en AuthService.login:', error)
      handleError(error);
      throw error; 
    }
  },

  /**
   * Registra un usuario nuevo.
   * @param {string} email
   * @param {string} username
   * @param {string} password
   * @returns {object} Respuesta del servidor (por ej. { token: '...', userName: '...' })
   */
  async register(email, name, password) {
    try {
      const payload = { email, name, password };
      const { data } = await axiosInstance.post('auth/register', payload);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  async verifyAccount(email, code) {
    try {
      const payload = { email, code };
      const { data } = await axiosInstance.post('auth/verify', payload);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  async verifyRecovery(email, code) {
    try {
      const payload = { email, code };
      const { data } = await axiosInstance.post('auth/reset-password', payload);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

export default AuthService;
