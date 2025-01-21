import { Add, Delete, ExpandMore, MoreVert } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import QuestionCard from "./QuestionCard";
import StyledTextField from "../../StyledTextField/StyledTextField";

export default function SectionCard({
  icon,
  section,
  selected,
  button,
  options,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const menuOpen = (event) => {
    setIsMenuOpen(event.currentTarget);
  };
  const menuClose = () => {
    setIsMenuOpen(null);
  };
  return (
    <Accordion
      disableGutters
      expanded={isOpen}
      sx={{
        border: "1px solid var(--border-color)",
        borderRadius: "10px",
        minHeight: "80px",
        width: "100%",
        "&:before": {
          display: "none",
          margin: "0px",
        },
      }}
      elevation={0}
    >
      <AccordionSummary
        sx={{ margin: "0px" }}
        expandIcon={
          <IconButton
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <ExpandMore sx={{ color: "var(--text3)", fontSize: "30px" }} />
          </IconButton>
        }
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Stack flexDirection="row" alignItems="center" gap="20px">
            <Stack
              sx={{
                minWidth: "60px",
                height: "60px",
                backgroundColor: "var(--sec-color-acc-1)",
                borderRadius: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {icon}
            </Stack>
            <StyledTextField  placeholder="Enter Section"/>
          </Stack>
          <Stack gap="15px" flexDirection="row" alignItems="center">
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid var(--border-color)",
                width: "150px",
                borderRadius: "4px",
                padding: "0px 15px",
                minHeight: "40px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Lato",
                  fontSize: "14px",
                  color: "var(--sec-color)",
                  fontWeight: "500",
                }}
              >
                Selected
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Lato",
                  fontSize: "14px",
                  color: "var(--text4)",
                }}
              >
                {selected}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              endIcon={<Add />}
              sx={{
                backgroundColor: "var(--primary-color)",
                textTransform: "none",
              }}
              disableElevation
            >
              {button}
            </Button>
            <IconButton disabled>
              <Delete />
            </IconButton>
            <MoreVert sx={{ cursor: "pointer" }} onClick={menuOpen} />
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
      </AccordionSummary>
      <AccordionDetails>
        <Stack flexDirection="row" alignItems="center" gap="10px">
        <Checkbox sx={{
            color: "var(--primary-color)",
            "&.Mui-checked": {
              color: "var(--primary-color)",
            },
          }} />
          <Typography>Select all</Typography>
          </Stack>
        <Stack gap="15px">
        <QuestionCard
          questionNumber="Q1"
          questionType="MCQ"
          Subject="Numerical ability"
          question="What is the difference in the place value of 5 in the numeral 754853?"
          preview="Preview"
        />
        <QuestionCard />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
