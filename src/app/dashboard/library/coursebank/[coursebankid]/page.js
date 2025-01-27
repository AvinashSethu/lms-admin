"use client";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { Add, PlayCircle } from "@mui/icons-material";
import {
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useState } from "react";

export default function CoursebankId() {
  const menuOptions = ["Remove"];
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };
  const [selectValues, setSelectValues] = useState({
    videoTitle:"",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Stack padding="20px" gap="20px">
      <Header
        title="Course bank"
        search
        button="Video"
        icon={<Add />}
        onClick={dialogOpen}
        back
      />
      <DialogBox
        isOpen={isDialogOpen}
        onClose={dialogClose}
        title="Add Video"
        actionText="Upload"
      >
        <DialogContent>
          <Stack gap="15px">
            <FormControl
              sx={{
                width: "100%",
              }}
              size="small"
            >
              <InputLabel>Enter video title</InputLabel>
              <Select
              name="videoTitle"
              value={selectValues.videoTitle}
              onChange={handleChange}
                label="Enter video title"
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
                <MenuItem value="one">Numerical Ability</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: "100%",
              }}
              size="small"
            >
              <InputLabel>Select video</InputLabel>
              <Select
                label="Select video"
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
          </Stack>
        </DialogContent>
      </DialogBox>
      <Stack flexDirection="row" columnGap="40px" rowGap="15px" flexWrap="wrap">
        <SecondaryCard
          icon={<PlayCircle sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Numerical Ability"
          options={menuOptions}
          cardWidth="350px"
        />
      </Stack>
    </Stack>
  );
}
