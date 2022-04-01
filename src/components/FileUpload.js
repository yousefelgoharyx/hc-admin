import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useRef, useState } from "react";

const FileUpload = ({ onChange, fileState }) => {
  const imageInputRef = useRef();
  const onImageInputChange = (e) => {
    if (e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <ImageWrapper onClick={() => imageInputRef.current.click()}>
      <input
        ref={imageInputRef}
        type="file"
        hidden
        onChange={onImageInputChange}
      />
      <div>{fileState ? fileState.name : "السيرة الذاتية"}</div>
    </ImageWrapper>
  );
};

const ImageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#222",
  height: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  cursor: "pointer",
  borderRadius: 12,
}));

export default FileUpload;
