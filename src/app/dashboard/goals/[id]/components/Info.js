"use client";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { Add, PushPin } from "@mui/icons-material";
import { Button, DialogContent, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function Info() {
  const menuOptions = ["Remove"];
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };
  return (
    <Stack
      sx={{
        backgroundColor: "var(--white)",
        border: "1px solid",
        borderColor: "var(--border-color)",
        borderRadius: "10px",
        padding: "20px",
        gap: "20px",
        minHeight: "100vh",
      }}
    >
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "16px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Contents
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={dialogOpen}
          sx={{
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
          }}
          disableElevation
        >
          Create
        </Button>
      </Stack>
      <DialogBox
        isOpen={isDialogOpen}
        onClose={dialogClose}
        title="Info editor"
        actionText="Save"
      >
        <DialogContent>
          <Stack gap="15px">
            <Typography>Title</Typography>
            <Stack flexDirection="row" justifyContent="space-between">
              <StyledTextField placeholder="Enter title" />
              
            </Stack>
            
          </Stack>
        </DialogContent>
      </DialogBox>
      <Stack flexWrap="wrap" flexDirection="row" rowGap="20px" columnGap="50px">
        <SecondaryCard
          icon={
            <PushPin
              sx={{ color: "var(--sec-color)", transform: "rotate(45deg)" }}
            />
          }
          title="Overview"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={
            <PushPin
              sx={{ color: "var(--sec-color)", transform: "rotate(45deg)" }}
            />
          }
          title="Important Dates"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={
            <PushPin
              sx={{ color: "var(--sec-color)", transform: "rotate(45deg)" }}
            />
          }
          title="Application Process"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={
            <PushPin
              sx={{ color: "var(--sec-color)", transform: "rotate(45deg)" }}
            />
          }
          title="Syllabus"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={
            <PushPin
              sx={{ color: "var(--sec-color)", transform: "rotate(45deg)" }}
            />
          }
          title="Cutoffs"
          options={menuOptions}
          cardWidth="350px"
        />
      </Stack>
    </Stack>
  );
}
