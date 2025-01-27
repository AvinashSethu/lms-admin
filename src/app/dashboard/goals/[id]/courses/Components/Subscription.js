"use client";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { Add, PlaylistAddCheck } from "@mui/icons-material";
import {
  Button,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Subscription() {
  const menuOptions = ["Remove"];
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };
  const [isdiscountOpen, setIsDiscountOpen] = useState(false);
  const discountOpen = () => {
    setIsDiscountOpen(true);
  };
  const discountClose = () => {
    setIsDiscountOpen(false);
  };
  const [selectValues, setSelectValues] = useState({
    subscriptionType: "",
    subscriptionDuration: "",
    subscriptionCount: "",
    discountMode: "",
    discountValidity: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Stack marginTop="20px" gap="20px">
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "16px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Subscription
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
        title="Create Subscription"
        actionText="Create"
      >
        <DialogContent>
          <Stack gap="20px">
            <FormControl
              sx={{
                width: "100%",
              }}
              size="small"
            >
              <InputLabel>Select type</InputLabel>
              <Select
              name="subscriptionType"
                label="Select type"
                size="small"
                value={selectValues.subscriptionType}
                onChange={handleChange}
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                }}
              >
                <MenuItem value="all">Free-all</MenuItem>
                <MenuItem value="pro">free-pro</MenuItem>
                <MenuItem value="paid">paid</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: "100%",
              }}
              size="small"
            >
              <InputLabel>Select Duration</InputLabel>
              <Select
              name="subscriptionDuration"
                label="Select type"
                size="small"
                value={selectValues.subscriptionDuration}
                onChange={handleChange}
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                }}
              >
                <MenuItem value="all">Free-all</MenuItem>
                <MenuItem value="pro">free-pro</MenuItem>
                <MenuItem value="paid">paid</MenuItem>
              </Select>
            </FormControl>
            <Stack flexDirection="row" justifyContent="space-between">
              <FormControl sx={{ width: "50%" }} size="small">
                <InputLabel>No of type</InputLabel>
                <Select
                name="subscriptionCount"
                  label="No of type"
                  value={selectValues.subscriptionCount}
                  onChange={handleChange}
                  sx={{
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--sec-color)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--sec-color)",
                    },
                  }}
                >
                  <MenuItem value="one">one</MenuItem>
                  <MenuItem value="two">two</MenuItem>
                  <MenuItem value="three">three</MenuItem>
                </Select>
              </FormControl>
              <StyledTextField
                placeholder="Enter Price"
                sx={{ width: "260px" }}
              />
            </Stack>
          </Stack>
        </DialogContent>
      </DialogBox>
      <Stack flexDirection="row" flexWrap="wrap" rowGap="10px" columnGap="40px">
        <SecondaryCard
          icon={
            <PlaylistAddCheck
              sx={{ color: "var(--sec-color)", fontSize: "30px" }}
            />
          }
          title="Monthly Subscription (1 month)"
          options={menuOptions}
          cardWidth="500px"
          subTitle="₹299"
        />
        <SecondaryCard
          icon={
            <PlaylistAddCheck
              sx={{ color: "var(--sec-color)", fontSize: "30px" }}
            />
          }
          title="Free"
          options={menuOptions}
          cardWidth="500px"
          subTitle="Pro users"
        />
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        marginBottom="15px"
      >
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "16px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Discount
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={discountOpen}
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
        isOpen={isdiscountOpen}
        onClose={discountClose}
        title="Add discount"
        actionText="Create"
      >
        <DialogContent>
          <Stack gap="20px">
            <FormControl
              sx={{
                width: "100%",
              }}
              size="small"
            >
              <InputLabel>Select mode</InputLabel>
              <Select
              name="discountMode"
                label="Select mode"
                size="small"
                value={selectValues.discountMode}
                onChange={handleChange}
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                }}
              >
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="price">price</MenuItem>
              </Select>
            </FormControl>
            <StyledTextField placeholder="Enter Percentage/price" />
            <FormControl size="small">
              <InputLabel>valid from & thru</InputLabel>
              <Select
              name="discountValidity"
                label="valid from & thru"
                value={selectValues.discountValidity}
                onChange={handleChange}
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                }}
              >
                <MenuItem value="one">one</MenuItem>
                <MenuItem value="two">two</MenuItem>
                <MenuItem value="three">three</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
      </DialogBox>
      <Stack
        flexDirection="row"
        flexWrap="wrap"
        rowGap="10px"
        columnGap="40px"
        alignItems="center"
      >
        <SecondaryCard
          icon={
            <PlaylistAddCheck
              sx={{ color: "var(--sec-color)", fontSize: "30px" }}
            />
          }
          title="Monthly Subscription (1 month)"
          options={menuOptions}
          cardWidth="500px"
          subTitle="₹299"
        />
        <Typography>or</Typography>
        <SecondaryCard
          icon={
            <PlaylistAddCheck
              sx={{ color: "var(--sec-color)", fontSize: "30px" }}
            />
          }
          title="Free"
          options={menuOptions}
          cardWidth="500px"
          subTitle="Pro users"
        />
      </Stack>
    </Stack>
  );
}
