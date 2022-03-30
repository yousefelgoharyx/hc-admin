import { Avatar, Box, Button, IconButton, Modal } from "@mui/material";
import {
  SportsSoccerRounded,
  AddCircleRounded,
  DeleteRounded,
  EditRounded,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import DeleteModal from "./DeleteModal";
import { useRef, useState } from "react";
import CreateModal from "./CreateModal";
import useGet from "../../hooks/useGet";
import Loader from "../../components/Loader";
import { baseURL } from "../../util/axios";

const SportItem = (props) => (
  <SportItemContainer>
    <Avatar
      alt={props.title}
      src={baseURL + "/" + props.image}
      sx={{ width: 150, height: 150 }}
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
  const selectedId = useRef(null);
  const GetOwner = useGet("/api/game");
  const openCreateModal = () => setCreateModal(true);
  const handlePrepareDelete = (id) => {
    setDeleteModal(true);
    selectedId.current = id;
  };
  let content = <Loader />;
  if (!GetOwner.loading && GetOwner.data) {
    content = (
      <SportsContainer>
        <DeleteModal
          refetch={GetOwner.backgroundReload}
          id={selectedId.current}
          open={deleteModal}
          onClose={() => setDeleteModal(false)}
        />
        <CreateModal
          refetch={GetOwner.backgroundReload}
          open={createModal}
          onClose={() => setCreateModal(false)}
        />
        {GetOwner.data.map((item) => (
          <SportItem
            key={item.id}
            title={item.name}
            image={item.image}
            onDelete={() => handlePrepareDelete(item.id)}
          />
        ))}

        <Button
          variant="contained"
          onClick={openCreateModal}
          sx={{ minHeight: 306 }}
        >
          <AddCircleRounded style={{ fontSize: "5em" }} />
        </Button>
      </SportsContainer>
    );
  }
  return content;
};

const SportsContainer = styled(Box)({
  padding: "32px",
  display: "grid",
  gap: "32px",
  gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
});

const SportItemContainer = styled(Box)({
  width: "100%",
  backgroundColor: "#222",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "12px",
  borderRadius: 24,
  position: "relative",
  overflow: "hidden",
  padding: "16px 0",
});

const SportItemText = styled("div")({
  fontWeight: "bold",
  fontSize: "2em",
  alignSelf: "center",
});

const SportsItemControl = styled(Box)({
  padding: 6,
  backgroundColor: "#333",
  display: "flex",
  gap: 8,
  borderRadius: "32px",
});
export default Sports;
