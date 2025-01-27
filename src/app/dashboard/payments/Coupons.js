"use client";
import FilterSideNav from "@/src/components/FilterSideNav/FilterSideNav";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import { Add, CalendarToday, FilterAlt } from "@mui/icons-material";
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
import studentcard from "@/public/Icons/studentcard.svg";
import Image from "next/image";
import TransactionCard from "@/src/components/TransactionCard/TransactionCard";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import CouponCard from "@/src/components/CouponCard/CouponCard";

// export const metadata = {
//   title: "Transaction",
// };
export default function Coupons() {
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
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };
  const menuOptions = ["Remove"];
  return (
    <Stack marginTop="20px">
      <Stack
        padding="20px"
        sx={{
          padding: "20px",
          border: "1px solid var(--border-color)",
          minHeight: "100vh",
          backgroundColor: "var(--white)",
          borderRadius: "10px",
          gap: "20px",
        }}
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "20px",
              fontWeight: "700",
              color: "var(--text3)",
            }}
          >
            Coupons
          </Typography>
          <Stack flexDirection="row" gap="10px" alignItems="flex-end">
            <SearchBox />
            <Button
              variant="contained"
              endIcon={<FilterAlt />}
              onClick={filterOpen}
              sx={{
                backgroundColor: "var(--primary-color)",
                textTransform: "none",
                height: "40px",
                borderRadius: "4px",
                minWidth: "100px",
              }}
              disableElevation
            >
              Filter
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={dialogOpen}
              sx={{
                backgroundColor: "var(--primary-color)",
                textTransform: "none",
                height: "40px",
                borderRadius: "4px",
                minWidth: "100px",
              }}
              disableElevation
            >
              New
            </Button>
            <FilterSideNav
              isOpen={isOpen}
              toggleDrawer={toggleDrawer}
              select_1="Question type"
              select_2="Select date from & to"
              select_3="Sort Marks"
            />
          </Stack>
        </Stack>
        <DialogBox
          isOpen={isDialogOpen}
          onClose={dialogClose}
          title="Add Coupon"
          actionText="Add Coupon"
        >
          <DialogContent>
            <Stack gap="15px">
              <StyledTextField placeholder="Title" />
              <StyledTextField placeholder="Enter coupon text" />
              <FormControl
                sx={{
                  width: "100%",
                }}
                size="small"
              >
                <InputLabel>Select Goal/Course</InputLabel>
                <Select
                  label="Select Goal/Course"
                  size="small"
                  // value={subjectType}
                  // onChange={handleChangeSubject}
                  sx={{
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--sec-color)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--sec-color)",
                    },
                  }}
                >
                  <MenuItem value="1">Goal</MenuItem>
                  <MenuItem value="course">Course</MenuItem>
                </Select>
              </FormControl>
              <Stack flexDirection="row" gap="10px">
                <FormControl
                  sx={{
                    width: "100%",
                  }}
                  size="small"
                >
                  <InputLabel>Select percentage/rupees</InputLabel>
                  <Select
                    label="Select percentage/rupees"
                    size="small"
                    // value={subjectType}
                    // onChange={handleChangeSubject}
                    sx={{
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--sec-color)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--sec-color)",
                      },
                    }}
                  >
                    <MenuItem value="percentage">percentage</MenuItem>
                    <MenuItem value="rupees">rupees</MenuItem>
                  </Select>
                </FormControl>
                <StyledTextField placeholder="Enter rupees" />
              </Stack>
              <Stack flexDirection="row" gap="10px">
                <StyledTextField placeholder="Min purchase price" />
                <StyledTextField placeholder="Max. purchase price" />
              </Stack>
              <StyledTextField placeholder="Total redeemable" />
              <FormControl
                sx={{
                  width: "100%",
                }}
                size="small"
              >
                <InputLabel>Valid from & to</InputLabel>
                <Select
                  label="Valid from & to"
                  size="small"
                  // value={subjectType}
                  // onChange={handleChangeSubject}
                  IconComponent={CalendarToday}
                  sx={{
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--sec-color)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--sec-color)",
                    },
                    "& .MuiSelect-icon": {
                      transform: "none",
                    },
                  }}
                >
                  <MenuItem value="percentage">percentage</MenuItem>
                  <MenuItem value="rupees">rupees</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
        </DialogBox>
        <Stack gap="15px">
          <TransactionCard
            icon={
              <Image src={studentcard.src} alt="icon" width={24} height={24} />
            }
            name="Abishek A"
            email="21ec001@psr.edu.in"
            date="10-08-2024 20:06:00"
            id="2756553265778"
            price="₹ 500"
            status="Success"
            options={menuOptions}
          />
          <TransactionCard
            icon={
              <Image src={studentcard.src} alt="icon" width={24} height={24} />
            }
            name="Goal 50 percent"
            email="21ec001@psr.edu.in"
            date="10-08-2024 20:06:00"
            id="2756553265778"
            price="₹ 500"
            status="Success"
            options={menuOptions}
          />
          <CouponCard options={menuOptions} />
        </Stack>
      </Stack>
    </Stack>
  );
}
