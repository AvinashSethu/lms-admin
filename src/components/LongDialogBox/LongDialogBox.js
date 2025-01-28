import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function LongDialogBox({ children, isOpen, onClose, title }) {
  return (
    <Dialog
      open={isOpen}
      disableScrollLock={true}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "lg",
          minHeight:"90vh",
          borderRadius: "10px",
          border: "1px solid",
          borderColor: "var(--border-color)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "Lato",
          fontSize: "20px",
          fontWeight: "700",
          paddingBottom: "0px",
        }}
      >
        {title}
        <Close onClick={onClose} sx={{ cursor: "pointer" }} />
      </DialogTitle>
      <DialogContent sx={{ padding: "0px" }}>{children}</DialogContent>
    </Dialog>
  );
}
