import { FormControl, InputLabel, MenuItem, Select, Stack, Switch, Typography } from "@mui/material";
import StyledTextField from "../../StyledTextField/StyledTextField";
import StyledSwitchButton from "../../StyledSwitch/StyledSwitch";

export default function TestSeriesSettings() {
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
        <StyledTextField placeholder="Enter title" />
      </Stack>
      <Stack flexDirection="row" gap={10} justifyContent="space-between">
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
      <Stack flexDirection="row" gap={10} >
        <Stack gap="10px">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "700",
              color: "var(--text3)",
            }}
          >
            Who can access this test
          </Typography>
          <FormControl size="small" >
            <InputLabel>Select Access</InputLabel>
            <Select label="Select Access" size="small" sx={{width:"350px",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                }}>
                    <MenuItem value="10">Free</MenuItem>
                    <MenuItem value="20">Paid</MenuItem>
                </Select>
          </FormControl>
        </Stack>

        
      </Stack>
    </Stack>
  );
}
