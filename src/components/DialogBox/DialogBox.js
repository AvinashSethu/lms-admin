import { Close, East } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function DialogBox({
  children,
  isOpen,
  onClose,
  title,
  actionText,
}) {
  return (
    <Dialog
      open={isOpen}
      sx={{
        "& .MuiDialog-paper": {
          width: "600px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <Close onClick={onClose} sx={{ cursor: "pointer" }} />
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", gap: "20px", flexDirection: "column" }}
      >
        {children}
        {/* 
        <DialogContent sx={{ padding: "0px" }}>
          <Typography
            sx={{ fontFamily: "Lato", fontSize: "14px", color: "var(--text4)" }}
          >
            Select icon
          </Typography>
          <Stack flexDirection="row" justifyContent="center" gap={2}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "var(--sec-color-acc-1)",
                borderRadius: "15px",
              }}
            >
              <Image src={icon1} alt="title" width={18} height={20} />
            </Stack>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "var(--sec-color-acc-2)",
                borderRadius: "15px",
              }}
            >
              <Image src={icon2} alt="title" width={18} height={20} />
            </Stack>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "var(--sec-color-acc-2)",
                borderRadius: "15px",
              }}
            >
              <Image src={icon3} alt="title" width={18} height={20} />
            </Stack>
          </Stack>
        </DialogContent> */}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="text"
          sx={{
            textTransform: "none",
            color: "var(--primary-color)",
            fontFamily: "Lato",
            fontSize: "14px",
          }}
          endIcon={<East />}
        >
          {actionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
