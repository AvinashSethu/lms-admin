"use client";
import DialogBox from "@/components/DialogBox/DialogBox";
import PrimaryCard from "@/components/PrimaryCard/PrimaryCard";
import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

 const metadata = {
  title: "Home",
};
export default function Home() {
const [isDialogOPen, setIsDialogOPen] = useState(false);
const dialogOpen = () => {
  setIsDialogOPen(true)
}
const dialogClose = () => {
  setIsDialogOPen(false)
}

  return (
    <Stack padding="30px 30px 0px 30px">
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "20px",
            fontWeight: "700",
            mb: "15px",
          }}
        >
          Goals
        </Typography>
        <Button
          variant="contained"
          onClick={dialogOpen}
          sx={{
            textTransform: "none",
            width: "120px",
            height: "40px",
            backgroundColor: "var(--primary-color)",
            fontFamily: "Lato",
            fontSize: "14px",
            fontWeight: "700",
            borderRadius:"5px"
          }}
          startIcon={<Add />} disableElevation
        >
          Goal
        </Button>
        <DialogBox />
      </Stack>
      <Stack flexDirection="row" gap="20px">
        <PrimaryCard
          icon="/Icons/gate_cse.svg"
          title="GATE CSE"
          actionButton="View"
        />
        <PrimaryCard
          icon="/Icons/placements.svg"
          title="Placements"
          actionButton="View"
        />
        <PrimaryCard
          icon="/Icons/banking.svg"
          title="Banking"
          actionButton="View"
          subtitle
        />
      </Stack>
    </Stack>
  );
}
