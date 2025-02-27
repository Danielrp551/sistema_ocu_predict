import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import SidebarLayout from "../layouts/SidebarLayout";

import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

// Páginas privadas
import PerfilPage from '../pages/PerfilPage/PerfilPage';
import EvaluacionOcularPage from "../pages/EvaluacionOcularPage/EvaluacionOcularPage";
import { HistorialSolicitudesPage } from "../pages/HistorialSolicitudesPage/HistorialSolicitudesPage";

import HomePage from "../pages/HomePage/HomePage";
import CodigoVerificacionPage from "../pages/CodigoVerificacionPage/CodigoVerificacionPage";
import RemountWrapper from "../components/RemountWrapper";

export default function AppRouter() {

  const privateRoutes = [
    { path: "/historial-solicitudes", element: <RemountWrapper><HistorialSolicitudesPage /></RemountWrapper> },
    { path: "/evaluacion-ocular", element: <RemountWrapper><EvaluacionOcularPage /></RemountWrapper> },
    { path: "/perfil", element: <PerfilPage /> },
    { path: "/", element: <HomePage/>}
  ];

  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/codigo-verificacion/crear-cuenta" element={<CodigoVerificacionPage mode="crear"/>} />

      {/* Grupo de Rutas Privadas */}
      <Route element={<PrivateRoutes />}>
        {/* Aquí anidamos el layout */}
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<HomePage />} />
          {privateRoutes
            .map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
