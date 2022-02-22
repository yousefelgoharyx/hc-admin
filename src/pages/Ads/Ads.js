import { Box, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./data";
import FormCreate from "../../components/FormCreate";
import useMethod from "../../hooks/useMethod";
import useGet from "../../hooks/useGet";

const adsRequestOptions = {
  headers: { headers: { "Content-Type": "multipart/form-data" } },
};

const defaultFormDataState = {
  title: "",
  description: "",
  image: null,
};

const Ads = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(defaultFormDataState);
  const adsPostOwner = useMethod("post", adsRequestOptions);
  const adsGetOwner = useGet("/api/ads");
  useEffect(() => {
    console.log("Render");
  });
  const handleCreateAd = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image);
    try {
      await adsPostOwner.post("/api/ads", data);
      await adsGetOwner.backgroundReload();
      enqueueSnackbar("تمت اضافة اعلان بنجاح", { variant: "success" });
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
    title: "انشاء اعلان",
    action: "اضافة اعلان",
    onAction: handleCreateAd,
    isActionLoading: adsPostOwner.loading,
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
            label="عنوان الاعلان"
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
            label="تفاصيل"
            value={formData.description}
            name="description"
            onChange={onInputChange}
          />
        </Stack>
      </FormCreate>
      <Box margin={2} height={52 * 7 + 58}>
        <DataGrid
          loading={adsGetOwner.loading}
          sx={{ bgcolor: "#222" }}
          rows={adsGetOwner.data}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
        />
      </Box>
    </Box>
  );
};

export default Ads;
