import { Avatar, Box, Button, IconButton, Modal } from "@mui/material";
import {
  SportsSoccerRounded,
  AddCircleRounded,
  DeleteRounded,
  EditRounded,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import CreateModal from "./CreateModal";

const SportItemContainer = styled(Box)({
  width: "100%",
  aspectRatio: "1 / 1",
  backgroundColor: "#222",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "16px",
  borderRadius: 8,
  position: "relative",
  overflow: "hidden",
});

const SportItemText = styled("div")({
  fontWeight: "bold",
  fontSize: "2em",
  alignSelf: "center",
});

const SportsItemControl = styled(Box)({
  position: "absolute",
  bottom: 16,
  left: 16,
  padding: 6,
  backgroundColor: "#333",
  display: "flex",
  gap: 8,
  borderRadius: "32px",
});

const SportItem = (props) => (
  <SportItemContainer>
    {/* <props.icon style={{ fontSize: "6em" }} /> */}
    <Avatar
      alt="Remy Sharp"
      src="https://reactjs.org/logo-og.png"
      sx={{ width: 100, height: 100 }}
    />
    <SportItemText>{props.title}</SportItemText>
    <SportsItemControl>
      <IconButton onClick={props.onDelete}>
        <DeleteRounded />
      </IconButton>
      <IconButton onClick={props.onEdit}>
        <EditRounded />
      </IconButton>
    </SportsItemControl>
  </SportItemContainer>
);

const Sports = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const handleDelete = () => {
    setDeleteModal(true);
  };
  const handleCreate = () => {
    setCreateModal(true);
  };
  return (
    <SportsContainer>
      <DeleteModal
        open={deleteModal}
        onConfirm={handleDelete}
        onClose={() => setDeleteModal(false)}
      />
      <CreateModal
        open={createModal}
        onConfirm={handleCreate}
        onClose={() => setCreateModal(false)}
      />
      <SportItem
        title="كرة قدم"
        icon={SportsSoccerRounded}
        onDelete={() => setDeleteModal(true)}
      />
      <SportItem title="كرة سلة" icon={SportsSoccerRounded} />
      <SportItem title="جودو" icon={SportsSoccerRounded} />
      <SportItem title="كاراتيه" icon={SportsSoccerRounded} />
      <SportItem title="سباحة" icon={SportsSoccerRounded} />
      <Button variant="contained" onClick={() => setCreateModal(true)}>
        <AddCircleRounded style={{ fontSize: "5em" }} />
      </Button>
    </SportsContainer>
  );
};

const SportsContainer = styled(Box)({
  padding: "32px",
  display: "grid",
  gap: "32px",
  gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
});

export default Sports;
