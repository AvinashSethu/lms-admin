import { Help } from "@mui/icons-material";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";

export default function DeleteDialogBox({ isOpen, actionButton, name }) {
  return (
    <Dialog open={isOpen} TransitionComponent={Slide}>
      <DialogTitle sx={{ width: "350px" }}>
        <Stack alignItems="center" gap="10px">
          <Stack
            sx={{
              color: "#D64545",
              backgroundColor: "#FBF3F3",
              padding: "15px",
              borderRadius: "50px",
            }}
          >
            <RemoveCircleRoundedIcon/>
          </Stack>
          <Typography sx={{ fontSize: "14px" }}>Delete Resource ?</Typography>
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
      <DialogActions>{actionButton}</DialogActions>
    </Dialog>
  );
}
