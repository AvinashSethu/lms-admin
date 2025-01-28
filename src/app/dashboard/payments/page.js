"use client";
import FilterSideNav from "@/src/components/FilterSideNav/FilterSideNav";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import { FilterAlt } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import studentcard from "@/public/Icons/studentcard.svg";
import Image from "next/image";
import TransactionCard from "@/src/components/TransactionCard/TransactionCard";
import CustomTabs from "@/src/components/CustomTabs/CustomTabs";
import Transactions from "./Transactions";
import Coupons from "./Coupons";

// export const metadata = {
//   title: "Transaction",
// };
export default function Payments() {
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
  const tabs = [
    { label: "Transactions", content: <Transactions /> },
        { label: "Coupons", content: <Coupons /> },
  ]
  return (
    <Stack padding="20px">
      <CustomTabs tabs={tabs} />
    </Stack>
  );
}
