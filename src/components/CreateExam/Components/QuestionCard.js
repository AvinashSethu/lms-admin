'use client';
import { MoreVert, Visibility } from "@mui/icons-material";
import {
  Checkbox,
  Chip,
  IconButton,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function QuestionCard({
  questionNumber,
  questionType,
  Subject,
  question,
  preview,
  check,
  options = [],
}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOpen = (event) => {
    setIsMenuOpen(event.currentTarget);
  };
  const menuClose = () => {
    setIsMenuOpen(null);
  };

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack>
        <Stack
          flexDirection="row"
          alignItems="center"
          sx={{
            padding: "15px",
            border: "1px solid var(--border-color)",
            borderRadius: "10px",
            height: "100px",
            width: "100%",
            gap: "15px",
            backgroundColor: "var(--white)",
          }}
        >
          {check && (
            <Checkbox
              sx={{
                color: "var(--sec-color)",
                "&.Mui-checked": {
                  color: "var(--sec-color)",
                },
                "&.MuiCheckbox-root": {
                  padding: "0px",
                },
              }}
            />
          )}
          <Stack width="100%" gap="8px">
            <Stack flexDirection="row" justifyContent="space-between">
              <Stack flexDirection="row" alignItems="center" gap="10px">
                <Typography>{questionNumber}</Typography>
                <Chip
                  label={questionType}
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Lato",
                    fontWeight: "700",
                    width: "70px",
                    height: "22px",
                    backgroundColor: "var(--sec-color-acc-1)",
                    color: "var(--sec-color)",
                    borderRadius: "4px",
                  }}
                />
                <Chip
                  label={Subject}
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Lato",
                    fontWeight: "700",
                    height: "22px",
                    backgroundColor: "var(--primary-color-acc-2)",
                    color: "var(--primary-color)",
                    borderRadius: "4px",
                  }}
                />
              </Stack>
            </Stack>
            <Typography>{question}</Typography>
          </Stack>
          <Stack gap="10px" flexDirection="row" marginLeft="auto"  alignItems="center">
            {/* <Chip
              icon={<Visibility sx={{ fontSize: "small" }} />}
              label={preview}
              sx={{
                fontSize: "10px",
                fontFamily: "Lato",
                fontWeight: "700",
                height: "20px",
                backgroundColor: "var(--border-color)",
                color: "var(--text3)",
              }}
            /> */}
            {preview}
            <IconButton sx={{ padding: "0px" }} onClick={menuOpen} disableRipple>
              <MoreVert sx={{color:"var(--text3)"}} />
            </IconButton>
            <Menu
            anchorEl={isMenuOpen}
            open={Boolean(isMenuOpen)}
            onClose={menuClose}
              disableScrollLock={true}
              sx={{ "& .MuiList-root": { padding: "3px" } }}
              slotProps={{
                paper: {
                  style: {
                    border: "1px solid",
                    borderColor: "var(--border-color)",
                    borderRadius: "8px",
                    padding: "0px",
                  },
                },
              }}
              elevation={0}
            >
              {options.map((option, index) => (
                <Stack key={index} onClick={menuClose}>
                  {option}
                </Stack>
              ))}
            </Menu>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
