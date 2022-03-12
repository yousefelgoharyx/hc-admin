import { LoadingButton } from "@mui/lab";
import { Box, Button, Checkbox, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import ModalContent from "../../components/ModalContent";

const CreateModal = ({ open, onClose, onConfirm, loading }) => {
  const [gameName, setGameName] = useState("");
  const [multi, setMulti] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: gameName,
      multi: multi,
    };
    console.log(data);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="اسم اللعبة"
            fullWidth
            required={true}
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            mt={3}
            color="#999"
            sx={{ userSelect: "none" }}
          >
            <Checkbox
              sx={{ padding: 0 }}
              checked={multi}
              onChange={(e) => setMulti(e.target.checked)}
            />
            لعبة جماعية
          </Box>
          <Box gap={2} display="flex" mt={3}>
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              loading={loading}
            >
              انشاء
            </LoadingButton>
            <Button color="primary" variant="contained" onClick={onClose}>
              الغاء
            </Button>
          </Box>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
