import Header from "@/src/components/Header/Header";
import MarkdownEditor from "@/src/components/MarkdownEditor/MarkdownEditor";
import StyledSelect from "@/src/components/StyledSelect/StyledSelect";
import { East } from "@mui/icons-material";
import {
  Button,
  Stack,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
} from "@mui/material";

export default function AddQuestion() {
  const steps = ["Basic Info", "Additional Info", "Explanation"];
  return (
    <Stack padding="20px" gap="20px">
      <Header title="Back" back />
      <Stack width="100%" alignItems="center">
        <Stack
          alignItems="center"
          sx={{
            border: "1px solid var(--border-color)",
            borderRadius: "10px",
            backgroundColor: "var(--white)",
            minHeight: "100vh",
            width: "600px",
            padding: "20px",
            gap: "20px",
          }}
        >
          <Stack sx={{ width: "100%" }}>
            <Stepper
              activeStep={1}
              alternativeLabel
              connector={
                <StepConnector
                  sx={{
                    "& .MuiStepConnector-line": {
                      borderColor: "var(--primary-color)",
                      borderWidth: 8,
                      borderRadius: "50px",
                      // maxWidth: "100px",
                    },
                  }}
                />
              }
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
          <hr style={{ border: "1px solid var(--border-color)" }} />
          <StyledSelect title="Question type" />
          <StyledSelect title="Subject" />
          <Stack
            flexDirection="row"
            width="100%"
            gap="20px"
            justifyContent="space-between"
          >
            <Button
              variant="outlined"
              sx={{
                borderColor: "var(--border-color)",
                textTransform: "none",
                color: "var(--text3)",
                fontFamily: "Lato",
                fontSize: "14px",
                fontWeight: "700",
                width: "170px",
              }}
            >
              Easy
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "var(--border-color)",
                textTransform: "none",
                color: "var(--text3)",
                fontFamily: "Lato",
                fontSize: "14px",
                fontWeight: "700",
                width: "170px",
              }}
            >
              Medium
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "var(--border-color)",
                textTransform: "none",
                color: "var(--text3)",
                fontFamily: "Lato",
                fontSize: "14px",
                fontWeight: "700",
                width: "170px",
              }}
            >
              Hard
            </Button>
          </Stack>
          <MarkdownEditor />
          <Button
            variant="text"
            endIcon={<East />}
            sx={{
              marginTop: "auto",
              textTransform: "none",
              width: "100px",
              color: "var(--primary-color)",
            }}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
