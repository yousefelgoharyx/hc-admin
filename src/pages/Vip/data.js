import { DeleteRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { baseURL } from "../../util/axios";
import resolveImage from "../../util/resolveImage";

export const columns = [
  { field: "id", headerName: "رقم", width: 90, flex: 1 },
  {
    field: "name",
    headerName: "الاسم",
    flex: 1,
  },

  {
    field: "job",
    headerName: "الوظيفة",
    flex: 1,
    renderCell: (params) => params.row?.game?.name,
  },

  {
    field: "image",
    headerName: "الصورة",
    flex: 1,
    renderCell: (params) => {
      return (
        <img
          style={{ width: 32, height: 32 }}
          src={resolveImage(params.row.image)}
        />
      );
    },
  },

  {
    field: "settings",
    headerName: "الاعدادات",
    flex: 1,
    renderCell: (params) => {
      return (
        <IconButton>
          <DeleteRounded color="#ff3333" />
        </IconButton>
      );
    },
  },
];
