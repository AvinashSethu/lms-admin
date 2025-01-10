"use client";
import { Stack, styled, Tab, Tabs } from "@mui/material";
import { useState } from "react";

const StyledTabs = styled(Tabs)({
    backgroundColor: "var(--white)",
    borderRadius: "10px",
    width: "488px",
    padding: "4px",
    "& .MuiTabs-indicator": {
      display: "none",
    },
  });
  
  const StyledTab = styled(Tab)({
    textTransform: "none",
    fontFamily: "Lato",
    fontWeight: 600,
    borderRadius: "8px",
    width: "120px",
    transition: "all 0.4s ease",
    "&.Mui-selected": {
      color: "var(--sec-color)",
      backgroundColor: "var(--sec-color-acc-1)",
    },
  });


export default function GoalTabs({ tabs = []}) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Stack >
      <StyledTabs value={value} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <StyledTab key={index} label={tab.label} />
        ))}
      </StyledTabs>
    </Stack>
  );
}
