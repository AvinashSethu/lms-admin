"use client";
import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import Image from "next/image";
import studentcard from "@/public/Icons/studentcard.svg";
import { Close, Done, MoreVert, RampRight } from "@mui/icons-material";
import { useState } from "react";

export default function StudentProgressCard({
  name,
  email,
  year,
  college,
  time,
  status,
  percent,
  options,
  Request,
}) {
  const progressButton = {
    "In Progress": "var(--sec-color-acc-2)",
    Completed: "var(--primary-color-acc-2)",
    Scheduled: "var(--border-color)",
    Terminated: "var(--border-color)",
  };
  const progressName = {
    "In Progress": "var(--sec-color)",
    Completed: "var(--primary-color)",
    Scheduled: "var(--text3)",
    Terminated: "var(--text3)",
  };
  const buttonColor = progressButton[status];
  const contentColor = progressName[status];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOpen = (event) => {
    setIsMenuOpen(event.currentTarget);
  };
  const menuClose = () => {
    setIsMenuOpen(null);
  };
  return (
    <Stack
      flexDirection="row"
      padding="10px"
      alignItems="center"
      gap="20px"
      sx={{
        border: "1px solid var(--border-color)",
        borderRadius: "10px",
        minHeight: "80px",
      }}
    >
      <Stack flexDirection="row" alignItems="center" gap="20px">
        <Stack
          sx={{
            width: "60px",
            height: "60px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "var(--sec-color-acc-1)",
            borderRadius: "10px",
          }}
        >
          <Image src={studentcard.src} alt="icon" width={24} height={24} />
        </Stack>
        <Typography
          sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
        >
          {name}
        </Typography>
      </Stack>
      <Stack
        flexDirection="row"
        gap={10}
        alignItems="center"
      >
        <Stack gap="5px">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "700",
              color: "var(--text1)",
            }}
          >
            {email}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "400",
              color: "var(--text1)",
            }}
          >
            {year}
          </Typography>
        </Stack>
        <Stack gap="5px">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "700",
              color: "var(--text1)",
            }}
          >
            {college}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "400",
              color: "var(--text4)",
            }}
          >
            {time}
          </Typography>
        </Stack>
        <Button
          sx={{
            backgroundColor: buttonColor,
            width: "90px",
            height: "22px",
            color: "var(--text4)",
            fontSize: "10px",
            fontFamily: "Lato",
            borderRadius: "20px",
            textTransform: "none",
            color: contentColor,
          }}
        >
          {status}
        </Button>
        <Typography sx={{ width: "60px" }}>{percent}</Typography>
      </Stack>
      {options && (
        <MoreVert
          sx={{ cursor: "pointer", marginLeft: "auto" }}
          onClick={menuOpen}
        />
      )}
      {Request && (
        <Stack flexDirection="row" gap="10px" marginLeft="auto">
          <Done
          fontSize="medium"
            sx={{
              color: "var(--primary-color)",
              cursor: "pointer",
              backgroundColor: "var(--primary-color-acc-2)",
              padding:"3px",
              borderRadius:"5px",
            }}
          />
          <Close fontSize="medium"
            sx={{
              color: "var(--sec-color)",
              cursor: "pointer",
              backgroundColor: "var(--sec-color-acc-1)",
              padding:"3px",
              borderRadius:"5px"
            }} />
        </Stack>
      )}
      <Menu
        anchorEl={isMenuOpen}
        open={Boolean(isMenuOpen)}
        onClose={menuClose}
        disableScrollLock={true}
        slotProps={{
          paper: {
            style: {
              border: "1px solid",
              borderColor: "var(--border-color)",
            },
          },
        }}
        elevation={0}
      >
        <MenuItem
          onClick={menuClose}
          sx={{
            color: "var(text4)",
            fontSize: "14px",
            fontFamily: "Lato",
          }}
        >
          Remove
        </MenuItem>
      </Menu>
    </Stack>
  );
}
