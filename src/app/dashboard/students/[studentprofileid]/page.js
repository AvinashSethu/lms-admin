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
    <Stack padding="20px">
      <Stack flexDirection="row" alignItems="center">
        <ArrowBackIos onClick={() => {router.back();}} sx={{cursor:"pointer"}} />
        <CustomTabs tabs={tabs} width="408px" />
      </Stack>
    </Stack>
  );
}
