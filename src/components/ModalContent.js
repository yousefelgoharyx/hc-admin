import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const ModalContentContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#222",
  boxShadow: 24,
  padding: 32,
  borderRadius: 8,
});
const ModalContent = ({ children }) => {
  return <ModalContentContainer>{children}</ModalContentContainer>;
};

export default ModalContent;
