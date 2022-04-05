import { DeleteRounded } from "@mui/icons-material";
import { Box, Button, Chip, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import FormCreate from "../../components/FormCreate";
import RTE from "../../components/RTE";
import useGet from "../../hooks/useGet";
import useMethod from "../../hooks/useMethod";
import { columns } from "./data";

const Center = () => {
  const [times, setTimes] = useState([]);
  const [timesValue, setTimesValue] = useState("");

  const [phones, setPhones] = useState([]);
  const [phoneValue, setPhoneValue] = useState("");

  const [email, setemail] = useState([]);
  const [emailValue, setemailValue] = useState("");

  const [name, setName] = useState("");
  const [brief, setBrief] = useState("");

  const PostOwner = useMethod("post");
  const getOwner = useGet("/api/center");
  const deleteOwner = useMethod("delete");

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (row) => {
    if (row.field !== "settings") return;
    try {
      await deleteOwner.post(`/api/center/${row.id}`);
      await getOwner.backgroundReload();
      enqueueSnackbar("تم مسح الخبر بنجاح", { variant: "success" });
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  const handleAddCenter = async () => {
    const data = {
      name,
      brief,
      schedule: times,
      phone: phones,
      email: email,
    };
    try {
      await PostOwner.post("/api/center", data);
      enqueueSnackbar("تمت اضافة مركز بنجاح", { variant: "success" });
      setName("");
      setBrief("");
      setTimes([]);
      setPhones([]);
      setemail([]);
      await getOwner.backgroundReload();
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  const handleAddTime = (e) => {
    if (timesValue.length > 0) {
      setTimes([...times, timesValue]);
      setTimesValue("");
    }
  };
  const handleDeleteTime = (index) => {
    setTimes(times.filter((_, i) => i !== index));
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
        title="إضافة مركز"
        onAction={handleAddCenter}
        isActionLoading={PostOwner.loading}
      >
        <Stack gap={2}>
          <TextField
            placeholder="اسم المركز"
            fullWidth
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <RTE value={brief} onChange={setBrief} />

          {/* Times */}
          <Stack direction="row" gap={2}>
            <TextField
              onChange={(e) => setTimesValue(e.target.value)}
              value={timesValue}
              placeholder="إضافة ميعاد"
              fullWidth
              required={true}
            />
            <Button onClick={handleAddTime}> إضافة</Button>
          </Stack>
          <Stack direction="row" gap={2}>
            {times.map((time, index) => (
              <Chip
                key={index}
                label={time}
                variant="outlined"
                size="medium"
                deleteIcon={<DeleteRounded />}
                onDelete={() => handleDeleteTime(index)}
              />
            ))}
          </Stack>
          {/* Times */}

          {/* Phone */}
          <Stack direction="row" gap={2}>
            <TextField
              onChange={(e) => setPhoneValue(e.target.value)}
              value={phoneValue}
              placeholder="إضافة رقم هاتف"
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
              placeholder="إضافة بريد الكتروني"
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

export default Center;
