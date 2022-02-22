import { Box, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import FormCreate from "../../components/FormCreate";
import { DataGrid } from "@mui/x-data-grid";
import useMethod from "../../hooks/useMethod";
import useGet from "../../hooks/useGet";
const columns = [
  { field: "id", headerName: "رقم", width: 90, flex: 1 },
  {
    field: "title",
    headerName: "عنوان الخبر",
    flex: 1,
  },
  {
    field: "description",
    headerName: "تفاصيل",
    flex: 1,
  },
];

const newsRequestOptions = {
  headers: { headers: { "Content-Type": "multipart/form-data" } },
};
const Sports = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState(null);
  const { post, loading: addLoading } = useMethod("post", newsRequestOptions);
  const { loading: getLoading, error, data: rowsData } = useGet("/news");
  const handleCreateNew = async () => {
    try {
      const data = new FormData();
      data.append("title", "ASD");
      data.append("description", "ASD");
      data.append("image", image);
      const res = await post("/news", data);
      enqueueSnackbar("تمت اضافة خبر بنجاح", { variant: "success" });
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };
  return (
    <Box>
      <FormCreate
        title="انشاء خبر"
        action="اضافة خبر"
        onAction={handleCreateNew}
        isActionLoading={addLoading}
        onImageChange={(image) => setImage(image)}
      >
        <Stack direction="row">
          <TextField variant="outlined" fullWidth label="عنوان الخبر" />
        </Stack>
        <Stack direction="row">
          <TextField
            variant="outlined"
            multiline
            rows={8}
            fullWidth
            label="عنوان الخبر"
          />
        </Stack>
      </FormCreate>
      <Box margin={2} height={52 * 7 + 58}>
        <DataGrid
          sx={{ bgcolor: "#222" }}
          rows={rowsData}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          // checkboxSelection
          // disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Sports;
