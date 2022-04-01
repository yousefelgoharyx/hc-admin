import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import FormCreate from "../../components/FormCreate";
import useMethod from "../../hooks/useMethod";
import useGet from "../../hooks/useGet";
import Loader from "../../components/Loader";
import RTE from "../../components/RTE";
import Error from "../../components/Error";

const History = () => {
  const [rteValue, setRteValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const onGetComplete = (data) => setRteValue(data.description);
  const PostOwner = useMethod("post");
  const GetOwner = useGet("/api/content/history", onGetComplete);

  const handleUpdate = async () => {
    const data = {
      type: "history",
      description: rteValue,
    };
    try {
      await PostOwner.post("/api/content", data);
      await GetOwner.backgroundReload();
      enqueueSnackbar("تم تحديث تاريخ النادي", { variant: "success" });
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  const formCreateProps = {
    title: "تاريخ النادي",
    action: "تحديث",
    onAction: handleUpdate,
    isActionLoading: PostOwner.loading,
  };

  let content = <Loader />;
  if (!GetOwner.loading) {
    content = (
      <FormCreate {...formCreateProps}>
        <Stack direction="column">
          <RTE value={rteValue} onChange={setRteValue} />
        </Stack>
      </FormCreate>
    );
  }
  return <Box height="100%">{content}</Box>;
};

export default History;
