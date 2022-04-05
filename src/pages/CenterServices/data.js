import { DeleteRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { baseURL } from "../../util/axios";

export const columns = [
  { field: "id", headerName: "رقم", width: 90, flex: 1 },
  {
    field: "name",
    headerName: "إسم الخدمة",
    flex: 1,
  },

  {
    field: "center_id",
    headerName: "رقم المركز",
    flex: 1,
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
