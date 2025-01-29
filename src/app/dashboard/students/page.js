"use client";
import CustomPagination from "@/src/components/CustomPagination/CustomPagination";
import FilterSideNav from "@/src/components/FilterSideNav/FilterSideNav";
import Header from "@/src/components/Header/Header";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { Add, FilterAlt } from "@mui/icons-material";
import { Button, Pagination, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// export const metadata = {
//   title:"Students",
// };

export default function Students() {
  const router = useRouter();
  const menuOptions = ["Remove"];
  const page = router.query;
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const totalPages = 10;
  const [isOpen, setIsOpen] = useState(false);
  const filterOpen = () => {
    setIsOpen(!isOpen);
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  useEffect(() => {
    setCurrentPage(Number(page) || 1);
  }, [page]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Stack padding="20px" gap="20px">
      <Header title="Students" button="Student" icon={<Add />} />
      <Stack
        sx={{
          backgroundColor: "var(--white)",
          border: "1px solid",
          borderColor: "var(--border-color)",
          borderRadius: "10px",
          padding: "20px",
          gap: "20px",
          minHeight: "100vh",
        }}
      >
        <Stack>
          <Stack flexDirection="row" gap="10px" alignItems="flex-end">
            <SearchBox />
            <Button
              variant="contained"
              endIcon={<FilterAlt />}
              onClick={filterOpen}
              sx={{
                backgroundColor: "var(--primary-color)",
                textTransform: "none",
                height: "40px",
                borderRadius: "4px",
                minWidth: "100px",
              }}
              disableElevation
            >
              Filter
            </Button>
            <FilterSideNav
              isOpen={isOpen}
              toggleDrawer={toggleDrawer}
              select_1="Question type"
              select_2="Select date from & to"
              select_3="Sort Marks"
            />
          </Stack>
        </Stack>
        <Stack gap="15px">
          <SecondaryCard
            icon={
              <Image
                src="/Icons/studentCard.svg"
                alt="icon"
                width={24}
                height={24}
              />
            }
            title={
              <Stack flexDirection="row" alignItems="center" gap={15}>
                <Typography
                  onClick={() => {
                    router.push("/dashboard/students/1");
                  }}
                  sx={{
                    fontFamily: "Lato",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "var(--text1)",
                    cursor: "pointer",
                  }}
                >
                  Abishek A
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Lato",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "var(--text1)",
                  }}
                >
                  21ec001@psr.edu.in
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Lato",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "var(--text1)",
                  }}
                >
                  GATE CSE
                </Typography>
              </Stack>
            }
            options={menuOptions}
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
          <CustomPagination
            count={totalPages}
            page={currentPage}
            onPageChange={handlePageChange}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
