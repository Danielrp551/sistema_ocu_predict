import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <div
            className="
    relative min-h-screen w-full overflow-hidden
    bg-[#DCE6F1]                 /* Azul intermedio */
    dark:bg-[#B0C4DE]            /* Versión más oscura pero aún clara */
    bg-[radial-gradient(ellipse_90%_90%_at_50%_10%,rgba(0,168,199,0.15),rgba(220,230,241,0.9))]
    dark:bg-[radial-gradient(ellipse_90%_90%_at_50%_10%,rgba(0,168,199,0.1),rgba(176,196,222,0.8))]
       "
          >
            <AppRouter />
          </div>
          <ToastContainer />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
