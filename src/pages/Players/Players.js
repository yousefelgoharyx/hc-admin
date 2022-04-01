import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import FormCreate from "../../components/FormCreate";
import useMethod from "../../hooks/useMethod";
import useGet from "../../hooks/useGet";

import FileUpload from "../../components/FileUpload";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const newsRequestOptions = {
  headers: { "Content-Type": "multipart/form-data" },
};

const defaultFormDataState = {
  name: "",
  image: null,
  cv: null,
  gameId: null,
  teamId: null,
};

const Players = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(defaultFormDataState);
  const postOwner = useMethod("post", newsRequestOptions);
  const gamesOwner = useGet("/api/game");
  const teamsOwner = useGet("/api/team");
  const handleCreate = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", formData.image);
    data.append("cv", formData.cv);
    data.append("gameId", formData.gameId);

    try {
      await postOwner.post("/api/player", data);
      enqueueSnackbar("تمت اضافة مدير بنجاح", { variant: "success" });
      setFormData(defaultFormDataState);
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
    title: "اللاعبين",
    action: "اضافة لاعب",
    onAction: handleCreate,
    isActionLoading: postOwner.loading,
    image: formData.image,
    setImage: (newImage) => setFormData({ ...formData, image: newImage }),
  };

  let content = <Loader />;
  if (gamesOwner.error || teamsOwner.error) {
    content = <Error />;
  }
  if (gamesOwner.data && teamsOwner.data) {
    console.log(gamesOwner.data.filter((game) => game.id === formData.gameId));
    content = (
      <Box>
        <FormCreate {...formCreateProps}>
          <Stack direction="column" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="اسم اللاعب"
              value={formData.name}
              name="name"
              onChange={onInputChange}
            />

            <FileUpload
              onChange={(newFile) => setFormData({ ...formData, cv: newFile })}
              fileState={formData.cv}
            />
            <FormControl fullWidth>
              <InputLabel id="team">اللعبة</InputLabel>
              <Select
                onChange={(e) =>
                  setFormData({ ...formData, gameId: e.target.value })
                }
                id="team"
                value={formData.gameId}
                label={
                  gamesOwner.data.filter((game) => game.id === formData.gameId)
                    .name
                }
              >
                {gamesOwner.data.map((game) => (
                  <MenuItem value={game.id}>{game.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {formData.gameId &&
              gamesOwner.data.filter((game) => game.id === formData.gameId)[0]
                .type === "multi" && (
                <FormControl fullWidth>
                  <InputLabel id="team">اللعبة</InputLabel>
                  <Select
                    onChange={(e) =>
                      setFormData({ ...formData, teamId: e.target.value })
                    }
                    id="team"
                    value={formData.teamId}
                    label={
                      teamsOwner.data.filter(
                        (team) => team.id === formData.teamId
                      ).name
                    }
                  >
                    {teamsOwner.data
                      .filter((team) => team.game.id === formData.gameId)
                      .map((team) => (
                        <MenuItem value={team.id}>{team.name}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
          </Stack>
        </FormCreate>
      </Box>
    );
  }
  return content;
};

export default Players;
