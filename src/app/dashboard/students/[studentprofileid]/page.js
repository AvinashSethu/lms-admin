"use client";
import CustomTabs from "@/src/components/CustomTabs/CustomTabs";
import { ArrowBackIos } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import StudentProfile from "./StudentProfile";
import StudentExam from "./StudentExam";
import StudentSubscription from "./StudentSubscrition";
import StudentCourse from "./StudentCourse";

export default function Studentprofileid() {
    const router = useRouter();
  const tabs = [
    { label: "Profile" ,content: <StudentProfile />},
    { label: "Exams",content:<StudentExam /> },
    { label: "Subscriptions",content:<StudentSubscription /> },
    { label: "Courses",content:<StudentCourse /> },
  ];
  return (
    <Stack padding="20px" flexDirection="row" >
      <Stack
        sx={{
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "var(--white)",
          minHeight: "100vh",
          gap: "20px",
          width:"100%",
        }}
      >
        <CustomTabs tabs={tabs} width="408px" back />
    </Stack>
    </Stack>
  );
}
