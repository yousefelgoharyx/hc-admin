import { baseURL } from "../../util/axios";

export const columns = [
  { field: "id", headerName: "رقم", width: 90, flex: 1 },
  {
    field: "title",
    headerName: "عنوان الاعلان",
    flex: 1,
  },
  {
    field: "description",
    headerName: "تفاصيل الاعلان",
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
