"use client";
import FilterSideNav from "@/src/components/FilterSideNav/FilterSideNav";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { AccountBalance, FilterAlt } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function StudentExam() {
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
    <Stack
      sx={{
        gap: "15px",
        marginTop: "20px",
      }}
    >
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "18px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Exams
        </Typography>
        <Stack flexDirection="row" gap="20px">
          <SearchBox />
          <Button
            variant="contained"
            endIcon={<FilterAlt />}
            onClick={filterOpen}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            Filter
          </Button>
        </Stack>
      </Stack>
      <FilterSideNav
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        select_1="Sort by Goals"
        select_2="Select date from & to"
      />
      <Stack columnGap="35px" rowGap="15px" flexWrap="wrap" flexDirection="row">
        <SecondaryCard
          icon={
            <AccountBalance
              sx={{ color: "var(--sec-color)" }}
              fontSize="large"
            />
          }
          title="Placements 1"
          cardWidth="500px"
          subTitle={
            <Stack flexDirection="row" gap="20px">
              <Typography
                sx={{
                  color: "var(--text3)",
                  fontFamily: "Lato",
                  fontSize: "12px",
                }}
              >
                Institute
              </Typography>
              <Typography
                sx={{
                  color: "var(--text3)",
                  fontFamily: "Lato",
                  fontSize: "12px",
                }}
              >
                120 Questions
              </Typography>
              <Typography
                sx={{
                  color: "var(--text3)",
                  fontFamily: "Lato",
                  fontSize: "12px",
                }}
              >
                2024-08-05
              </Typography>
            </Stack>
          }
        />
      </Stack>
    </Stack>
  );
}
