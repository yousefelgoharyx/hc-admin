import { createTheme } from "@mui/material";

const theme = createTheme({
  direction: "rtl",

  typography: {
    fontFamily: "Cairo",
    lineHeight: 1.6,
  },
  palette: {
    mode: "dark",
    primary: { main: "rgb(102, 157, 246)" },
    background: { paper: "#222", default: "#111" },
  },
});
export default theme;
