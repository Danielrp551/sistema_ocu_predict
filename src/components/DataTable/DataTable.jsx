import React, { useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  Typography,
  Menu,
  MenuItem as MuiMenuItem
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";

// Estilos para celdas de encabezado
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function formatDate(dateString) {
  if (!dateString) return "";
  return dayjs(dateString).format("DD/MM/YYYY");
}

/**
 * Componente de Tabla Reusable.
 * @param {Object} props
 * @param {Array} props.columns - Definición de columnas (id, label, filterType, sortable, selectOptions, etc.)
 * @param {Array} props.data - Arreglo de registros a mostrar en la tabla
 * @param {number} props.totalItems - Total de registros (para paginación)
 * @param {Object} props.sortConfig - { pageNumber, pageSize, columnId, direction }
 * @param {Function} props.setSortConfig - setState para actualizar la ordenación y paginación
 * @param {Object} props.filters - { [colId]: valorDeFiltro }, para cada columna
 * @param {Function} props.setFilters - setState para actualizar los filtros
 * @param {boolean} props.isLoading - Indica si está cargando
 * @param {any} props.error - Error si ocurrió
 * @param {Function} props.onRefresh - Función para refrescar manualmente
 * @param {boolean} props.showFilters - Controla si mostramos/ocultamos la fila de filtros
 * @param {Function} props.setShowFilters - setState para alternar los filtros
 * @param {string} [props.title] - Título para mostrar arriba de la tabla
 */
export default function DataTable({
  columns,
  data,
  totalItems,
  sortConfig,
  setSortConfig,
  filters,
  setFilters,
  isLoading,
  error,
  onRefresh,
  showFilters,
  setShowFilters,
  title = "Tabla Reusable",
}) {
  // Manejador de click en encabezado => orden asc/desc/sin orden
  const handleSort = (columnId) => {
    setSortConfig((prev) => {
      if (prev.columnId === columnId) {
        // Alternar asc->desc->sin orden
        if (prev.direction === false) {
          // asc -> desc
          return { ...prev, columnId, direction: true };
        } else if (prev.direction === true) {
          // desc -> quitar orden
          return { ...prev, columnId: null, direction: false };
        } else {
          // si direction === null => pasa a asc
          return { ...prev, columnId, direction: false };
        }
      } else {
        // nueva columna => asc (direction=false)
        return { ...prev, columnId, direction: false };
      }
    });
  };

  // Manejador de filtros
  const handleFilterChange = (columnId, value) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
  };

  // Fila de filtros (si showFilters es true)
  const renderFilterRow = () => {
    if (!showFilters) return null;
    return (
      <TableRow>
        {columns.map((col) => {
          if (!col.filterType) {
            // si no tiene filtrado => celda vacía
            return <TableCell key={col.id} />;
          }
          const currentValue = filters[col.id] || "";
          console.log("COL", col);
          switch (col.filterType) {
            case "select":
              return (
                <TableCell key={col.id}>
                  <Select
                    size="small"
                    value={currentValue}
                    displayEmpty
                    onChange={(e) => handleFilterChange(col.id, e.target.value)}
                    sx={{ minWidth: 100 }}
                  >
                    <MenuItem value="">(Todos)</MenuItem>
                    {(col.selectOptions || []).map((opt) => (
                      <MenuItem key={opt.id} value={opt.id}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              );
            case "numeric":
            case "text":
            default:
              return (
                <TableCell key={col.id}>
                  <TextField
                    size="small"
                    value={currentValue}
                    onChange={(e) => handleFilterChange(col.id, e.target.value)}
                    placeholder="Filtrar..."
                    sx={{ maxWidth: "100%" }}
                  />
                </TableCell>
              );
          }
        })}
      </TableRow>
    );
  };

  // Paginación: cambio de página
  const handleChangePage = (event, newPage) => {
    setSortConfig((prev) => ({ ...prev, pageNumber: newPage + 1 }));
  };

  // Paginación: cambio de rowsPerPage
  const handleChangeRowsPerPage = (event) => {
    setSortConfig((prev) => ({
      ...prev,
      pageSize: parseInt(event.target.value, 10),
      pageNumber: 1,
    }));
  };

  // Estado para el menú de acciones
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRow, setMenuRow] = useState(null);

  // Buscar en las columnas la definición de "acciones"
  const accionesColumn = columns.find((col) => col.id === "acciones");

  const handleMenuOpen = (event, row) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRow(null);
  };

  return (
    <>
      {/* Encabezado con título y botones */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          {title}
        </Typography>
        <Box>
          {setShowFilters && (
            <Tooltip title="Mostrar filtros">
              <IconButton onClick={() => setShowFilters((prev) => !prev)}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
          {onRefresh && (
            <Tooltip title="Actualizar">
              <IconButton onClick={onRefresh} disabled={isLoading}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
      <Paper elevation={3} sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((col) => {
                  let sortIndicator = "";
                  if (sortConfig.columnId === col.id) {
                    sortIndicator =
                      sortConfig.direction === false ? " ↑" : " ↓";
                  }
                  return (
                    <StyledTableCell
                      key={col.id}
                      onClick={() => col.sortable && handleSort(col.id)}
                      className="MuiTableCell-head"
                      sx={{
                        width: col.width || "auto",
                        whiteSpace: "nowrap", // Evita que el texto salte de línea
                      }}
                    >
                      {col.label}
                      {col.sortable && sortIndicator}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
              {renderFilterRow()}
            </TableHead>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && error && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography color="error">
                      Ocurrió un error al cargar los datos.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && !error && data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" >
                    <Typography>No hay datos.</Typography>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                !error &&
                data.length > 0 &&
                data.map((row) => (
                  <StyledTableRow key={row.id}>
                    {columns.map((col) => {
                      const cellValue = row[col.id];

                      if (typeof col.render === "function") {
                        return (
                          <TableCell
                            key={col.id}
                            align={col.filterType === "numeric" ? "right" : "left"}
                          >
                            {col.render(cellValue, row)}
                          </TableCell>
                        );
                      }

                      // Si la columna es fecha, la formateamos con dayjs
                      if (col.id === "fechaInicio" || col.id === "fechaFin") {
                        return (
                          <TableCell key={col.id} align="center">
                            {formatDate(row[col.id])}
                          </TableCell>
                        );
                      }
                      if (col.id === "acciones") {
                        return (
                          <TableCell key={col.id} align="center">
                            <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                        );
                      }
                      // Sino, mostramos tal cual
                      return (
                        <TableCell
                          key={col.id}
                          align={
                            col.filterType === "numeric" ? "right" : "left"
                          }
                        >
                          {String(row[col.id])}
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
                ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  colSpan={columns.length}
                  count={totalItems}
                  rowsPerPage={sortConfig.pageSize}
                  page={sortConfig.pageNumber - 1}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Filas por página"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count !== -1 ? count : "más de " + to}`
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>

      {/* Menú desplegable de acciones */}
      {accionesColumn && accionesColumn.actions && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {accionesColumn.actions.map((action, index) => (
            <MuiMenuItem
              key={index}
              onClick={() => {
                action.onClick(menuRow);
                handleMenuClose();
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {action.icon}
                <Typography>{action.label}</Typography>
              </Box>
            </MuiMenuItem>
          ))}
        </Menu>
      )}      
    </>
  );
}
