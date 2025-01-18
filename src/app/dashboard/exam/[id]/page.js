import { Button, Stack, Typography } from "@mui/material";
import GoalHead from "../../goals/[id]/components/GoalHead/GoalHead";
import { Add, CalendarMonth, InsertDriveFile, PushPin, Weekend } from "@mui/icons-material";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";

export default function exam() {
    const menuOptions = ["subject1", "subject2"];
  return (
    <Stack padding="20px" gap="15px">
      <GoalHead />
      <Stack
        sx={{
          backgroundColor: "var(--white)",
          border: "1px solid",
          borderColor: "var(--border-color)",
          borderRadius: "10px",
          padding: "20px",
          gap: "20px",
          minHeight: "100vh",
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
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            Subject
          </Button>
        </Stack>
        <Stack
          flexWrap="wrap"
          flexDirection="row"
          rowGap="20px"
          columnGap="50px"
        >
          <SecondaryCard
            icon={<CalendarMonth sx={{ color: "var(--sec-color)" }} />}
            title="Weekly Test"
            options={menuOptions}
            cardWidth="100%"
            subTitle="05/01/25 to 06/02/25"
          />
          <SecondaryCard
            icon={<CalendarMonth sx={{ color: "var(--sec-color)" }} />}
            title="Monthly Test"
            options={menuOptions}
            cardWidth="100%"
            subTitle="05/01/25 to 06/02/25"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
