import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

export default function Questions() {
  return (
    <Stack marginTop="20px" gap="15px">
      <Stack flexDirection="row" gap="15px">
        <Button
          variant="contained"
          endIcon={<Add />}
          sx={{
            width: "120px",
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
            fontFamily: "Lato",
          }}
          disableElevation
        >
          Section
        </Button>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            border: "1px solid",
            borderColor: "var(--border-color)",
            width: "150px",
            borderRadius: "4px",
            padding: "0px 15px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              color: "var(--sec-color)",
              fontWeight: "500",
            }}
          >
            Selected
          </Typography>
          <Typography
            sx={{ fontFamily: "Lato", fontSize: "14px", color: "var(--text4)" }}
          >
            5
          </Typography>
        </Stack>
      </Stack>
      
    </Stack>
  );
}
