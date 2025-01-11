"use client";
import { Stack, styled, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import StudentsTab from "../StudentsTab";

const StyledTabs = styled(Tabs)({
  backgroundColor: "var(--white)",
  borderRadius: "10px",
  width: "408px",
  padding: "4px",
  minHeight: "40px",
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  fontFamily: "Lato",
  fontWeight: 600,
  borderRadius: "8px",
  width: "100px",
  transition: "all 0.4s ease",
  minHeight: "32px",
  padding:"0px",
  "&.Mui-selected": {
    color: "var(--sec-color)",
    backgroundColor: "var(--sec-color-acc-1)",
  },
});

export default function GoalTabs({ tabs = [] }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Stack gap="18px">
      <StyledTabs value={value} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <StyledTab key={index} label={tab.label} />
        ))}
      </StyledTabs>
      <StudentsTab />
    </Stack>
  );
}
