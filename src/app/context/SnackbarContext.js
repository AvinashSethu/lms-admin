"use client";
import { Alert, Snackbar, Slide, Stack } from "@mui/material";
import { createContext, useContext, useState } from "react";

const SnackbarContext = createContext();
function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}
export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: "success",
  });
  const openSnackbar = (message, severity, closeIcon = {}) => {
    setSnackbar({
      isOpen: true,
      message,
      severity,
      actionButton: closeIcon.actionButton || null,
    });
  };
  const closeSnackbar = () => {
    setSnackbar({
      isOpen: false,
      message: "",
      severity: "success",
    });
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.isOpen}
        // autoHideDuration={3000}
        
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
        sx={{
          "& .MuiSnackbarContent-root": {
            marginTop: "20px",
          },
        }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{
            width: "100%",
            "& .MuiAlert-message": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          {snackbar.message}
          {snackbar.actionButton && <Stack > {snackbar.actionButton}</Stack>}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
export const useSnackbar = () => useContext(SnackbarContext);
