import { useQuery } from '@tanstack/react-query';
import UsuariosService from '../../services/UsuariosService';
import { toast } from 'react-toastify'

/**
 * Custom hook para obtener proveedores con filtros y paginación.
 * @param {object} params - Parámetros de consulta (NombreEmpresa, PageNumber, PageSize).
 * @returns {object} Estado de la consulta y datos.
 */
const useUsuarios = (params,userId) => {
  return useQuery({
    queryKey: ['usuarios', { params, userId }],
    queryFn: () => UsuariosService.getUsuarios(params, userId),
    keepPreviousData: true, // Mantiene los datos anteriores mientras se cargan nuevos
    staleTime: 5 * 60 * 1000, // Tiempo en milisegundos antes de considerar los datos obsoletos
    retry: 1, // Número de reintentos en caso de fallo
  });
};

export default useUsuarios;
