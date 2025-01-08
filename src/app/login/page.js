import LoginBanner from "@/components/LoginPage/LoginBanner";
import LoginPage from "@/components/LoginPage/LoginPage";
import { Stack, Typography } from "@mui/material";

export default function Login() {
  return (
    <>
    <Stack flexDirection="row">
      <Stack
        width="50%"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <LoginPage />
        <Typography
          sx={{
            marginTop: "auto",
            marginRight: "auto",
            fontFamily: "Lato",
            fontSize: "16px",
            fontWeight: "700",
            color: "var(--text4)",
            padding: "0px 0px 20px 20px",
          }}
        >
          ©2025 @ Incrix Techlutions
        </Typography>
      </Stack>
      <LoginBanner />
      </Stack>
    </>
  );
}
