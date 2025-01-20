"use client";
import { Box, styled, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

// Styled Tabs and Tab
const StyledTabs = styled(Tabs)(({ customStyles }) => ({
  backgroundColor: "var(--white)",
  borderRadius: "10px",
  width: "308px",
  padding: "4px",
  minHeight: "40px",
  boxShadow: "inset .5px .5px 6px var(--border-color)",
  ...customStyles?.tabs, // Allow external styles to override
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const StyledTab = styled(Tab)(({ customStyles }) => ({
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
  ...customStyles?.tab, // Allow external styles to override
}));

// Tab Panel Component
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

// Main Tabs Component
export default function CustomTabs({ tabs, customStyles }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <StyledTabs
        value={value}
        onChange={handleChange}
        customStyles={customStyles}
      >
        {tabs.map((tab, index) => (
          <StyledTab
            key={index}
            label={tab.label}
            customStyles={customStyles}
          />
        ))}
      </StyledTabs>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // Tab label
      content: PropTypes.node.isRequired, // Tab content
    })
  ).isRequired,
  customStyles: PropTypes.shape({
    tabs: PropTypes.object, // Optional custom styles for Tabs
    tab: PropTypes.object,  // Optional custom styles for individual Tab
  }),
};
