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
  logo: null,
  gameId: null,
};

const Team = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(defaultFormDataState);
  const postOwner = useMethod("post", newsRequestOptions);
  const deleteOwner = useMethod("delete");
  const getOwner = useGet("/api/team");
  const gamesOwner = useGet("/api/game");

  const handleCreate = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("logo", formData.logo);
    data.append("gameId", formData.gameId);

    try {
      await postOwner.post("/api/team", data);
      await getOwner.backgroundReload();
      enqueueSnackbar("تمت اضافة الفرقة بنجاح", { variant: "success" });
      setFormData(defaultFormDataState);
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteOwner.post(`/api/team/${row.id}`);
      await getOwner.backgroundReload();
      enqueueSnackbar("تم مسح الفرقة بنجاح", { variant: "success" });
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
    title: "الفرق",
    action: "اضافة فرقة",
    onAction: handleCreate,
    isActionLoading: postOwner.loading,
    image: formData.logo,
    setImage: (newImage) => setFormData({ ...formData, logo: newImage }),
  };
  if (getOwner.error) return <Error />;
  return (
    <Box>
      <FormCreate {...formCreateProps}>
        <Stack direction="column" spacing={2}>
          <TextField
            variant="outlined"
            fullWidth
            label="اسم الفرقة"
            value={formData.name}
            name="name"
            onChange={onInputChange}
          />

          <FormControl fullWidth>
            <InputLabel id="team">اللعبة</InputLabel>
            <Select
              onChange={(e) =>
                setFormData({ ...formData, gameId: e.target.value })
              }
              id="team"
              value={formData.gameId}
              label={
                formData.gameId
                  ? gamesOwner.data.filter(
                      (game) => game.id === formData.gameId
                    ).name
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

export default Team;
