import { DeleteRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { baseURL } from "../../util/axios";

export const columns = [
  { field: "id", headerName: "رقم", width: 90, flex: 1 },
  {
    field: "name",
    headerName: "اسم اللاعب",
    flex: 1,
  },

  {
    field: "image",
    headerName: "الصورة",
    flex: 1,
    renderCell: (params) => {
      return (
        <img
          style={{ width: 32, height: 32 }}
          src={baseURL + "/" + params.row.image}
        />
      );
    },
  },
];
