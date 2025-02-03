"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import SecondaryCardSkeleton from "@/src/components/SecondaryCardSkeleton/SecondaryCardSkeleton";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { apiFetch } from "@/src/lib/apiFetch";
import { Add, Folder } from "@mui/icons-material";
import { DialogContent, Stack } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Coursebank() {
  const router = useRouter();
  const params = useParams();
  const bankID = params.id;
  const menuOptions = ["Remove"];
  const [course, setCourse] = useState({});
  const { showSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [isDialogOpen, setIsDialogOPen] = useState(false);

  function fetchCourse() {
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/course-bank/get-bank/${bankID}`
    ).then((data) => {
      if (data.success) {
        setCourse(data.data);
        console.log(data.data.resources);
      } else {
        showSnackbar("No Bank Found", "error", "", "3000");
        router.push(`/404`);
      }
    });
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  function OnCourseCreate() {
    if (!title) {
      showSnackbar("Fill all data", "error", "", "3000");
      return;
    }
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/course-bank/create-bank`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      }
    ).then((data) => {
      if (data.success) {
        showSnackbar(data.message, "success", "", "3000");
      } else {
        showSnackbar(data.message, "error", "", "3000");
      }
    });
  }

  useEffect(() => {
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api//courses/course-bank/get-all-bank`
    ).then((data) => {
      if (data.success) {
        setCourseList(data.data.banks);
      } else {
        setCourseList([]);
      }
    });
  }, []);

  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };
  // console.log(data.data.banks[0].title);

  return (
    <Stack padding="20px" gap="20px">
      <Header
        title="Course bank"
        search
        button="Add"
        icon={<Add />}
        onClick={dialogOpen}
      />
      <DialogBox
        isOpen={isDialogOpen}
        onClose={dialogClose}
        title="Add Course bank"
        actionText="Add Course bank"
        onClick={OnCourseCreate}
      >
        <DialogContent>
          <StyledTextField
            placeholder="Enter Course"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </DialogContent>
      </DialogBox>
      <Stack flexDirection="row" columnGap="40px" rowGap="15px" flexWrap="wrap">
        {courseList.length > 0
          ? courseList.map((item, index) => (
              <SecondaryCard
                key={index}
                icon={
                  <Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />
                }
                title={
                  <span
                    onClick={() => {
                      router.push(
                        `/dashboard/library/coursebank/${item.bankID}`
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {item.title}
                  </span>
                }
                options={menuOptions}
                cardWidth="350px"
                bankID={bankID}
                course={course}
                fetchCourse={fetchCourse}
              />
            ))
          : <SecondaryCardSkeleton />}
      </Stack>
    </Stack>
  );
}
