import DialogBox from "@/src/components/DialogBox/DialogBox";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { Close, East } from "@mui/icons-material";
import { Button, DialogContent, IconButton } from "@mui/material";

export default function VideoDialog({
  isOpen,
  videoDialogClose,
  title,
  setTitle,
  onCourseCreate,
}) {
  return (
    <DialogBox
      isOpen={isOpen}
      title="Add Course"
      actionText="Create"
      icon={
        <IconButton
          sx={{ borderRadius: "10px", padding: "6px" }}
          onClick={videoDialogClose}
        >
          <Close />
        </IconButton>
      }
      actionButton={
        <Button
          variant="text"
          endIcon={<East />}
          sx={{ textTransform: "none", color: "var(--primary-color)" }}
          onClick={() => {
            onCourseCreate();
          }}
        >
          Add Course
        </Button>
      }
    >
      <DialogContent>
        <StyledTextField
          placeholder="Enter video Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </DialogContent>
    </DialogBox>
  );
}
