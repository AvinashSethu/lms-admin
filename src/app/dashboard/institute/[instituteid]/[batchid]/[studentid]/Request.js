import StudentProgressCard from "@/src/components/CreateExam/Components/StudentProgressCard";
import { Pagination, Stack, Typography } from "@mui/material";

export default function Request() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Stack marginTop="20px" gap="15px">
        <StudentProgressCard
          name="Abishek A"
          email="21ec001@psr.edu.in"
          college="P.S.R Engineering College"
          Request
        />
        <StudentProgressCard
          name="Abishek A"
          email="21ec001@psr.edu.in"
          college="P.S.R Engineering College"
          Request
        />
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="10px"
        sx={{
          width: "100%",
          marginTop: "auto",
        }}
      >
        <Typography
          sx={{ fontFamily: "Lato", fontSize: "13px", fontWeight: "400" }}
        >
          Total 85 items
        </Typography>
        <Pagination count={9} shape="rounded" variant="outlined" />
      </Stack>
    </Stack>
  );
}
