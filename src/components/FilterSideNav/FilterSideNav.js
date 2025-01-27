"use client";
import { Close } from "@mui/icons-material";
import {
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function FilterSideNav({ isOpen, toggleDrawer,select_1 ,select_2,select_3}) {
  const [selectValues, setSelectValues] = useState({
      select1:"",
      select2:"",
      select3:"",
    });
    const handleChange = (event) => {
      const { name, value } = event.target;
      setSelectValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    
  return (
    <Drawer anchor="right" open={isOpen} disableScrollLock={true} ModalProps={{
        BackdropProps: {
          style: { backgroundColor: 'transparent' },
        },
      }}>
      <Stack width="300px" padding="20px" gap="20px">
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography
            sx={{ fontFamily: "Lato", fontSize: "16px", fontWeight: "700" }}
          >
            Filter
          </Typography>
          <Close onClick={toggleDrawer(false)} sx={{ cursor: "pointer" }} />
        </Stack>
        <FormControl size="small">
          <InputLabel>{select_1}</InputLabel>
          <Select
          name="select1"
          value={selectValues.select1}
          onChange={handleChange}
            label={select_1}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--sec-color)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--sec-color)",
              },
            }}
          >
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="inprogress">inprogress</MenuItem>
            <MenuItem value="scheduled">scheduled</MenuItem>
            <MenuItem value="terminated">terminated</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>{select_2}</InputLabel>
          <Select
          name="select2"
          value={selectValues.select2}
          onChange={handleChange}
            label={select_2}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--sec-color)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--sec-color)",
              },
            }}
          >
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
        {select_3 && <FormControl size="small">
          <InputLabel>{select_3}</InputLabel>
          <Select
          name="select3"
          value={selectValues.select3}
          onChange={handleChange}
            label={select_3}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--sec-color)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--sec-color)",
              },
            }}
          >
            <MenuItem value="Ascending">Ascending</MenuItem>
            <MenuItem value="descending">descending</MenuItem>
          </Select>
        </FormControl>}
        <Button
          variant="contained"
          onClick={toggleDrawer(false)}
          sx={{
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
            borderRadius: "4px",
          }}
          disableElevation
        >
          Apply
        </Button>
      </Stack>
    </Drawer>
  );
}
