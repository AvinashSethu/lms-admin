"use client";
import { Stack } from "@mui/material";
import GoalHead from "../../components/GoalHead/GoalHead";
import CustomTabs from "@/src/components/CustomTabs/CustomTabs";
import Basic from "../Components/Basic";
import Videos from "../Components/Videos";
import Subscription from "../Components/Subscription";
import Header from "@/src/components/Header/Header";

export default function Courseid({id,goal}) {
  const tabs = [
    { label: "Basic", content: <Basic /> },
    { label: "Videos", content: <Videos /> },
    { label: "Subscription", content: <Subscription /> },
  ];
  return (
    <Stack padding="20px" gap="20px">
      {/* <GoalHead /> */}
      <Header title="hi"  back />
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
