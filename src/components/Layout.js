import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomizedList from "./FireSidebar";

export default function Layout({ children }) {
  return (
    <LayoutWrapper>
      <CustomizedList />
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled(Box)({
  width: "100%",
  height: "100vh",
  padding: 0,
  display: "flex",
  overflow: "hidden",
});

const ContentWrapper = styled(Box)({
  flex: 1,
  maxWidth: 1440,
  margin: "0 auto",
  overflow: "auto",
  "::-webkit-scrollbar": {
    width: 6,
  },

  "::-webkit-scrollbar-track": {
    background: "#111",
  },

  "::-webkit-scrollbar-thumb": {
    background: "#333",
  },

  "::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});
