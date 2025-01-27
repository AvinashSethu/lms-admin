"use client";
import FilterSideNav from "@/src/components/FilterSideNav/FilterSideNav";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import { FilterAlt } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import studentcard from "@/public/Icons/studentcard.svg";
import Image from "next/image";
import TransactionCard from "@/src/components/TransactionCard/TransactionCard";

// export const metadata = {
//   title: "Transaction",
// };
export default function Transactions() {
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
  const menuOptions = ["Remove"];
  return (
    <Stack marginTop="20px" >
      <Stack
        padding="20px"
        sx={{
          padding: "20px",
          border: "1px solid var(--border-color)",
          minHeight: "100vh",
          backgroundColor: "var(--white)",
          borderRadius: "10px",
          gap: "20px",
        }}
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "20px",
              fontWeight: "700",
              color: "var(--text3)",
            }}
          >
            Transactions
          </Typography>
          <Stack flexDirection="row" gap="10px" alignItems="flex-end">
            <SearchBox />
            <Button
              variant="contained"
              endIcon={<FilterAlt />}
              onClick={filterOpen}
              sx={{
                backgroundColor: "var(--primary-color)",
                textTransform: "none",
                height: "40px",
                borderRadius: "4px",
                minWidth: "100px",
              }}
              disableElevation
            >
              Filter
            </Button>
            <FilterSideNav
              isOpen={isOpen}
              toggleDrawer={toggleDrawer}
              select_1="Question type"
              select_2="Select date from & to"
              select_3="Sort Marks"
            />
          </Stack>
        </Stack>
        <Stack gap="15px">
          <TransactionCard
            icon={
              <Image src={studentcard.src} alt="icon" width={24} height={24} />
            }
            name="Abishek A"
            email='21ec001@psr.edu.in'
            date="10-08-2024 20:06:00"
            id="2756553265778"
            price="₹ 500"
            status="Success"
            options={menuOptions}
          />
          <TransactionCard
            icon={
              <Image src={studentcard.src} alt="icon" width={24} height={24} />
            }
            name="Abishek A"
            email='21ec001@psr.edu.in'
            date="10-08-2024 20:06:00"
            id="2756553265778"
            price="₹ 500"
            status="Success"
            options={menuOptions}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
