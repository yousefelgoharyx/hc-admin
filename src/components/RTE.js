import React from "react";
import { MantineProvider } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
const RTE = ({ ...rest }) => {
  return (
    <MantineProvider theme={{ colorScheme: "dark", dir: "rtl" }}>
      <RichTextEditor sx={{ width: "100%", minHeight: "300px" }} {...rest} />
    </MantineProvider>
  );
};

export default RTE;
