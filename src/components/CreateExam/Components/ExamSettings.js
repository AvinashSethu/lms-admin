import { Stack, Switch, Typography } from "@mui/material";
import StyledTextField from "../../StyledTextField/StyledTextField";
import StyledSwitchButton from "../../StyledSwitch/StyledSwitch";

export default function ExamSettings() {
  return (
    <Stack gap="20px" marginTop="20px" padding="10px">
      <Stack gap="15px">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "14px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Title
        </Typography>
        <StyledTextField placeholder="Placement" />
      </Stack>
      <Stack flexDirection="row" gap={10}>
        <Stack gap="10px">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "700",
              color: "var(--text3)",
            }}
          >
            Exam duration in mins
          </Typography>
          <StyledTextField
            placeholder="Enter Duration"
            sx={{ width: "220px" }}
          />
        </Stack>

        <Stack gap="10px">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "700",
              color: "var(--text3)",
            }}
          >
            Select Date & Time
          </Typography>
          <StyledTextField
            placeholder="Enter Date & Time"
            sx={{ width: "400px" }}
          />
        </Stack>
        <Stack gap="10px">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "700",
              color: "var(--text3)",
            }}
          >
            Show results to canditate
          </Typography>
          <StyledSwitchButton />
        </Stack>
      </Stack>
      <Stack flexDirection="row" gap={10}>
        <Stack gap="10px">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "700",
              color: "var(--text3)",
            }}
          >
            Marks per question
          </Typography>
          <StyledTextField placeholder="Enter marks" sx={{ width: "220px" }} />
        </Stack>

        <Stack gap="10px">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "700",
              color: "var(--text3)",
            }}
          >
            Negative marks
          </Typography>
          <StyledTextField placeholder="Enter marks" sx={{ width: "220px" }} />
        </Stack>
      </Stack>
    </Stack>
  );
}
