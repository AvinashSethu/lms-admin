"use client";
import { useState } from "react";
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
  const [activeStep, setActiveStep] = useState(0); // State to track active step

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

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
              activeStep={activeStep}
              alternativeLabel
              connector={
                <StepConnector
                  sx={{
                    "& .MuiStepConnector-line": {
                      borderColor: "var(--primary-color)",
                      borderWidth: 8,
                      borderRadius: "50px",
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

          {/* Step Content Rendering */}
          {activeStep === 0 && (
            <>
              <StyledSelect title="Question type" />
              <StyledSelect title="Subject" />
            </>
          )}
          {/* {activeStep === 1 && <MarkdownEditor />} */}
          {activeStep === 2 && <p>Final Step: Explanation</p>}

          <Button
            variant="text"
            endIcon={<East />}
            sx={{
              marginTop: "auto",
              textTransform: "none",
              width: "100px",
              color: "var(--primary-color)",
            }}
            onClick={handleNext}
            disabled={activeStep === steps.length - 1} // Disable at last step
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
