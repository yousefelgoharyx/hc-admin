import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
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
  image: null,
  phone: "",
  center_id: null,
};

const CenterModerators = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(defaultFormDataState);
  const postOwner = useMethod("post", newsRequestOptions);
  const deleteOwner = useMethod("delete");
  const getOwner = useGet("/api/centerModerators");
  const gamesOwner = useGet("/api/center");

  const handleCreate = async () => {
    const data = new FormData();
    data.append("full_name", formData.name);
    data.append("avatar", formData.image);
    data.append("phone", formData.phone);
    data.append("center_id", formData.center_id);

    try {
      await postOwner.post("/api/centerModerators", data);
      await getOwner.backgroundReload();
      enqueueSnackbar("تمت اضافة مدير بنجاح", { variant: "success" });
      setFormData(defaultFormDataState);
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  const handleDelete = async (row) => {
    if (row.field !== "settings") return;
    try {
      await deleteOwner.post(`/api/centerModerators/${row.id}`);
      await getOwner.backgroundReload();
      enqueueSnackbar("تم مسح مدير بنجاح", { variant: "success" });
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
    title: "مديرين المراكز",
    action: "اضافة مدير",
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
            label="الإسم"
            value={formData.name}
            name="name"
            onChange={onInputChange}
          />

          <TextField
            variant="outlined"
            fullWidth
            label="رقم الهاتف"
            value={formData.phone}
            name="phone"
            onChange={onInputChange}
          />
          <FormControl fullWidth>
            <InputLabel id="team">المركز</InputLabel>
            <Select
              onChange={(e) =>
                setFormData({ ...formData, center_id: e.target.value })
              }
              id="team"
              value={formData.center_id}
              label={
                formData.center_id
                  ? gamesOwner.data.filter(
                      (game) => game.id === formData.center_id
                    )[0].name
                  : null
              }
            >
              {gamesOwner.data
                ? gamesOwner.data.map((game) => (
                    <MenuItem value={game.id}>{game.name}</MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
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

export default CenterModerators;
