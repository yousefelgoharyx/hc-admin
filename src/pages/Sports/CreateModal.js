import { LoadingButton } from "@mui/lab";
import { Box, Button, Checkbox, Modal, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import ImageUpload from "../../components/ImageUpload";
import ModalContent from "../../components/ModalContent";
import useMethod from "../../hooks/useMethod";

const requestOptions = { headers: { "Content-Type": "multipart/form-data" } };

const CreateModal = ({ open, onClose, refetch }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [multi, setMulti] = useState(false);
  const PostOwner = useMethod("post", requestOptions);
  const { enqueueSnackbar } = useSnackbar();
  const handleCreate = async (e) => {
    if (!name || !image) {
      enqueueSnackbar("يجب املاء جميع الحقول", { variant: "warning" });
      return;
    }
    const data = new FormData();
    data.append("name", name);
    data.append("image", image);
    data.append("type", multi ? "multi" : "single");
    try {
      await PostOwner.post("/api/game", data);
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
        <ImageUpload onChange={(newImage) => setImage(newImage)} />
        <Input
          placeholder="اسم اللعبة"
          fullWidth
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CheckboxContainer>
          <Checkbox
            sx={{ padding: 0 }}
            checked={multi}
            onChange={(e) => setMulti(e.target.checked)}
          />
          لعبة جماعية
        </CheckboxContainer>
        <Box gap={2} display="flex" mt={3}>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleCreate}
            loading={PostOwner.loading}
          >
            انشاء
          </LoadingButton>
          <Button color="primary" variant="contained" onClick={onClose}>
            الغاء
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};

const CheckboxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(3),
  color: "#999",
  userSelect: "none",
}));

const Input = styled(TextField)({
  marginTop: 12,
});

export default CreateModal;
