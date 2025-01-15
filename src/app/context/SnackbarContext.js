"use client";
import React, { createContext, useState, useContext, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const showSnackbar = useCallback(
    (message, severity, icon = {}, autoHideDuration) => {
      setSnackbar({
        open: true,
        message,
        severity,
        icon,
        autoHideDuration: icon ? null : autoHideDuration,
      });
    },
    []
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(!snackbar);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        elevation={0}
        sx={{
          "& .MuiPaper-root": {
            padding: "8px",
            alignItems:"center",
          },
        }}
      >
        <Alert
          severity={snackbar.severity}
          action={
            snackbar.icon ? (
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                sx={{"&.MuiIconButton-root":{
                  fontSize:"16px",
                  padding:"4px",
                  color:"var(text3)"
                }}}
              >
                {snackbar.icon === "close" ? (
                  <CloseIcon fontSize="small" />
                ) : (
                  snackbar.icon
                )}
              </IconButton>
            ) : null
          }
          sx={{
            "& .MuiAlert-action": {
              padding:"0px"
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
