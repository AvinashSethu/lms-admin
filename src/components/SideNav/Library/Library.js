import { Stack, Typography } from "@mui/material";

export default function Library() {
  return (
    <>
      <Stack
        sx={{
          width: "180px",
          borderRadius: "6px",
          padding: "12px",
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Lato",                           
            fontSize: "14px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Course Bank
        </Typography>
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "14px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          All Questions
        </Typography>
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "14px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          All Subjects
        </Typography>
      </Stack>
    </>
  );
}
