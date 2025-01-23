"use client";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { Add, Folder } from "@mui/icons-material";
import { DialogContent, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useState } from "react";

export default function AllSubjects() {
  const menuOptions = ["Remove"];
  const [isDialogOpen, setIsDialogOPen] = useState(false);
      const dialogOpen = () => {
        setIsDialogOPen(true);
      };
      const dialogClose = () => {
        setIsDialogOPen(false);
      };
  return (
    <Stack padding="20px" gap="20px">
      <Header title="All Subjects" search button="Subject" icon={<Add />} onClick={dialogOpen} />
      <DialogBox
          isOpen={isDialogOpen}
          onClose={dialogClose}
          title="Add Subject"
          actionText="Add Subject"
        >
          <DialogContent>
            <FormControl
              sx={{
                width: "100%",
              }}
              size="small"
            >
              <InputLabel>Select Subject</InputLabel>
              <Select
                label="Select Subject"
                size="small"
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                }}
              >
                <MenuItem>Numerical Ability</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
        </DialogBox>
      <Stack flexDirection="row" columnGap="40px" rowGap="15px" flexWrap="wrap">
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Numerical Ability"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Simplifications & simple equations"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
      </Stack>
    </Stack>
  );
}
