"use client";
import { Box, Button, Stack } from "@mui/material";
import StudentProgressCard from "./StudentProgressCard";
import StatusCard from "./StatusCard";
import SearchBox from "../../SearchBox/SearchBox";
import { FilterAlt, Logout } from "@mui/icons-material";
import FilterSideNav from "../../FilterSideNav/FilterSideNav";
import { useState } from "react";

export default function ExamStudents() {
  const menuOptions = "Remove";
  const [isOpen, setIsOpen] = useState(false);
  const filterOpen = () => {
    setIsOpen(!isOpen);
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };
  return (
    <Stack marginTop="20px" gap="30px" padding="10px">
      <Stack flexDirection="row" justifyContent="space-between">
        <Stack flexDirection="row" gap="20px">
          <StatusCard icon title="Attempted" count="25" />
          <StatusCard icon title="Completed" count="20" />
          <StatusCard icon title="Unattempted" count="18" />
        </Stack>
        <Stack justifyContent="space-between">
          <SearchBox />
          <Stack flexDirection="row" marginLeft="auto" gap="20px">
            <Button
              variant="contained"
              endIcon={<Logout sx={{ transform: "rotate(-90deg)" }} />}
              sx={{
                textTransform: "none",
                fontFamily: "Lato",
                fontSize: "14px",
                backgroundColor: "var(--sec-color)",
              }}
              disableElevation
            >
              Export
            </Button>
            <Button
              variant="contained"
              endIcon={<FilterAlt />}
              onClick={filterOpen}
              sx={{
                backgroundColor: "var(--primary-color)",
                textTransform: "none",
                borderRadius: "4px",
              }}
              disableElevation
            >
              Filters
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <FilterSideNav
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        select_1="Question type"
        select_2="Select date from & to"
        select_3="Sort Marks"
      />
      <StudentProgressCard
        name="Abishek A"
        email="21ec001@psr.edu.in"
        year="ECE 3rd year"
        college="P.S.R Engineering College"
        time="2024-08-10 20:06:00"
        status="In Progress"
        percent="100.00%"
      />
      <StudentProgressCard
        name="Abishek A"
        email="21ec001@psr.edu.in"
        year="ECE 3rd year"
        college="P.S.R Engineering College"
        time="2024-08-10 20:06:00"
        status="Scheduled"
        percent="50.00%"
      />
      <StudentProgressCard
        name="Abishek A"
        email="21ec001@psr.edu.in"
        year="ECE 3rd year"
        college="P.S.R Engineering College"
        time="2024-08-10 20:06:00"
        status="Completed"
        percent="100.00%"
      />
      <StudentProgressCard
        name="Abishek A"
        email="21ec001@psr.edu.in"
        year="ECE 3rd year"
        college="P.S.R Engineering College"
        time="2024-08-10 20:06:00"
        status="Terminated"
        percent="0.00%"
      />
    </Stack>
  );
}
