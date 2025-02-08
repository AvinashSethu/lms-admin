"use client";
import { useState } from "react";
import Header from "@/src/components/Header/Header";
import { East, SaveAlt, West } from "@mui/icons-material";
import {
  Button,
  Stack,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
} from "@mui/material";
import BasicStepper from "./Components/BasicStepper";
import AdditionalStepper from "./Components/AdditionalStepper";
import ExplanationStepper from "./Components/ExplanationStepper";

export default function AddQuestion() {
  const steps = ["Basic Info", "Additional Info", "Explanation", "Preview"];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
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
            minHeight: "60vh",
            width: "650px",
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
                      borderWidth: 7,
                      borderRadius: "50px",
                      margin: "0px 10px",
                    },
                  }}
                />
              }
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      "& .MuiStepIcon-root": {
                        color: "var(--text4)",
                        width: "30px",
                        height: "30px",
                      },
                      "& .Mui-active .MuiStepIcon-root": {
                        color: "var(--primary-color)",
                      },
                      "& .Mui-completed .MuiStepIcon-root": {
                        color: "var(--primary-color)",
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <hr
              style={{
                border: "1px solid var(--border-color)",
                marginTop: "25px",
              }}
            />
          </Stack>

          {activeStep === 0 && <BasicStepper />}
          {activeStep === 1 && <AdditionalStepper />}
          {activeStep === 2 && <ExplanationStepper />}
          <Stack flexDirection="row" sx={{ marginTop: "auto", gap: "20px" }}>
            {activeStep > 0 && (
              <Button
                variant="text"
                startIcon={<West />}
                onClick={handleBack}
                sx={{
                  textTransform: "none",
                  width: "100px",
                  color: "var(--primary-color)",
                }}
              >
                Previous
              </Button>
            )}

            {activeStep < steps.length - 1 ? (
              <Button
                variant="text"
                endIcon={<East />}
                sx={{
                  textTransform: "none",
                  width: "100px",
                  color: "var(--primary-color)",
                }}
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<SaveAlt />}
                sx={{
                  textTransform: "none",
                  width: "100px",
                  backgroundColor: "var(--primary-color)",
                }}
                disableElevation
              >
                Save
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
