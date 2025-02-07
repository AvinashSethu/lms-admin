import { Help } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";

export default function DeleteDialogBox({isOpen,onClose,actionButton}) {
    return(
        <Dialog open={isOpen} >
            <DialogTitle>
                <IconButton>
                    <Help />
                </IconButton>
            </DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Stack>{actionButton}</Stack>
            </DialogActions>
        </Dialog>
    )
}