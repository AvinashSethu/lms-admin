"use client";
import PrimaryCard from "@/src/components/PrimaryCard/PrimaryCard";
import { Stack } from "@mui/material";
import weekcalendar from "@/public/Icons/weekCalendar.svg";
import series from "@/public/Icons/series.svg";
import { useParams, useRouter } from "next/navigation";

export default function Exam() {
  const params = useParams();
  const id = params.id;
  console.log(params);
  
  const router = useRouter();
  return (
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
      <Stack flexDirection="row" gap="20px">
        <PrimaryCard
          icon={weekcalendar.src}
          title="Exam Groups"
          actionButton="View" 
          onClick={() => {
            router.push(`/dashboard/goals/${id}/examgroups`);
          }}
        />
        <PrimaryCard
          icon={series.src}
          title="TMA Test series"
          actionButton="View"
          onClick={() => {
            router.push("/dashboard/goals/1/testseries");
          }}
        />
      </Stack>
    </Stack>
  );
}
