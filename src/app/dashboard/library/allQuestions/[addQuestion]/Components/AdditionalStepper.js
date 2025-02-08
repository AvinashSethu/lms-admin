import MarkdownEditor from "@/src/components/MarkdownEditor/MarkdownEditor";
import { Add, Delete, DeleteForever } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";

export default function AdditionalStepper() {
  return (
    <Stack gap="20px" alignItems="center">
      <Stack sx={{ border: "1px solid var(--border-color)", width: "100%" }}>
        <Stack flexDirection="row" alignItems="center">
          <Typography paddingLeft="5px">Option 1</Typography>
          <IconButton sx={{ marginLeft: "auto" }}>
            <DeleteForever sx={{ color: "var(--sec-color)" }} />
          </IconButton>
        </Stack>
        <MarkdownEditor />
      </Stack>
      <Button
        variant="contained"
        endIcon={<Add />}
        sx={{
          backgroundColor: "var(--sec-color)",
          textTransform: "none",
          width: "140px",
        }}
        disableElevation
      >
        Add option
      </Button>
    </Stack>
  );
}
