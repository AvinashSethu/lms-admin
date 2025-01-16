"use client";
import { MoreVert } from "@mui/icons-material";
import {
  Card,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function SecondaryCard({ icon, title, options }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOpen = (event) => {
    setIsMenuOpen(event.currentTarget);
  };
  const menuClose = () => {
    setIsMenuOpen(null);
  };
  return (
    <Card
      sx={{
        width: "300px",
        height: "80px",
        border: "1px solid",
        borderColor: "var(--border-color)",
        borderRadius: "10px",
        padding: "8px",
      }}
      elevation={0}
    >
      <Stack flexDirection="row" alignItems="center" gap="15px">
        <Stack
          sx={{
            width: "62px",
            height: "60px",
            backgroundColor: "var(--sec-color-acc-2)",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </Stack>
        <Typography
          sx={{
            color: "var(text4)",
            fontFamily: "Lato",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          {title}
        </Typography>
        <IconButton sx={{ marginLeft: "auto" }} onClick={menuOpen}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={isMenuOpen}
          open={Boolean(isMenuOpen)}
          onClose={menuClose}
          slotProps={{
            paper: {
              style: {
                width: "90px",
                border:"1px solid",
                borderColor:"var(--border-color)"
              },
            },
          }}
          elevation={0}
        >
          {options.map((option,index) => (
            <MenuItem
              key={index}
              onClick={menuClose}
              sx={{  height: "30px", color:"var(text4)",fontSize:"14px",fontFamily:"Lato",}}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Card>
  );
}
