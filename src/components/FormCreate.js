import { LoadingButton } from "@mui/lab";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
let reader = new FileReader();
const FormCreate = (props) => {
  const {
    title,
    action,
    onAction,
    isActionLoading,
    image,
    setImage,
    children,
  } = props;
  const imageInputRef = useRef();
  const imageRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);
  const onImageInputChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => setImagePreview(reader.result);
    }
  };

  return (
    <Container elevation={1}>
      <Title variant="h5">{title}</Title>
      <Spacer />
      <BodyWrapper>
        {image !== undefined ? (
          <ImageWrapper onClick={() => imageInputRef.current.click()}>
            <input
              ref={imageInputRef}
              type="file"
              hidden
              onChange={onImageInputChange}
              accept="image/*"
            />
            <img
              src={imagePreview && image ? imagePreview : "/default.jpg"}
              width={"100%"}
              height={"100%"}
            />
          </ImageWrapper>
        ) : null}
        <Body>{children}</Body>
      </BodyWrapper>

      <Spacer />
      <FooterWrapper>
        <ActionButton
          variant="contained"
          loading={isActionLoading}
          onClick={onAction}
        >
          {action}
        </ActionButton>
      </FooterWrapper>
    </Container>
  );
};
const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  margin: theme.spacing(2),
}));

const Title = styled(Typography)(() => ({
  marginBottom: 0,
  fontWeight: "bold",
}));

const Spacer = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const BodyWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(4),
  flexDirection: "row",
  alignItems: "flex-start",
  flexWrap: "wrap",
}));

const Body = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  flex: 1,
  minWidth: 200,
}));

const FooterWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  flexDirection: "row",
  alignItems: "flex-start",
}));

const ActionButton = styled(LoadingButton)({
  minWidth: 200,
});

const ImageWrapper = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  cursor: "pointer",
  overflow: "hidden",
  fontSize: 0,
  width: "100%",
  border: "1px solid #555",
  aspectRatio: "1 / 1",
  "@media (min-width: 567px)": {
    maxWidth: 280,
  },
}));

export default FormCreate;
