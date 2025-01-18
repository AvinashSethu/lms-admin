import { Stack } from "@mui/system";
import GoalHead from "./components/GoalHead/GoalHead";
import GoalTabs from "./components/GoalTabs/GoalTabs";

export default async function Goals({ params }) {
  const id = (await params).id;
  const tabs = [
    { label: "Syllabus" },
    { label: "Exam" },
    { label: "Info" },
    { label: "Settings" },
  ];
  return (
    <Stack sx={{ padding: "20px", gap: "15px" }}>
      <GoalHead id={id} />
      <GoalTabs tabs={tabs} />
    </Stack>
  );
}
