import { Box, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./data";
import FormCreate from "../../components/FormCreate";
import useMethod from "../../hooks/useMethod";
import useGet from "../../hooks/useGet";
import RTE from "../../components/RTE";
import Error from "../../components/Error";

const requestOptions = {
  headers: { "Content-Type": "multipart/form-data" },
};

const defaultFormDataState = {
  title: "",
  image: null,
};

const Ads = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(defaultFormDataState);
  const [rteValue, setRteValue] = useState("");
  const postOwner = useMethod("post", requestOptions);
  const deleteOwner = useMethod("delete");
  const getOwner = useGet("/api/ads");

  const handleCreate = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", rteValue);
    data.append("image", formData.image);
    try {
      await postOwner.post("/api/ads", data);
      await getOwner.backgroundReload();
      enqueueSnackbar("تمت اضافة اعلان بنجاح", { variant: "success" });
      setFormData(defaultFormDataState);
      setRteValue("");
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteOwner.post(`/api/ads/${row.id}`);
      await getOwner.backgroundReload();
      enqueueSnackbar("تم مسح الاعلان بنجاح", { variant: "success" });
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
    onAction: handleCreate,
    isActionLoading: postOwner.loading,
    image: formData.image,
    setImage: (newImage) => setFormData({ ...formData, image: newImage }),
  };
  if (getOwner.error) return <Error />;
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
          <RTE value={rteValue} onChange={setRteValue} />
        </Stack>
      </FormCreate>
      <Box margin={2} height={52 * 7 + 58}>
        <DataGrid
          disableSelectionOnClick
          disableVirtualization
          showCellRightBorder={false}
          onCellClick={handleDelete}
          loading={getOwner.loading || deleteOwner.loading}
          sx={{ bgcolor: "#222" }}
          rows={getOwner.data}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
        />
      </Box>
    </Box>
  );
};

export default Ads;
