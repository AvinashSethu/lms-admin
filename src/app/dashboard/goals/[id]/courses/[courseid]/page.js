"use client";
import { duration, Skeleton, Stack } from "@mui/material";
import CustomTabs from "@/src/components/CustomTabs/CustomTabs";
import Basic from "../Components/Basic";
import Videos from "../Components/Videos";
import Subscription from "../Components/Subscription";
import { useEffect, useState } from "react";
import Header from "@/src/components/Header/Header";
import { apiFetch } from "@/src/lib/apiFetch";
import { useParams } from "next/navigation";

export default function Courseid() {
  const [course, setCourse] = useState({
    courseID: "",
    goalID: "",
    title: "",
    description: "",
    thumbnail: "",
    language: [],
  });
  const [updateCourse, setUpdateCourse] = useState(null);
  const { id, courseID } = useParams();

  useEffect(() => {
    fetchCourse();
  }, [courseID, id]);

  const fetchCourse = async () => {
    try {
      const data = await apiFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/get`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseID, goalID: id }),
        }
      );
      if (data.success) {
        setCourse(data.data);
        console.log(data.data);
      }
    } catch (error) {}
  };

  const tabs = [
    {
      label: "Basic",
      content: (
        <Basic
          course={course}
          setCourse={setCourse}
          fetchCourse={fetchCourse}
        />
      ),
    },
    { label: "Lessons", content: <Videos /> },
    { label: "Subscription", content: <Subscription /> },
  ];

  return (
    <Stack padding="20px" gap="20px">
      <Header
        title={
          course.title ? (
            course.title
          ) : (
            <Skeleton variant="text" sx={{ width: "100px" }} />
          )
        }
        back
      />
      <Stack
        sx={{
          padding: "20px",
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          minHeight: "100vh",
          backgroundColor: "var(--white)",
        }}
      >
        <CustomTabs tabs={tabs} fetchCourse={fetchCourse} />
      </Stack>
    </Stack>
  );
}
