import { styled } from "@mui/material";
import { Switch } from "@mui/material";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    color: "var(--sec-color-acc-1)",
    backgroundColor: "transparent",
    "&.Mui-checked": {
      color: "var(--sec-color)",
      backgroundColor: "transparent",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "var(--sec-color)",
    },
  },
  "& .MuiSwitch-track": {
    backgroundColor: "var(--sec-color)",
  },
}));

export default function StyledSwitchButton() {
  return <StyledSwitch  disableRipple />;
}
