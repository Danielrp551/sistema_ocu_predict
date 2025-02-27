// src/pages/HomePage/InfoModals.jsx
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Modal,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Height } from "@mui/icons-material";

const InfoModals = ({
  openGlaucomaModal,
  setOpenGlaucomaModal,
  openCataractModal,
  setOpenCataractModal,
  openRetinopathyModal,
  setOpenRetinopathyModal,
}) => {
  const theme = useTheme();

  // Estilo genérico para todos los modales
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    maxHeight: "90vh",
    overflow: "auto",
    bgcolor: "background.paper",
    color: theme.palette.text.primary,
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  // Estilo para párrafos
  const paragraphStyle = {
    color: "#333",
    mb: 2,
    textAlign: "justify",
  };

  // Estilo para subtítulos
  const subtitleStyle = {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    mb: 1,
  };

  // Estilo para las imágenes dentro de los modales
  const imageStyle = {
    width: "60%",
    Height: "auto",
    objectFit: "cover",
    borderRadius: 4,
    marginBottom: 16,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  };

  return (
    <>
      {/* Modal de Glaucoma */}
      <Modal
        open={openGlaucomaModal}
        onClose={() => setOpenGlaucomaModal(false)}
        aria-labelledby="glaucoma-modal-title"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              id="glaucoma-modal-title"
              variant="h5"
              component="h2"
              fontWeight="bold"
            >
              Protocolo de Diagnóstico: Glaucoma
            </Typography>
            <IconButton onClick={() => setOpenGlaucomaModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
          {/* Imagen de Glaucoma */}
          <img
            src="/glaucoma_interno.jpg"
            alt="Ojo con Glaucoma"
            style={imageStyle}
          />
            </Box>

          <Typography variant="h6" gutterBottom sx={subtitleStyle}>
            Definición y Tipos
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            El glaucoma es un grupo de enfermedades oculares que conducen a un
            daño progresivo del nervio óptico, con posible elevación de la
            presión intraocular (PIO). El más frecuente es el glaucoma primario
            de ángulo abierto (GPAA), pero también existen variantes como el
            glaucoma de ángulo cerrado y el glaucoma normotensivo.
          </Typography>

          <Typography variant="h6" gutterBottom sx={subtitleStyle}>
            Criterios Diagnósticos
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            Los criterios principales para el diagnóstico incluyen:
          </Typography>
          <ul style={{ marginLeft: "1rem" }}>
            <li>
              <Typography variant="body1" paragraph sx={paragraphStyle}>
                <strong>Presión intraocular (PIO) elevada:</strong> Generalmente
                &gt; 21 mmHg. Sin embargo, en glaucoma normotensivo los valores
                pueden ser normales.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph sx={paragraphStyle}>
                <strong>Daño en el nervio óptico:</strong> Excavación papilar
                aumentada (relación copa/disco &gt; 0.6), hemorragias
                peripapilares, adelgazamiento del anillo neurorretiniano.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph sx={paragraphStyle}>
                <strong>Alteraciones campimétricas:</strong> Defectos
                característicos como escalón nasal, escotomas arqueados y
                escotomas paracentrales.
              </Typography>
            </li>
          </ul>

          <Typography variant="h6" gutterBottom sx={subtitleStyle}>
            Protocolo de Evaluación
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            1. <strong>Tonometría:</strong> Idealmente tonometría de aplanación
            (Goldmann). Evaluar variaciones diurnas.  
            <br />
            2. <strong>Gonioscopia:</strong> Valorar la amplitud del ángulo y
            descartar ángulo cerrado.  
            <br />
            3. <strong>OCT de capa de fibras nerviosas:</strong> Útil para
            detectar daño anatómico precoz.  
            <br />
            4. <strong>Campimetría computarizada:</strong> Estrategias como SITA
            Standard 24-2 o 10-2 en casos de afectación central.
          </Typography>

          <Typography variant="h6" gutterBottom sx={subtitleStyle}>
            Tratamiento Escalonado
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            1. <strong>Análogos de prostaglandinas (primera línea):</strong>{" "}
            Latanoprost, travoprost y bimatoprost.  
            <br />
            2. <strong>Beta-bloqueadores:</strong> Timolol, betaxolol.  
            <br />
            3. <strong>Inhibidores de anhidrasa carbónica:</strong> Dorzolamida,
            brinzolamida.  
            <br />
            4. <strong>Agonistas alfa-2:</strong> Brimonidina.  
            <br />
            5. <strong>Procedimientos láser:</strong> Trabeculoplastia
            selectiva.  
            <br />
            6. <strong>Cirugía filtrante o MIGS:</strong> En casos avanzados o
            refractarios.
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => setOpenGlaucomaModal(false)}
              sx={{ borderRadius: 2 }}
            >
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal de Catarata */}
      <Modal
        open={openCataractModal}
        onClose={() => setOpenCataractModal(false)}
        aria-labelledby="cataract-modal-title"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              id="cataract-modal-title"
              variant="h5"
              component="h2"
              fontWeight="bold"
            >
              Evaluación y Manejo de Cataratas
            </Typography>
            <IconButton onClick={() => setOpenCataractModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
          {/* Imagen de Catarata */}
          <img
            src="/catarata_interno.jpg"
            alt="Ojo con Catarata"
            style={imageStyle}
          />
            </Box>

          <Typography variant="h6" gutterBottom sx={subtitleStyle}>
            Definición y Clasificación
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            La catarata es la opacificación del cristalino que provoca una
            disminución progresiva de la agudeza visual. Se clasifica según la
            localización anatómica (nuclear, cortical, subcapsular posterior) o
            su etiología (senil, traumática, congénita, metabólica).
          </Typography>

          <Typography variant="h6" gutterBottom sx={subtitleStyle}>
            Evaluación Preoperatoria
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            1. <strong>Biometría:</strong> Cálculo de longitud axial y
            queratometría para determinar potencia de LIO. 
            <br />
            2. <strong>Topografía corneal:</strong> Relevante para astigmatismos
            significativos.  
            <br />
            3. <strong>OCT macular:</strong> Para descartar patología macular
            concomitante (ej. EMD, membrana epirretiniana).  
            <br />
            4. <strong>Examen endotelial:</strong> En sospecha de distrofias
            corneales (Fuchs, etc.).
          </Typography>

          <Typography variant="h6" gutterBottom sx={subtitleStyle}>
            Consideraciones Quirúrgicas
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            - <strong>Facoemulsificación:</strong> Técnica estándar.  
            <br />
            - <strong>Selección de LIO:</strong> Monofocales (buena visión de
            lejos), multifocales (independencia de gafas), tóricas (corrigen
            astigmatismo).  
            <br />
            - <strong>Complicaciones:</strong> Edema corneal, hemorragia
            supracoroidea, endoftalmitis postoperatoria.
          </Typography>

          <Typography variant="h6" gutterBottom sx={subtitleStyle}>
            Seguimiento y Resultados
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            La mayoría de pacientes presentan mejoría significativa de la visión
            tras la cirugía de catarata, siempre que no exista patología
            retiniana o neuropatía óptica asociada.
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => setOpenCataractModal(false)}
              sx={{ borderRadius: 2 }}
            >
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal de Retinopatía Diabética */}
      <Modal
        open={openRetinopathyModal}
        onClose={() => setOpenRetinopathyModal(false)}
        aria-labelledby="retinopathy-modal-title"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              id="retinopathy-modal-title"
              variant="h5"
              component="h2"
              fontWeight="bold"
            >
              Retinopatía Diabética: Diagnóstico y Tratamiento
            </Typography>
            <IconButton onClick={() => setOpenRetinopathyModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 3 }} />
        
          {/* Imagen de Retinopatía Diabética */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>

          <img
            src="/retinopatia_interno.jpeg"
            alt="Ojo con Retinopatía Diabética"
            style={imageStyle}
          />
        </Box>

          <Typography variant="h6" gutterBottom sx={subtitleStyle}>
            Clasificación Internacional (ETDRS)
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            1. <strong>Retinopatía Diabética No Proliferativa (RDNP):</strong>{" "}
            Leve, Moderada y Severa (regla 4-2-1).  
            <br />
            2. <strong>Retinopatía Diabética Proliferativa (RDP):</strong>{" "}
            Aparición de neovasos (NVD, NVE), alto riesgo si hay hemorragia
            vítrea.  
            <br />
            3. <strong>Edema macular diabético (EMD):</strong> Principal causa
            de disminución de AV en diabéticos.
          </Typography>

          <Typography variant="h6" gutterBottom sx={subtitleStyle}>
            Protocolo de Evaluación
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            - <strong>Fondo de ojo con dilatación:</strong> Evaluar exudados,
            hemorragias, neovasos.  
            <br />
            - <strong>OCT macular:</strong> Cuantificación de edema macular.  
            <br />
            - <strong>Angiografía fluoresceínica:</strong> Isquemia retiniana y
            fugas.  
            <br />
            - <strong>OCT-A:</strong> Visualización no invasiva de la
            microvasculatura.
          </Typography>

          <Typography variant="h6" gutterBottom sx={subtitleStyle}>
            Manejo Terapéutico
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            <strong>Edema Macular Diabético (EMD):</strong>  
            <br />
            1. Anti-VEGF intravítreos (ranibizumab, aflibercept, bevacizumab)  
            <br />
            2. Corticoides intravítreos (dexametasona)  
            <br />
            3. Fotocoagulación láser focal/grid en casos seleccionados  
            <br />
            <br />
            <strong>Retinopatía Diabética Proliferativa (RDP):</strong>  
            <br />
            - Panfotocoagulación retiniana (PRP)  
            <br />
            - Anti-VEGF como adyuvante  
            <br />
            - Vitrectomía en hemorragia vítrea persistente o DR traccional
          </Typography>

          <Typography variant="h6" gutterBottom sx={subtitleStyle}>
            Control Sistémico
          </Typography>
          <Typography variant="body1" paragraph sx={paragraphStyle}>
            La optimización del control glucémico, tensional y lipídico es
            fundamental para prevenir la progresión de la retinopatía diabética.
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => setOpenRetinopathyModal(false)}
              sx={{ borderRadius: 2 }}
            >
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default InfoModals;
