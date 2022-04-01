import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import ModalContent from "../../components/ModalContent";
import useMethod from "../../hooks/useMethod";

const DeleteModal = ({ open, onClose, id, refetch }) => {
  const DeleteOwner = useMethod("delete");
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = async () => {
    try {
      await DeleteOwner.post(`/api/game/${id}`);
      await refetch();
      enqueueSnackbar("تم حذف اللعبة بنجاح", { variant: "success" });
      onClose();
    } catch (error) {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <h3 style={{ marginBottom: 32, marginTop: 0, fontWeight: 400 }}>
          هل انت متاكد انك تريد مسح هذه اللعبة
        </h3>
        <Box gap={2} display="flex">
          <LoadingButton
            color="error"
            variant="contained"
            onClick={handleDelete}
            loading={DeleteOwner.loading}
          >
            تاكيد
          </LoadingButton>
          <Button color="primary" variant="contained" onClick={onClose}>
            الغاء
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
