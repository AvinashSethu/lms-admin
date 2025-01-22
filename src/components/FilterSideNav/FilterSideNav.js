import { Close } from "@mui/icons-material";
import {
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

export default function FilterSideNav({ isOpen, toggleDrawer,select_1 ,select_2,select_3}) {
  return (
    <Drawer anchor="right" open={isOpen} disableScrollLock={true} ModalProps={{
        BackdropProps: {
          style: { backgroundColor: 'transparent' },
        },
      }}>
      <Stack width="300px" padding="20px" gap="20px">
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography
            sx={{ fontFamily: "Lato", fontSize: "16px", fontWeight: "700" }}
          >
            Filter
          </Typography>
          <Close onClick={toggleDrawer(false)} sx={{ cursor: "pointer" }} />
        </Stack>
        <FormControl size="small">
          <InputLabel>{select_1}</InputLabel>
          <Select
            label={select_1}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--sec-color)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--sec-color)",
              },
            }}
          >
            <MenuItem value="">Completed</MenuItem>
            <MenuItem value="">inprogress</MenuItem>
            <MenuItem value="">scheduled</MenuItem>
            <MenuItem value="">terminated</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>{select_2}</InputLabel>
          <Select
            label={select_2}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--sec-color)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--sec-color)",
              },
            }}
          >
            <MenuItem value="">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>{select_3}</InputLabel>
          <Select
            label={select_3}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--sec-color)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--sec-color)",
              },
            }}
          >
            <MenuItem value="">Ascending</MenuItem>
            <MenuItem value="">descending</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={toggleDrawer(false)}
          sx={{
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
            borderRadius: "4px",
          }}
          disableElevation
        >
          Apply
        </Button>
      </Stack>
    </Drawer>
  );
}
