"use client";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import {
  Add,
  Close,
  Delete,
  East,
  PushPin,
  Visibility,
} from "@mui/icons-material";
import {
  Button,
  DialogContent,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Info() {
  const menuOptions = ["Remove"];
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const [infoList, setInfoList] = useState([{}]);
  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };
  return (
    <Stack
      sx={{
        backgroundColor: "var(--white)",
        border: "1px solid",
        borderColor: "var(--border-color)",
        borderRadius: "10px",
        padding: "20px",
        gap: "20px",
        minHeight: "100vh",
      }}
    >
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "16px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Contents
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
        title="Info editor"
        icon={
          <IconButton
            sx={{ borderRadius: "5px", padding: "2px" }}
            onClick={dialogClose}
          >
            <Close />
          </IconButton>
        }
        actionButton={
          <Button
            variant="text"
            endIcon={<East />}
            sx={{ textTransform: "none", color: "var(--primary-color)" }}
          >
            Save
          </Button>
        }
      >
        <DialogContent>
          <Stack gap="15px">
            <Typography>Title</Typography>
            <Stack flexDirection="row" justifyContent="space-between">
              <StyledTextField placeholder="Enter title" />
            </Stack>
          </Stack>
        </DialogContent>
      </DialogBox>
      <Stack flexWrap="wrap" flexDirection="row" rowGap="20px" columnGap="50px">
        {infoList.length > 0
          ? infoList.map((item, index) => (
              <SecondaryCard
                key={index}
                icon={
                  <PushPin
                    sx={{
                      color: "var(--sec-color)",
                      transform: "rotate(45deg)",
                    }}
                  />
                }
                title="Overview"
                options={[
                  <MenuItem
                    key={index}
                    sx={{
                      gap: "8px",
                      padding: "5px 8px",
                      fontSize: "13px",
                      minWidth: "60px",
                      borderRadius: "4px",
                    }}
                  >
                    <Visibility sx={{ fontSize: "16px" }} />
                    View
                  </MenuItem>,
                  <MenuItem
                    key={index}
                    sx={{
                      gap: "8px",
                      padding: "5px 8px",
                      fontSize: "13px",
                      color: "var(--delete-color)",
                      borderRadius: "4px",
                    }}
                  >
                    <Delete sx={{ fontSize: "16px" }} />
                    Delete
                  </MenuItem>,
                ]}
                cardWidth="350px"
              />
            ))
          : ""}
      </Stack>
    </Stack>
  );
}
