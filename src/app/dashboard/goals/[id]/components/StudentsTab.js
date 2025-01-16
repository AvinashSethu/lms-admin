import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { Add, InsertDriveFile } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

export default function StudentsTab() {
  const menuOptions = ["subject1", "subject2"];
  return (
    <Stack
      sx={{
        backgroundColor: "var(--white)",
        border: "1px solid",
        borderColor: "var(--border-color)",
        borderRadius: "10px",
        padding: "20px",
        gap:"20px"
      }}
    >
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "16px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Subject
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            width: "120px",
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
          }}
          disableElevation
        >
          Subject
        </Button>
      </Stack>
      <Stack flexWrap="wrap" flexDirection="row" rowGap="20px" columnGap="50px"> 
      <SecondaryCard
        icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
        title="Numerical Ability" options={menuOptions}
      />
      <SecondaryCard
        icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
        title="Simplifications & simple equations" options={menuOptions}
      />
      <SecondaryCard
        icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
        title="Blood Relations and Coding & Decoding" options={menuOptions}
      />
      <SecondaryCard
        icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
        title="Logical reasoning" options={menuOptions}
      />
      </Stack>
    </Stack>
  );
}
