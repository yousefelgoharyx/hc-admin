import "@fontsource/cairo/400.css";
import "@fontsource/cairo/500.css";
import "@fontsource/cairo/700.css";
import { ThemeProvider, CssBaseline, Zoom } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { SnackbarProvider } from "notistack";
import theme from "./theme";
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin, prefixer],
});
const ThemeRTL = ({ children }) => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          TransitionComponent={Zoom}
          transitionDuration={200}
        >
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeRTL;
