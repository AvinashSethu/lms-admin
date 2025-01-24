import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { Edit } from "@mui/icons-material";
import { Avatar, Button, Stack, Typography } from "@mui/material";

export default function StudentProfile() {
  return (
    <Stack
      sx={{
        gap:"15px",
        marginTop:"20px"
      }}
    >
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "18px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Personal details
        </Typography>
        <Button
          variant="contained"
          startIcon={<Edit />}
          sx={{
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
          }}
          disableElevation
        >
          Edit
        </Button>
      </Stack>
      <Avatar sx={{width:"80px",height:"80px",fontSize:"40px"}} >A</Avatar>
      <hr />
      <Stack flexDirection="row" flexWrap="wrap" rowGap="15px" columnGap="40px" >
        <Stack gap="5px" width="300px">
            <Typography>Name</Typography>
            <Stack><StyledTextField placeholder="Enter Name" /></Stack>
        </Stack>
        <Stack gap="5px"  width="300px">
            <Typography>Email</Typography>
            <Stack><StyledTextField placeholder="Enter email" /></Stack>
        </Stack>
        <Stack gap="5px"  width="300px">
            <Typography>Phone</Typography>
            <Stack><StyledTextField placeholder="Enter number" /></Stack>
        </Stack>
        <Stack gap="5px"  width="300px">
            <Typography>Gender</Typography>
            <Stack><StyledTextField placeholder="Enter gender" /></Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
