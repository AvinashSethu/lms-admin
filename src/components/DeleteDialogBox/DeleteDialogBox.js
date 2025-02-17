import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Typography,
} from "@mui/material";

export default function DeleteDialogBox({ isOpen, actionButton, name, title }) {
  return (
    <Dialog open={isOpen} TransitionComponent={Slide} PaperProps={{sx:{borderRadius:"15px",padding:"10px"}}} disableScrollLock={true} >
      <DialogTitle sx={{ width: "350px" }}>
        <Stack alignItems="center" gap="10px">
          <Stack
            sx={{
              color: "var(--delete-color)",
              backgroundColor: "#FBF3F3",
              padding: "15px",
              borderRadius: "50px",
            }}
          >
            <RemoveCircleRoundedIcon/>
          </Stack>
          <Typography sx={{ fontSize: "14px" }}>Delete {title}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{ textAlign: "center", fontFamily: "Lato", fontSize: "12px",fontWeight:"700" , color: "var(--text4)",}}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "Lato",
            fontSize: "12px",
            marginTop: "10px",
            color: "var(--text4)",
          }}
        >
          This action cannot be undone
        </Typography>
      </DialogContent>
      <DialogActions>{actionButton}
      
      </DialogActions>
    </Dialog>
  );
}
