"use client";
import StudentProgressCard from "@/src/components/CreateExam/Components/StudentProgressCard";
import CustomPagination from "@/src/components/CustomPagination/CustomPagination";
import { Pagination, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Approved() {
  const router = useRouter();
  const page = router.query;
  const [currentPage, setCurrentPage] = useState(Number(page) || "");
  const totalPages = 10;

  // useEffect(() => {
  //   setCurrentPage(Number(page) || 1);
  // })
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Stack marginTop="20px" gap="15px">
        <StudentProgressCard
          name="Abishek A"
          email="21ec001@psr.edu.in"
          college="P.S.R Engineering College"
          options
        />
        <StudentProgressCard
          name="Abishek A"
          email="21ec001@psr.edu.in"
          college="P.S.R Engineering College"
          options
        />
        <StudentProgressCard
          name="Abishek A"
          email="21ec001@psr.edu.in"
          college="P.S.R Engineering College"
          options
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
        {/* <CustomPagination count={totalPages} page={currentPage} onPageChange={handlePageChange} /> */}
      </Stack>
    </Stack>
  );
}
