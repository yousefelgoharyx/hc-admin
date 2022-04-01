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
import RTE from "../../components/RTE";
import FileUpload from "../../components/FileUpload";
import Error from "../../components/Error";

const newsRequestOptions = {
  headers: { "Content-Type": "multipart/form-data" },
};

const defaultFormDataState = {
  name: "",
  image: null,
  cv: null,
  type: "",
  teamId: null,
};

const TeamModerators = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(defaultFormDataState);
  const postOwner = useMethod("post", newsRequestOptions);
  const deleteOwner = useMethod("delete");
  const getOwner = useGet("/api/teammoderator");
  const teamsOwner = useGet("/api/team");

  const handleCreate = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", formData.image);
    data.append("type", formData.type);
    data.append("cv", formData.cv);
    data.append("teamId", formData.teamId);

    try {
      await postOwner.post("/api/teammoderator", data);
      await getOwner.backgroundReload();
      enqueueSnackbar("تمت اضافة مدير بنجاح", { variant: "success" });
      setFormData(defaultFormDataState);
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteOwner.post(`/api/teammoderator/${row.id}`);
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
    title: "مديرين الفرق",
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
            label="اسم المدير"
            value={formData.name}
            name="name"
            onChange={onInputChange}
          />

          <TextField
            variant="outlined"
            fullWidth
            label="الوظيفة"
            value={formData.type}
            name="type"
            onChange={onInputChange}
          />
          <FileUpload
            onChange={(newFile) => setFormData({ ...formData, cv: newFile })}
            fileState={formData.cv}
          />
          <FormControl fullWidth>
            <InputLabel id="team">الفرقة</InputLabel>
            <Select
              onChange={(e) =>
                setFormData({ ...formData, teamId: e.target.value })
              }
              id="team"
              value={formData.teamId}
              label={
                formData.teamId
                  ? teamsOwner.data.filter(
                      (team) => team.id === formData.teamId
                    )[0].name
                  : null
              }
            >
              {teamsOwner.data
                ? teamsOwner.data.map((team) => (
                    <MenuItem value={team.id}>{team.name}</MenuItem>
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

export default TeamModerators;
