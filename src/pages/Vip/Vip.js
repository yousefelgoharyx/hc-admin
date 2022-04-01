import { Box, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./data";
import FormCreate from "../../components/FormCreate";
import useMethod from "../../hooks/useMethod";
import useGet from "../../hooks/useGet";
import Error from "../../components/Error";
import FileUpload from "../../components/FileUpload";

const newsRequestOptions = {
  headers: { "Content-Type": "multipart/form-data" },
};

const defaultFormDataState = {
  name: "",
  job: "",
  image: null,
  cv: null,
  type: "Influential",
};

const Vip = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(defaultFormDataState);
  const postOwner = useMethod("post", newsRequestOptions);
  const deleteOwner = useMethod("delete");
  const getOwner = useGet("/api/influentialperson/Influential");
  console.log(getOwner);
  const handleCreate = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", formData.image);
    data.append("job", formData.job);
    data.append("cv", formData.cv);
    data.append("type", formData.type);

    try {
      await postOwner.post("/api/influentialperson", data);
      await getOwner.backgroundReload();
      enqueueSnackbar("تمت اضافة شخص بنجاح", { variant: "success" });
      setFormData(defaultFormDataState);
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteOwner.post(`/api/influentialperson/${row.id}`);
      await getOwner.backgroundReload();
      enqueueSnackbar("تم مسح شخص بنجاح", { variant: "success" });
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
    title: "شخصيات هامة",
    action: "اضافة شخص",
    onAction: handleCreate,
    isActionLoading: postOwner.loading,
    image: formData.image,
    setImage: (newImage) => setFormData({ ...formData, image: newImage }),
  };
  if (getOwner.error) return <Error />;
  return (
    <Box>
      <FormCreate {...formCreateProps}>
        <Stack direction="column" spacing={2}>
          <TextField
            variant="outlined"
            fullWidth
            label="اسم الشخصية"
            value={formData.name}
            name="name"
            onChange={onInputChange}
          />

          <TextField
            variant="outlined"
            fullWidth
            label="الوظيفة"
            value={formData.job}
            name="job"
            onChange={onInputChange}
          />
          <FileUpload
            onChange={(newFile) => setFormData({ ...formData, cv: newFile })}
            fileState={formData.cv}
          />
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

export default Vip;
