import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { baseURL } from "../../util/axios";
import { format } from "date-fns";
export const columns = [
  { field: "id", headerName: "رقم", width: 90, flex: 1 },
  {
    field: "location",
    headerName: "المكان",
    flex: 1,
  },
  {
    field: "matchTime",
    headerName: "الميعاد",
    flex: 1,
    renderCell: (params) => {
      console.log(params.row.matchTime);
      return format(new Date(params.row?.matchTime), "dd/MM - aaaaa'm' hh:mm");
    },
  },
  {
    field: "fTeamName",
    headerName: "الفريق الأول",
    flex: 1,
  },
  {
    field: "sTeamName",
    headerName: "الفريق الثاني",
    flex: 1,
  },
  {
    field: "fTeamScore",
    headerName: "النتيجة الأولي",
    flex: 1,
  },
  {
    field: "sTeamScore",
    headerName: "النتيجة الثانية",
    flex: 1,
  },
  {
    field: "delete",
    headerName: "مسح",
    renderCell: (params) => {
      return (
        <IconButton>
          <DeleteRounded color="#ff3333" />
        </IconButton>
      );
    },
  },

  {
    field: "edit",
    headerName: "تعديل النتيجة",
    renderCell: (params) => {
      return (
        <IconButton>
          <EditRounded color="#ff3333" />
        </IconButton>
      );
    },
  },
];
