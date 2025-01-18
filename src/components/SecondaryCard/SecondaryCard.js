
"use client";
import { MoreVert,East } from "@mui/icons-material";
import {
  Card,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Typography,
  Button
} from "@mui/material";
import { useState } from "react";

export default function SecondaryCard({
  icon,
  title,
  options,
  subTitle,
  cardWidth,
  onClick,
}) {
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
        width: cardWidth,
        height: "80px",
        border: "1px solid",
        borderColor: "var(--border-color)",
        borderRadius: "10px",
        padding: "8px",
      }}
      elevation={0}
      onClick={onClick}
    >
      <Stack flexDirection="row">
        <Stack flexDirection="row" alignItems="center" gap="15px">
          <Stack
            sx={{
              minWidth: "62px",
              height: "60px",
              backgroundColor: "var(--sec-color-acc-1)",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icon}
          </Stack>
          <Stack>
            <Typography
              sx={{
                color: "var(text4)",
                fontFamily: "Lato",
                fontSize: "14px",
                fontWeight: "700",
                maxWidth: "160px",
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                color: "var(text4)",
                fontFamily: "Lato",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              {subTitle}
            </Typography>
          </Stack>
        </Stack>
        <Stack marginLeft="auto" alignItems="center" flexDirection="row">
          <Typography>Live</Typography>
          <Switch
            color="warning"
            sx={{
              "& .MuiSwitch-thumb": {
                backgroundColor: "var(--sec-color-acc-1)",
              },
              "& .MuiSwitch-track": {
                backgroundColor: "var(--sec-color-acc-1)",
              },
              "& .Mui-checked + .MuiSwitch-track": {
                backgroundColor: "var(--sec-color)",
              },
            }}
          />
        <Button variant="contained" endIcon="<East />" sx={{backgroundColor:"var(--sec-color)"}} disableElevation></Button>
        </Stack>
        <IconButton
          sx={{
            marginLeft: "auto",
            "&.MuiIconButton-root": {
              padding: "0px",
            },
          }}
          onClick={menuOpen}
          disableRipple
        >
          <MoreVert sx={{ color: "var(--text3)" }} />
        </IconButton>
        <Menu
          anchorEl={isMenuOpen}
          open={Boolean(isMenuOpen)}
          onClose={menuClose}
          slotProps={{
            paper: {
              style: {
                width: "90px",
                border: "1px solid",
                borderColor: "var(--border-color)",
              },
            },
          }}
          elevation={0}
        >
          {options.map((option, index) => (
            <MenuItem
              key={index}
              onClick={menuClose}
              sx={{
                height: "30px",
                color: "var(text4)",
                fontSize: "14px",
                fontFamily: "Lato",
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Card>
  );
}
