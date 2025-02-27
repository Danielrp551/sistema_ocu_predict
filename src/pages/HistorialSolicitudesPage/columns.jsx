import {
  EYE_CLASSES_DEFINITIONS,
  FEEDBACK_DEFINITIONS,
} from "../../constants/EyeDefinitions";
import LabelBadge from "../../components/LabelBadge";
import { Visibility } from "@mui/icons-material";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export const createColumns = (handleViewFn) => [
    {
      id: "id",
      label: "ID",
      sortable: true,
      width: "100px",
      render: (value, row) => <strong>HU{String(value).padStart(4, '0')}</strong>,
      filterType: "text",
    },
    { id: "image_filename", label: "Imagen", sortable: true, filterType: "text" },
    {
      id: "predicted_class_name",
      label: "Clase",
      sortable: true,
      render: (value) => {
        const def = EYE_CLASSES_DEFINITIONS[value];
        if (!def) return value; // fallback
        return (
          <LabelBadge label={def.label} bgColor={def.bgColor} textColor={def.textColor} tooltip={def.tooltip} />
        );
      },
      filterType: "select",
      selectOptions: [{id:"Normal", label:"Ojo Sano"}, {id:"Glaucoma", label:"Glaucoma"}, {id:"Catarata", label:"Catarata"}, {id:"Retinopatia diabetica", label:"Retinopatía Diabética"}]
    },
    {
      id: "doctor_feedback",
      label: "Feedback",
      sortable: true,
      render: (value) => {
        if (!value) return <em>Sin feedback</em>;
        const def = FEEDBACK_DEFINITIONS[value];
        if (!def) return value; // fallback
        return (
          <LabelBadge label={def.label} bgColor={def.bgColor} textColor={def.textColor} tooltip={def.tooltip} />
        );
      },
      filterType: "select",
      selectOptions: [{id:"correcto", label:"Correcto"}, {id:"incorrecto", label:"Incorrecto"}, {id:"Sin feedback", label:"Sin feedback"}]
    },
    {
      id: "created_at",
      label: "Fecha de creación",
      sortable: true,
      render: (value) => {
          const raw = dayjs(value).locale("es").format("MMMM, YYYY"); 
          // Ajustamos la primera letra si deseamos capitalizarla
          const capitalized = raw.charAt(0).toUpperCase() + raw.slice(1);
          return capitalized;
        },
    },
    {
      id: "acciones",
      label: "Acciones",
      width: "80px",
      actions: [
          {
              label: "Ver",
              icon: <Visibility />,
              onClick: (row) => handleViewFn(row.id),
          }
      ]
    }
  ];