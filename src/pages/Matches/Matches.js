import { DateTimePicker, LoadingButton, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";
import ImageUpload from "../../components/ImageUpload";
import useGet from "../../hooks/useGet";
import useMethod from "../../hooks/useMethod";
import { columns } from "./data";
import EditModal from "./EditModal";

const newsRequestOptions = {
  headers: { "Content-Type": "multipart/form-data" },
};

const defaultFormDataState = {
  fTeamImage: null,
  sTeamImage: null,
  fTeamName: "",
  sTeamName: "",
  fTeamScore: 0,
  sTeamScore: 0,
  matchTime: new Date(),
  location: "",
};

const Matches = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(defaultFormDataState);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const postOwner = useMethod("post", newsRequestOptions);
  const deleteOwner = useMethod("delete");
  const getOwner = useGet("/api/matches");

  const onInputChange = (e) => {
    const newFormData = { ...formData };
    const inputKey = e.target.name;
    newFormData[inputKey] = e.target.value;
    setFormData(newFormData);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("fTeamImage", formData.fTeamImage);
    data.append("sTeamImage", formData.sTeamImage);
    data.append("fTeamName", formData.fTeamName);
    data.append("sTeamName", formData.sTeamName);
    data.append("fTeamScore", formData.fTeamScore);
    data.append("sTeamScore", formData.sTeamScore);
    data.append("matchTime", formData.matchTime);
    data.append("location", formData.location);
    try {
      await postOwner.post("/api/matches", data);
      setFormData(defaultFormDataState);
      getOwner.backgroundReload();
      enqueueSnackbar("تمت اضافة مبارة بنجاح", { variant: "success" });
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };
  const handleCellClick = (row) => {
    if (row.field === "delete") {
      handleDelete(row);
    } else if (row.field === "edit") {
      setSelectedRow(row.row);
      setOpen(true);
    }
  };
  const handleDelete = async (row) => {
    try {
      await deleteOwner.post(`/api/matches/${row.id}`);
      await getOwner.backgroundReload();
      enqueueSnackbar("تم مسح الخبر بنجاح", { variant: "success" });
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };
  return (
    <Stack>
      <EditModal
        open={open}
        onClose={() => setOpen(false)}
        refetch={getOwner.backgroundReload}
        row={selectedRow}
      />
      <Box sx={{ backgroundColor: "#222" }} p={4} m={4} borderRadius={2}>
        <Stack justifyContent="center">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Stack gap={2}>
              <ImageUpload
                onChange={(fImage) => {
                  setFormData({ ...formData, fTeamImage: fImage });
                }}
              />
              <TextField
                variant="outlined"
                fullWidth
                label="الفريف الاول"
                value={formData.fTeamName}
                name="fTeamName"
                onChange={onInputChange}
              />
            </Stack>

            <Stack alignSelf="center" gap={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  value={formData.matchTime}
                  onChange={(newValue) => {
                    setFormData({ ...formData, matchTime: newValue });
                  }}
                />
              </LocalizationProvider>
              <TextField
                variant="outlined"
                fullWidth
                label="إسم المكان"
                value={formData.location}
                name="location"
                onChange={onInputChange}
              />
            </Stack>

            <Stack gap={2}>
              <ImageUpload
                onChange={(sImage) => {
                  setFormData({ ...formData, sTeamImage: sImage });
                }}
              />
              <TextField
                variant="outlined"
                fullWidth
                label="الفريق الثاني"
                value={formData.sTeamName}
                name="sTeamName"
                onChange={onInputChange}
              />
            </Stack>
          </Stack>
          <LoadingButton
            onClick={handleCreate}
            loading={postOwner.loading}
            disabled={postOwner.loading}
            sx={{ marginTop: 4 }}
            size="large"
            variant="contained"
          >
            اضافة
          </LoadingButton>
        </Stack>
      </Box>

      <Box margin={2} height={52 * 7 + 58}>
        <DataGrid
          loading={getOwner.loading}
          sx={{ bgcolor: "#222" }}
          rows={getOwner.data}
          columns={columns}
          onCellClick={handleCellClick}
          pageSize={6}
          rowsPerPageOptions={[6]}
        />
      </Box>
    </Stack>
  );
};

export default Matches;
