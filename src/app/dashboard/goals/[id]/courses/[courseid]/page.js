"use client";
import { Stack } from "@mui/material";
import CustomTabs from "@/src/components/CustomTabs/CustomTabs";
import Basic from "../Components/Basic";
import Videos from "../Components/Videos";
import Subscription from "../Components/Subscription";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/src/lib/apiFetch";
import GoalHead from "../../components/GoalHead/GoalHead";

export default function Courseid() {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [goal, setGoal] = useState({});

  function fetchGoal() {
    apiFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/${id}`).then(
      (json) => {
        if (json.success) {
          setGoal(json.data);
        }
      }
    );
  }

  useEffect(() => {
    fetchGoal();
  }, []);

  const tabs = [
    { label: "Basic", content: <Basic /> },
    { label: "Resources", content: <Videos /> },
    { label: "Subscription", content: <Subscription /> },
  ];

  return (
    <Stack padding="20px" gap="20px">
      <GoalHead id={id} goal={goal} fetchGoal={fetchGoal} />
      <Stack
        sx={{
          padding: "20px",
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          minHeight: "100vh",
          backgroundColor: "var(--white)",
        }}
      >
        <CustomTabs tabs={tabs} />
      </Stack>
    </Stack>
  );
}
