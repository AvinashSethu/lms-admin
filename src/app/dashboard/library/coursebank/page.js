"use client";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { Add, Folder } from "@mui/icons-material";
import {
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Coursebank() {
  const router = useRouter();
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
      <Header
        title="Course bank"
        search
        button="Add"
        icon={<Add />}
        onClick={dialogOpen}
      />
      <DialogBox
        isOpen={isDialogOpen}
        onClose={dialogClose}
        title="Add Course bank"
        actionText="Add Course bank"
      >
        <DialogContent>
          <FormControl
            sx={{
              width: "100%",
            }}
            size="small"
          >
            <InputLabel>Select Course bank</InputLabel>
            <Select
              label="Select Course bank"
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
          title={
            <span
              onClick={() => {
                router.push("/dashboard/library/coursebank/1");
              }}
              style={{cursor:"pointer"}}
            >
              Numerical Ability
            </span>
          }
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title={
            <span
              onClick={() => {
                router.push("/dashboard/library/coursebank/2");
              }}
              style={{cursor:"pointer"}}
            >
              Simplifications & simple equations
            </span>
          }
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title={
            <span
              onClick={() => {
                router.push("/dashboard/library/coursebank/3");
              }}
              style={{cursor:"pointer"}}
            >
              Blood Relations and Coding & Decoding
            </span>
          }
          options={menuOptions}
          cardWidth="350px"
        />
      </Stack>
    </Stack>
  );
}
