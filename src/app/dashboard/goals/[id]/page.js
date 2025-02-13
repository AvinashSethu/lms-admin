"use client";
import { Stack } from "@mui/system";
import GoalHead from "./components/GoalHead/GoalHead";
import GoalTabs from "./components/GoalTabs/GoalTabs";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/src/lib/apiFetch";
import { useEffect, useState } from "react";
import { useSnackbar } from "@/src/app/context/SnackbarContext";

export default function Goals() {
  const {showSnackbar} = useSnackbar();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [goal, setGoal] = useState({});

  function fetchGoal() {
    apiFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/${id}`).then(
      (json) => {
        
        if (json.success) {
          setGoal(json.data);
          // console.log(json.data.coursesList);
        } else {
          showSnackbar("No Goal Found","error","","3000");
          router.push(`/404`);
        }
      }
    );
  }
  
  useEffect(() => {
    fetchGoal();
  }, []);

  const tabs = [
    { label: "Syllabus" },
    { label: "Exam" },
    { label: "Info" },
    { label: "Settings" },
  ];

  return (
    <Stack sx={{ padding: "20px", gap: "15px" }}>
      <GoalHead id={id} goal={goal} fetchGoal={fetchGoal} />
      <GoalTabs tabs={tabs} goal={goal} fetchGoal={fetchGoal} />
    </Stack>
  );
}
