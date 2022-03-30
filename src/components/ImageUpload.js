import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useRef, useState } from "react";

const ImageUpload = ({ onChange }) => {
  const imageInputRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  const onImageInputChange = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      onChange(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => setImagePreview(reader.result);
    }
  };

  return (
    <ImageWrapper onClick={() => imageInputRef.current.click()}>
      <input
        ref={imageInputRef}
        type="file"
        hidden
        onChange={onImageInputChange}
        accept="image/*"
      />
      <img
        src={imagePreview ? imagePreview : "/default.jpg"}
        width={"100%"}
        height={"100%"}
      />
    </ImageWrapper>
  );
};

const ImageWrapper = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  cursor: "pointer",
  overflow: "hidden",
  fontSize: 0,
  width: "100%",
  border: "1px solid #555",
  aspectRatio: "1 / 1",
  alignSelf: "center",
  "@media (min-width: 567px)": {
    maxWidth: 420,
  },
}));

export default ImageUpload;
