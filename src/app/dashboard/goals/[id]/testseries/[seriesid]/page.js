"use client";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { ArrowBackIosRounded, CalendarToday, Label } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import calendar from "@/public/Icons/weekCalendar.svg";
import CustomTabs from "@/src/components/CustomTabs/CustomTabs";
import Questions from "../../examgroups/[groupid]/[examid]/Questions/Questions";
import Settings from "../../examgroups/[groupid]/[examid]/Settings/Settings";
import Students from "../../examgroups/[groupid]/[examid]/Students/Students";

export default function Seriesid() {
  const tabs = [
    {label: "Questions",content: <Questions />},
    {label: "Settings",content: <Settings />},
    {label: "Students",content: <Students />},
  ]
  const router = useRouter();
  return (
    <Stack padding="20px">
      <Stack
        sx={{
          backgroundColor: "var(--white)",
          border: "1px solid",
          borderColor: "var(--border-color)",
          borderRadius: "10px",
          padding: "20px",
          gap: "25px",
          minHeight: "100vh",
        }}
      >
        <Stack flexDirection="row" gap="10px" alignItems="center">
          <ArrowBackIosRounded
            sx={{ fontSize: "18px", cursor: "pointer", fontWeight: "800" }}
            onClick={() => {
              router.back();
            }}
          />
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "18px",
              fontWeight: "700",
              color: "var(--text2)",
            }}
          >
            Exam Group
          </Typography>
        </Stack>
        <Stack>
          <SecondaryCard
            title={{ value: "Wednesday" }}
            icon={
              <Image src={calendar.src} alt="icon" width={24} height={24} />
            }
            subTitle={<Stack flexDirection="row" gap="25px" alignItems="center">
              <CalendarToday sx={{color:"var(--text4)",fontSize:"16px"}} />
              <Typography fontSize="14px">2024-08-05 08:00:00  --  2024-08-10 20:00:00</Typography>
              <Typography fontSize="14px">120 Questions</Typography>
              <Typography fontSize="14px">120 Minutes</Typography>
            </Stack>}
          />
        </Stack>
      <CustomTabs tabs={tabs}/>
      </Stack>
    </Stack>
  );
}
