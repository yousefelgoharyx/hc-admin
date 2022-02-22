import { Box, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./data";
import FormCreate from "../../components/FormCreate";
import useMethod from "../../hooks/useMethod";
import useGet from "../../hooks/useGet";

const newsRequestOptions = {
  headers: { "Content-Type": "multipart/form-data" },
};

const defaultFormDataState = {
  title: "",
  description: "",
  image: null,
};

const News = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(defaultFormDataState);
  const newsPostOwner = useMethod("post", newsRequestOptions);
  const newsGetOwner = useGet("/api/news");

  const handleCreateNew = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image);
    try {
      await newsPostOwner.post("/api/news", data);
      await newsGetOwner.backgroundReload();
      enqueueSnackbar("تمت اضافة خبر بنجاح", { variant: "success" });
      setFormData(defaultFormDataState);
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  const onInputChange = (e) => {
    const newFormData = { ...formData };
    const inputKey = e.target.name;
    newFormData[inputKey] = e.target.value;
    setFormData(newFormData);
  };

  const formCreateProps = {
    title: "انشاء خبر",
    action: "اضافة خبر",
    onAction: handleCreateNew,
    isActionLoading: newsPostOwner.loading,
    image: formData.image,
    setImage: (newImage) => setFormData({ ...formData, image: newImage }),
  };
  return (
    <Box>
      <FormCreate {...formCreateProps}>
        <Stack direction="row">
          <TextField
            variant="outlined"
            fullWidth
            label="عنوان الخبر"
            value={formData.title}
            name="title"
            onChange={onInputChange}
          />
        </Stack>
        <Stack direction="row">
          <TextField
            variant="outlined"
            multiline
            rows={8}
            fullWidth
            label="عنوان الخبر"
            value={formData.description}
            name="description"
            onChange={onInputChange}
          />
        </Stack>
      </FormCreate>
      <Box margin={2} height={52 * 7 + 58}>
        <DataGrid
          loading={newsGetOwner.loading}
          sx={{ bgcolor: "#222" }}
          rows={newsGetOwner.data}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
        />
      </Box>
    </Box>
  );
};

export default News;
