import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  InputLabel,
  Modal,
  TextField,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import ModalContent from "../../components/ModalContent";
import useMethod from "../../hooks/useMethod";

const requestOptions = { headers: { "Content-Type": "multipart/form-data" } };

const EditModal = ({ open, onClose, refetch, row }) => {
  const [fTeamScore, setFTeamScore] = useState(row?.fTeamScore);
  const [sTeamScore, setSTeamScore] = useState(row?.sTeamScore);
  useEffect(() => {
    setFTeamScore(row?.fTeamScore);
    setSTeamScore(row?.sTeamScore);
  }, [row]);
  const PostOwner = useMethod("patch", requestOptions);
  const { enqueueSnackbar } = useSnackbar();
  const handleCreate = async () => {
    const data = new FormData();
    data.append("fTeamScore", fTeamScore);
    data.append("sTeamScore", sTeamScore);

    try {
      await PostOwner.post(`/api/matches/${row.id}`, data);
      await refetch();
      enqueueSnackbar("تمت اضافة لعبة بنجاح", { variant: "success" });
      onClose();
    } catch (error) {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <InputLabel>{row?.fTeamName}</InputLabel>
        <Input
          placeholder="نتيحجة الفريق الاول"
          fullWidth
          required={true}
          value={fTeamScore}
          type="number"
          onChange={(e) => setFTeamScore(e.target.value)}
        />
        <Box sx={{ height: 16 }}></Box>
        <InputLabel>{row?.sTeamName}</InputLabel>
        <Input
          placeholder="نتيحجة الفريق الثاني"
          fullWidth
          required={true}
          value={sTeamScore}
          type="number"
          onChange={(e) => setSTeamScore(e.target.value)}
        />

        <Box gap={2} display="flex" mt={3}>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleCreate}
            loading={PostOwner.loading}
          >
            تعديل
          </LoadingButton>
          <Button color="primary" variant="contained" onClick={onClose}>
            الغاء
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};

const Input = styled(TextField)({
  marginTop: 12,
});

export default EditModal;
