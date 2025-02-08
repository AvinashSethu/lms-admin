import { Help } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

export default function DeleteDialogBox({ isOpen, onClose, actionButton }) {
  return (
    <Dialog
      open={isOpen}
      sx={{
        borderRadius: "30px",
        margin: "0px",
        "& .MuiDialogContainer": {
          margin: "0px",
        },
      }}
    >
      <DialogTitle
        sx={{ width: "300px", alignItems: "center", justifyContent: "center",gap:"40px" }}
      >
        <IconButton>
          <Help />
        </IconButton>
        <Typography>Delete Video ?</Typography>
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions sx={{ gap: "10px", width: "100%" }}>
        {actionButton}
      </DialogActions>
    </Dialog>
  );
}
