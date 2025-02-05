import { Close, East } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

export default function DialogBox({
  children,
  isOpen,
  onClose,
  title,
  icon,
  actionButton,
  onClick
}) {
  return (
    <Dialog
      open={isOpen}
      disableScrollLock={true}
      sx={{
        "& .MuiDialog-paper": {
          width: "600px",
          borderRadius:"10px",
          border:"1px solid",
          borderColor:"var(--border-color)"
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily:"Lato",
          fontSize:"20px",
          fontWeight:"700",
          paddingBottom:"0px"
        }}
      >
        {title}
        {icon}
        {/* <Close onClick={onClose} sx={{ cursor: "pointer" }}  /> */}
      </DialogTitle>
      <DialogContent sx={{padding:"0px"}}>{children}</DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Stack>{actionButton}</Stack>
        {/* <Button
          variant="text"
          onClick={onClick}
          sx={{
            textTransform: "none",
            color: "var(--primary-color)",
            fontFamily: "Lato",
            fontSize: "14px",
          }}
          endIcon={<East />}
        >
          {actionText}
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
