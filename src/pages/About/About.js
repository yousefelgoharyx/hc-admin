import { Box, CircularProgress, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import FormCreate from "../../components/FormCreate";
import useMethod from "../../hooks/useMethod";
import useGet from "../../hooks/useGet";

const aboutRequestOptions = {
  headers: { headers: { "Content-Type": "multipart/form-data" } },
};

const defaultFormDataState = {
  type: "about",
  description: "",
};

const About = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(defaultFormDataState);
  const aboutPostOwner = useMethod("post", aboutRequestOptions);
  const aboutGetOwner = useGet("/api/content/about", (data) => {
    setFormData((prev) => ({
      ...prev,
      description: data.description,
    }));
  });

  const handleUpdateBio = async () => {
    try {
      await aboutPostOwner.post("/api/content", formData);
      await aboutGetOwner.backgroundReload();
      enqueueSnackbar("تم تحديث عن النادي", { variant: "success" });
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  const onInputChange = (e) => {
    const newFormData = { ...formData };
    const inputKey = e.target.name;
    newFormData[inputKey] = e.target.value;
    setFormData(newFormData);
  };

  const formCreateProps = {
    title: "عن النادي",
    action: "تحديث",
    onAction: handleUpdateBio,
    isActionLoading: aboutPostOwner.loading,
  };

  let content = (
    <Box
      display="flex"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
  if (!aboutGetOwner.loading) {
    content = (
      <FormCreate {...formCreateProps}>
        <Stack direction="row">
          <TextField
            variant="outlined"
            multiline
            rows={8}
            fullWidth
            label="اكتب هنا..."
            value={formData.description}
            name="description"
            onChange={onInputChange}
          />
        </Stack>
      </FormCreate>
    );
  }
  return <Box height="100%">{content}</Box>;
};

export default About;
