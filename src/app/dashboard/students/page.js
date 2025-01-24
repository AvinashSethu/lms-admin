"use client";
import FilterSideNav from "@/src/components/FilterSideNav/FilterSideNav";
import Header from "@/src/components/Header/Header";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { Add, ArrowBackIos, FilterAlt } from "@mui/icons-material";
import { Button, Pagination, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// export const metadata = {
//   title:"Students",
// };
export default function Students() {
  const menuOptions = ["Remove"];
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
  const router = useRouter();
  return (
    <Stack padding="20px" gap="20px">
      <Header
        title="Students"
        button="Student"
        icon={<Add />}
        onClick={() => {
          router.push("/dashboard/students/1");
        }}
      />
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
        <Stack  >
          {/* <ArrowBackIos /> */}
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
                  sx={{
                    fontFamily: "Lato",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "var(--text1)",
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
                  sx={{
                    fontFamily: "Lato",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "var(--text1)",
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
                  sx={{
                    fontFamily: "Lato",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "var(--text1)",
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
          <Pagination count={9} shape="rounded" variant="outlined" />
        </Stack>
      </Stack>
    </Stack>
  );
}
