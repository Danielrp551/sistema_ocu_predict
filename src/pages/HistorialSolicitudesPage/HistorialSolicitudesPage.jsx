import { useState, useCallback } from "react";
import { Container, Box } from "@mui/material";
import useGetHistorialSolicitudes from "../../hooks/HistorialSolicitudes/useGetHistorialSolicitudes";
import ViewSolicitudModal from "../../components/ViewSolicitudModal";
import DataTable from "../../components/DataTable/DataTable";
import HistorialSolicitudesService from "../../services/HistorialSolicitudesService";
import { createColumns } from "./columns";


export const HistorialSolicitudesPage = () => {
  // States locales
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({
    pageNumber: 1,
    pageSize: 10,
    columnId: null,
    direction: false, // false => asc, true => desc
  });
  const [showFilters, setShowFilters] = useState(false);

  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);

  const handleClickView = async (historyId) => {
    try {
        setOpenViewModal(true);  
        setLoadingModal(true);              // Opcional: mostrar spinner en el modal
        const solicitudData = await HistorialSolicitudesService.getSingleSolicitud(historyId);
        setSelectedRow(solicitudData);      // Guardamos la respuesta
        setOpenViewModal(true);             
      } catch (err) {
        console.error("Error al obtener la solicitud:", err);
      } finally {
        setLoadingModal(false);
      }
  
  };

  const handleCloseModal = () => {
    setOpenViewModal(false);
    setSelectedRow(null);
  };

  const columns = createColumns(handleClickView);

  // Construir params
  const params = {
    ...filters,
    SortBy: sortConfig.columnId || "",
    IsDescending: sortConfig.direction || false,
    PageNumber: sortConfig.pageNumber,
    PageSize: sortConfig.pageSize,
  };

  // Llamamos al hook
  const { data, isLoading, error, refetch } =
    useGetHistorialSolicitudes(params);

  // data?.solicitudes => array, data?.total => total
  const solicitudes = data?.items || [];
  const totalItems = data?.total || 0;

  // Botón "refresh"
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <DataTable
          title="Mis Solicitudes" // Título
          columns={columns} // Columnas
          data={solicitudes} // Registros
          totalItems={totalItems} // Total
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          filters={filters}
          setFilters={setFilters}
          isLoading={isLoading}
          error={error}
          onRefresh={handleRefresh}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      </Box>

      <ViewSolicitudModal
        open={openViewModal}
        onClose={handleCloseModal}
        row={selectedRow}
        loading={loadingModal}
      />      
    </Container>
  );
};
