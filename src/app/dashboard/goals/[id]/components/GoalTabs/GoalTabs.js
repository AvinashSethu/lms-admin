"use client";
import { Box, Stack, styled, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PropTypes from 'prop-types';
import Syllabus from "../Syllabus";
import Exam from "../Exam";
import Info from "../Info";
import Settings from "../Settings";
 
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
  padding: "0px",
  "&.Mui-selected": {
    color: "var(--sec-color)",
    backgroundColor: "var(--sec-color-acc-1)",
  },
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

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
      <CustomTabPanel value={value} index={0}><Syllabus /></CustomTabPanel>
      <CustomTabPanel value={value} index={1}><Exam /> </CustomTabPanel>
      <CustomTabPanel value={value} index={2}><Info /></CustomTabPanel>
      <CustomTabPanel value={value} index={3}><Settings /></CustomTabPanel>
    </Stack>
  );
}
