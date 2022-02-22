import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { enqueueSnackbar } = useSnackbar();
  const handleLogin = async () => {
    try {
      await auth.signin(loginData);
      let from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch {
      enqueueSnackbar("حدث خطأ ما", { variant: "error" });
    }
  };

  if (auth.user) return <Navigate to="/" />;

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      flex={1}
      height="100vh"
      display="flex"
      maxWidth={550}
      margin="0 auto"
    >
      <Stack width="100%" paddingX={8} gap={2}>
        <TextField
          placeholder="البريد الالكتروني"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <TextField
          placeholder="كلمة المرور"
          type="password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <LoadingButton
          size="large"
          variant="contained"
          onClick={handleLogin}
          loading={auth.loading}
        >
          تسجيل دخول
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default Login;
