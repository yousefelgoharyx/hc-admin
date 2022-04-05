import { DeleteRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import FormCreate from "../../components/FormCreate";
import RTE from "../../components/RTE";
import useGet from "../../hooks/useGet";
import useMethod from "../../hooks/useMethod";
import { columns } from "./data";

const CenterServices = () => {
  const [phones, setPhones] = useState([]);
  const [phoneValue, setPhoneValue] = useState("");

  const [email, setemail] = useState([]);
  const [emailValue, setemailValue] = useState("");

  const [name, setName] = useState("");
  const [brief, setBrief] = useState("");
  const [centerId, setcenterId] = useState(null);

  const PostOwner = useMethod("post");
  const getOwner = useGet("/api/service");
  const deleteOwner = useMethod("delete");
  const gamesOwner = useGet("/api/center");

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (row) => {
    if (row.field !== "settings") return;
    try {
      await deleteOwner.post(`/api/service/${row.id}`);
      await getOwner.backgroundReload();
      enqueueSnackbar("تم مسح الخدمة بنجاح", { variant: "success" });
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  const handleAddCenter = async () => {
    const data = {
      name,
      description: brief,
      schedule: phones,
      requirements: email,
      center_id: centerId,
    };
    try {
      await PostOwner.post("/api/service", data);
      enqueueSnackbar("تمت اضافة خدمة بنجاح", { variant: "success" });
      setName("");
      setBrief("");
      setPhones([]);
      setemail([]);
      await getOwner.backgroundReload();
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  const handleAddphone = (e) => {
    if (phoneValue.length > 0) {
      setPhones([...phones, phoneValue]);
      setPhoneValue("");
    }
  };
  const handleDeletephone = (index) => {
    setPhones(phones.filter((_, i) => i !== index));
  };

  const handleAddemail = () => {
    if (emailValue.length > 0) {
      setemail([...email, emailValue]);
      setemailValue("");
    }
  };
  const handleDeleteemail = (index) => {
    setemail(email.filter((_, i) => i !== index));
  };
  return (
    <div>
      <FormCreate
        action="اضافة"
        title="إضافة خدمة"
        onAction={handleAddCenter}
        isActionLoading={PostOwner.loading}
      >
        <Stack gap={2}>
          <TextField
            placeholder="اسم الخدمة"
            fullWidth
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <RTE value={brief} onChange={setBrief} />

          {/* Phone */}
          <Stack direction="row" gap={2}>
            <TextField
              onChange={(e) => setPhoneValue(e.target.value)}
              value={phoneValue}
              placeholder="إضافة المواعيد"
              fullWidth
              required={true}
            />
            <Button onClick={handleAddphone}> إضافة</Button>
          </Stack>
          <Stack direction="row" gap={2}>
            {phones.map((phones, index) => (
              <Chip
                key={index}
                label={phones}
                variant="outlined"
                size="medium"
                deleteIcon={<DeleteRounded />}
                onDelete={() => handleDeletephone(index)}
              />
            ))}
          </Stack>
          {/* Phone */}

          {/* email */}
          <Stack direction="row" gap={2}>
            <TextField
              onChange={(e) => setemailValue(e.target.value)}
              value={emailValue}
              placeholder="إضافة متطلبات"
              fullWidth
              required={true}
            />
            <Button onClick={handleAddemail}> إضافة</Button>
          </Stack>
          <Stack direction="row" gap={2}>
            {email.map((email, index) => (
              <Chip
                key={index}
                label={email}
                variant="outlined"
                size="medium"
                deleteIcon={<DeleteRounded />}
                onDelete={() => handleDeleteemail(index)}
              />
            ))}
          </Stack>
          {/* email */}
          <FormControl fullWidth>
            <InputLabel id="team">المركز</InputLabel>
            <Select
              onChange={(e) => setcenterId(e.target.value)}
              id="team"
              value={centerId}
              label={
                centerId
                  ? gamesOwner.data.filter((game) => game.id === centerId)[0]
                      .name
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
    </div>
  );
};

export default CenterServices;
