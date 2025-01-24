"use client";
import { MoreVert, SaveAlt } from "@mui/icons-material";
import {
  Card,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function TransactionCard({
  icon,
  options,
  name,
  email,
  date,
  id,
  price,
  status,
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
        width: "100%",
        height: "80px",
        border: "1px solid",
        borderColor: "var(--border-color)",
        borderRadius: "10px",
        padding: "8px",
      }}
      elevation={0}
      //   onClick={onClick}
    >
      <Stack flexDirection="row">
        <Stack flexDirection="row" alignItems="center" gap="20px">
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
          <Stack flexDirection="row" gap={20} alignItems="center">
            <Stack gap="5px">
              <Typography
                sx={{
                  fontFamily: "Lato",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "var(--text1)",
                }}
              >
                {name}
              </Typography>
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
            </Stack>
            <Stack gap="5px">
              <Typography
                sx={{
                  fontFamily: "Lato",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "var(--text3)",
                }}
              >
                Goal name
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Lato",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "var(--text3)",
                }}
              >
                Subscription/Course
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
                {date}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Lato",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "var(--text1)",
                }}
              >
                {`ID: ${id}`}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          flexDirection="row"
          marginLeft="auto"
          gap="30px"
          alignItems="center"
        >
          <Typography
            sx={{
              fontSize: "Lato",
              fontSize: "16px",
              fontWeight: "700",
              color: "var(--primary-color)",
            }}
          >
            {price}
          </Typography>
          <Chip
            label="success"
            size="small"
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "400",
              color: "var(--text1)",
            }}
          >
            {status}
          </Chip>
          <IconButton
            sx={{
              "&.MuiIconButton-root": {
                padding: "0px",
              },
            }}
            disableRipple
          >
            <SaveAlt />
          </IconButton>
          <IconButton
            sx={{
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
            {options.map((option, index) => (
              <MenuItem
                key={index}
                onClick={menuClose}
                sx={{
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
      </Stack>
    </Card>
  );
}
