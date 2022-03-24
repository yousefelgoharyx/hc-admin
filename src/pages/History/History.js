import { Box, CircularProgress, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import FormCreate from "../../components/FormCreate";
import useMethod from "../../hooks/useMethod";
import useGet from "../../hooks/useGet";
import RichTextEditor from "@mantine/rte";

const RequestOptions = {
  headers: { headers: { "Content-Type": "multipart/form-data" } },
};

const defaultFormDataState = {
  type: "history",
  description: "",
};

const History = () => {
  const [value, onChange] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(defaultFormDataState);
  const PostOwner = useMethod("post", RequestOptions);
  const GetOwner = useGet("/api/content/history", (data) => {
    setFormData((prev) => ({
      ...prev,
      description: data.description,
    }));
  });

  const handleUpdateBio = async () => {
    try {
      await PostOwner.post("/api/content", formData);
      await GetOwner.backgroundReload();
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
    title: "تاريخ النادي",
    action: "تحديث",
    onAction: handleUpdateBio,
    isActionLoading: PostOwner.loading,
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
  if (!GetOwner.loading) {
    content = (
      <FormCreate {...formCreateProps}>
        <Stack direction="column">
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
          {/* <Box style={{ minHeight: 200 }}>
            <RichTextEditor
              value={value}
              onChange={onChange}
              sx={{ flex: 1 }}
            />
          </Box> */}
        </Stack>
      </FormCreate>
    );
  }
  return <Box height="100%">{content}</Box>;
};

export default History;
