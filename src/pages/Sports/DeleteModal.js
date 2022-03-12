import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal } from "@mui/material";
import React from "react";
import ModalContent from "../../components/ModalContent";

const DeleteModal = ({ open, onClose, onConfirm, loading }) => {
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
            onClick={onConfirm}
            loading={loading}
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
