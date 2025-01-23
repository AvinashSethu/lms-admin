"use client";
import FilterSideNav from "@/src/components/FilterSideNav/FilterSideNav";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { AccountBalance, Add, FilterAlt, Folder } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function LibraryExam() {
  const menuOptions = ["Remove"];
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
    <Stack padding="20px" gap="20px">
      <Header title="Exams" search button="Filter" icon={<FilterAlt />} onClick={filterOpen}/>
      <FilterSideNav
                isOpen={isOpen}
                toggleDrawer={toggleDrawer}
                select_1="Question type"
                select_2="Select date from & to"
                select_3="Sort Marks"
              />
      <Stack flexDirection="row" columnGap="40px" rowGap="15px" flexWrap="wrap">
        <SecondaryCard
          icon={<AccountBalance sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Placements"
          cardWidth="500px"
          subTitle={<Stack flexDirection="row" gap="20px">
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>Institute</Typography>
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>2024-08-05 </Typography>
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>P.S.R Engineering College</Typography>
          </Stack>}
        />
        <SecondaryCard
          icon={<AccountBalance sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Placements"
          cardWidth="500px"
          subTitle={<Stack flexDirection="row" gap="20px">
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>Institute</Typography>
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>2024-08-05 </Typography>
          </Stack>}
        />
        <SecondaryCard
          icon={<AccountBalance sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Placements"
          cardWidth="500px"
          subTitle={<Stack flexDirection="row" gap="20px">
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>Institute</Typography>
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>2024-08-05 </Typography>
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>P.S.R Engineering College</Typography>
          </Stack>}
        />
        <SecondaryCard
          icon={<AccountBalance sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Placements"
          cardWidth="500px"
          subTitle={<Stack flexDirection="row" gap="20px">
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>Institute</Typography>
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>2024-08-05 </Typography>
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>P.S.R Engineering College</Typography>
          </Stack>}
        />
        <SecondaryCard
          icon={<AccountBalance sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Placements"
          cardWidth="500px"
          subTitle={<Stack flexDirection="row" gap="20px">
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>Institute</Typography>
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>2024-08-05 </Typography>
            <Typography sx={{color:"var(--text3)",fontFamily:"Lato",fontSize:"12px"}}>P.S.R Engineering College</Typography>
          </Stack>}
        />
      </Stack>
    </Stack>
  );
}
