import { Add, Delete, ExpandMore, MoreVert } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useCallback } from "react";
import QuestionCard from "./QuestionCard";
import StyledTextField from "../../StyledTextField/StyledTextField";
import LongDialogBox from "../../LongDialogBox/LongDialogBox";
import SearchBox from "../../SearchBox/SearchBox";

const selectFields = [
  {
    name: "languageSelect",
    label: "Language",
    options: ["One", "Two", "Three"],
  },
  {
    name: "qTypeSelect",
    label: "Question Type",
    options: ["MCQ", "Fill in the Blanks"],
  },
  {
    name: "difficultySelect",
    label: "Difficulty",
    options: ["Easy", "Medium", "Hard"],
  },
  {
    name: "eachSelect",
    label: "Each",
    options: ["Option 1", "Option 2", "Option 3"],
  },
];

export default function SectionCard({
  icon,
  selected,
  button,
  options,
  addQuestion,
}) {
  const [menuState, setMenuState] = useState({ open: false, anchor: null });
  const [isOpen, setIsOpen] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState(
    Object.fromEntries(selectFields.map(({ name }) => [name, ""]))
  );

  const handleMenuOpen = (event) =>
    setMenuState({ open: true, anchor: event.currentTarget });
  const handleMenuClose = () => setMenuState({ open: false, anchor: null });

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormValues((prevState) =>
      Object.fromEntries(Object.keys(prevState).map((key) => [key, ""]))
    );
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const renderSelectFields = useCallback(() => {
    return selectFields.map(({ name, label, options }) => (
      <FormControl key={name} sx={{ width: "100%" }} size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          label={label}
          value={formValues[name]}
          onChange={handleFormChange}
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
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ));
  }, [formValues]);

  return (
    <Accordion
      disableGutters
      expanded={isOpen}
      sx={{
        border: "1px solid var(--border-color)",
        borderRadius: "10px",
        minHeight: "80px",
        width: "100%",
        "&:before": { display: "none" },
      }}
      elevation={0}
    >
      <AccordionSummary
        sx={{ margin: "0px" }}
        expandIcon={
          <IconButton onClick={() => setIsOpen(!isOpen)}>
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
            <StyledTextField placeholder="Enter Section" />
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
              <Typography sx={{ fontWeight: "500", color: "var(--sec-color)" }}>
                Selected
              </Typography>
              <Typography sx={{ color: "var(--text4)" }}>{selected}</Typography>
            </Stack>
            <Button
              variant="contained"
              endIcon={<Add />}
              onClick={handleDialogOpen}
              sx={{
                backgroundColor: "var(--primary-color)",
                textTransform: "none",
              }}
              disableElevation
            >
              {button}
            </Button>
            <LongDialogBox
              isOpen={isDialogOpen}
              onClose={handleDialogClose}
              title="Add to section 1"
            >
              <DialogContent>
                <Stack gap="20px">
                  <Stack flexDirection="row" gap="10px">
                    {renderSelectFields()}
                    <Stack
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      gap="10px"
                      sx={{
                        border: "1px solid",
                        borderColor: "var(--border-color)",
                        width: "150px",
                        borderRadius: "4px",
                        padding: "0px 15px",
                        pointerEvents: "none",
                        opacity: 0.5,
                      }}
                      disabled
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
                        60
                      </Typography>
                    </Stack>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--primary-color)",
                        textTransform: "none",
                        width: "100px",
                      }}
                      disableElevation
                    >
                      Apply
                    </Button>
                  </Stack>
                  <Stack flexDirection="row" gap="10px">
                    <SearchBox />
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--primary-color)",
                        textTransform: "none",
                        width: "100px",
                      }}
                      disableElevation
                    >
                      Add
                    </Button>
                  </Stack>
                  <Stack flexDirection="row" justifyContent="space-between">
                    <Stack flexDirection="row" gap="10px">
                      <Checkbox
                        sx={{
                          color: "var(--primary-color)",
                          "&.Mui-checked": {
                            color: "var(--primary-color)",
                          },
                          "&.MuiCheckbox-root": {
                            padding: "0px",
                          },
                        }}
                      />
                      <Typography>Select all</Typography>
                    </Stack>
                    <Typography>(selected 2)</Typography>
                  </Stack>
                  <QuestionCard
                    questionNumber="Q1"
                    questionType="MCQ"
                    Subject="Numerical ability"
                    question="What is the difference in the place value of 5 in the numeral 754853?"
                    preview="Preview"
                    check
                  />
                  <QuestionCard
                    questionNumber="Q1"
                    questionType="MCQ"
                    Subject="Numerical ability"
                    question="What is the difference in the place value of 5 in the numeral 754853?"
                    preview="Preview"
                    check
                  />
                </Stack>
              </DialogContent>
            </LongDialogBox>
            <IconButton disabled>
              <Delete />
            </IconButton>
            <MoreVert sx={{ cursor: "pointer" }} onClick={handleMenuOpen} />
            <Menu
              anchorEl={menuState.anchor}
              open={menuState.open}
              onClose={handleMenuClose}
              disableScrollLock
              PaperProps={{
                sx: { border: "1px solid var(--border-color)" },
              }}
              elevation={0}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={handleMenuClose}
                  sx={{ color: "var(--text4)", fontFamily: "Lato" }}
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
          <Checkbox
            sx={{
              color: "var(--primary-color)",
              "&.Mui-checked": { color: "var(--primary-color)" },
            }}
          />
          <Typography>Select all</Typography>
        </Stack>
        <Stack gap="15px">
          <QuestionCard
            questionNumber="Q1"
            questionType="MCQ"
            Subject="Numerical ability"
            question="What is the difference in the place value of 5 in the numeral 754853?"
            preview="Preview"
            check
          />
          <QuestionCard
            questionNumber="Q2"
            questionType="Fill up"
            Subject="Numerical ability"
            question="What is the difference in the place value of 5 in the numeral 754853?"
            preview="Preview"
            check
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
