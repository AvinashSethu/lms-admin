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

// Reusable SelectField Component
const SelectField = ({ label, name, value, onChange, options }) => {
  return (
    <FormControl sx={{ width: "100%" }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        label={label}
        size="small"
        value={value}
        onChange={onChange}
        sx={{
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--sec-color)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--sec-color)",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default function Subscription() {
  const menuOptions = ["Remove"];
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => setIsDialogOPen(true);
  const dialogClose = () => setIsDialogOPen(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const discountOpen = () => setIsDiscountOpen(true);
  const discountClose = () => setIsDiscountOpen(false);
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

  // Options for Select fields
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
            <SelectField
              label="Select type"
              name="subscriptionType"
              value={selectValues.subscriptionType}
              onChange={handleChange}
              options={subscriptionTypeOptions}
            />
            <SelectField
              label="Select Duration"
              name="subscriptionDuration"
              value={selectValues.subscriptionDuration}
              onChange={handleChange}
              options={subscriptionDurationOptions}
            />
            <Stack flexDirection="row" justifyContent="space-between" gap="10px">
              <SelectField
                label="No of type"
                name="subscriptionCount"
                value={selectValues.subscriptionCount}
                onChange={handleChange}
                options={subscriptionCountOptions}
              />
              <StyledTextField placeholder="Enter Price" sx={{ width: "260px" }} />
            </Stack>
          </Stack>
        </DialogContent>
      </DialogBox>

      <Stack flexDirection="row" flexWrap="wrap" rowGap="10px" columnGap="40px">
        <SecondaryCard
          icon={<PlaylistAddCheck sx={{ color: "var(--sec-color)", fontSize: "30px" }} />}
          title="Monthly Subscription (1 month)"
          options={menuOptions}
          cardWidth="500px"
          subTitle="₹299"
        />
        <SecondaryCard
          icon={<PlaylistAddCheck sx={{ color: "var(--sec-color)", fontSize: "30px" }} />}
          title="Free"
          options={menuOptions}
          cardWidth="500px"
          subTitle="Pro users"
        />
      </Stack>

      <Stack flexDirection="row" justifyContent="space-between" marginBottom="15px">
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
        isOpen={isDiscountOpen}
        onClose={discountClose}
        title="Add discount"
        actionText="Create"
      >
        <DialogContent>
          <Stack gap="20px">
            <SelectField
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
            />
          </Stack>
        </DialogContent>
      </DialogBox>

      <Stack flexDirection="row" flexWrap="wrap" rowGap="10px" columnGap="40px" alignItems="center">
        <SecondaryCard
          icon={<PlaylistAddCheck sx={{ color: "var(--sec-color)", fontSize: "30px" }} />}
          title="Monthly Subscription (1 month)"
          options={menuOptions}
          cardWidth="500px"
          subTitle="₹299"
        />
      </Stack>
    </Stack>
  );
}
