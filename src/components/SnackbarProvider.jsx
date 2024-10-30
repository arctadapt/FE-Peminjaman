import React, { createContext, useContext, useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarContext = createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const isMobile = useMediaQuery("(max-width:600px)");

  const showSnackbar = (message = "", severity = "info") => {
    setSnackbar({ open: true, message: message || "No message", severity });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      {snackbar.open && snackbar.message && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            maxWidth: isMobile ? "100%" : "100%",
            mt: isMobile ? 7 : 3,
          }}
        >
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            sx={{
              width: isMobile ? "80%": "100%",
              fontSize: isMobile ? "0.75rem" : "1rem",
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
