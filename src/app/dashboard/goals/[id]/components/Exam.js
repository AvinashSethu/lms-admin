import PrimaryCard from "@/src/components/PrimaryCard/PrimaryCard";
import { Add, DateRange } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import weekcalendar from "@/public/Icons/weekCalendar.svg";

export default function Exam() {
    return (
        <Stack
      sx={{
        backgroundColor: "var(--white)",
        border: "1px solid",
        borderColor: "var(--border-color)",
        borderRadius: "10px",
        padding: "20px",
        gap:"20px",
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
          Exam Groups
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
          Create
        </Button>
      </Stack>
      <PrimaryCard icon={weekcalendar.src} title="WC 1" actionButton="Delete" subtitle="2 months" />
    </Stack>
    )
}