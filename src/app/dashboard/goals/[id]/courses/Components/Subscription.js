"use client";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import StyledSwitch from "@/src/components/StyledSwitch/StyledSwitch";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { Add, Close, East, PlaylistAddCheck } from "@mui/icons-material";
import {
  Button,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Subscription() {
  const menuOptions = ["Remove"];
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [selectValues, setSelectValues] = useState({
    subscriptionType: "",
    subscriptionDuration: "",
    subscriptionCount: "",
    discountMode: "",
    discountValidity: "",
  });

  const dialogOpen = () => setIsDialogOPen(true);
  const dialogClose = () => setIsDialogOPen(false);

  const discountOpen = () => setIsDiscountOpen(true);
  const discountClose = () => setIsDiscountOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const subscriptionTypeOptions = [
    { value: "all", label: "Free-all" },
    { value: "pro", label: "free-pro" },
    { value: "paid", label: "paid" },
  ];

  const subscriptionDurationOptions = [
    { value: "all", label: "Free-all" },
    { value: "pro", label: "free-pro" },
    { value: "paid", label: "paid" },
  ];

  const subscriptionCountOptions = [
    { value: "one", label: "one" },
    { value: "two", label: "two" },
    { value: "three", label: "three" },
  ];

  const discountModeOptions = [
    { value: "percentage", label: "Percentage" },
    { value: "price", label: "Price" },
  ];

  const discountValidityOptions = [
    { value: "one", label: "one" },
    { value: "two", label: "two" },
    { value: "three", label: "three" },
  ];

  return (
    <Stack marginTop="20px" gap="20px">
      <Typography
        sx={{
          fontFamily: "Lato",
          fontSize: "18px",
          fontWeight: "700",
          color: "var(--text3)",
        }}
      >
        Subscription
      </Typography>

      <Stack gap="5px">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "15px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Is free
        </Typography>
        <StyledSwitch />
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
          Plans
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
        isOpen={isDiscountOpen}
        title="Add discount"
        actionButton={
          <Button
            variant="text"
            sx={{ textTransform: "none", color: "var(--primary-color)" }}
            endIcon={<East />}
          >
            Create
          </Button>
        }
        icon={
          <IconButton
            onClick={discountClose}
            sx={{ borderRadius: "5px", padding: "4px" }}
          >
            <Close />
          </IconButton>
        }
      >
        <DialogContent>
          <Stack gap="20px">
            {/* <SelectField
              label="Select mode"
              name="discountMode"
              value={selectValues.discountMode}
              onChange={handleChange}
              options={discountModeOptions}
            />
            <StyledTextField placeholder="Enter Percentage/price" />
            <SelectField
              label="valid from & thru"
              name="discountValidity"
              value={selectValues.discountValidity}
              onChange={handleChange}
              options={discountValidityOptions}
            /> */}
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
      </Stack>
    </Stack>
  );
}
