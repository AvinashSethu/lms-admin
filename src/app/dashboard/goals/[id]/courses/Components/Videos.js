"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import LectureCard from "@/src/components/LectureCard/LectureCard";
import LongDialogBox from "@/src/components/LongDialogBox/LongDialogBox";
import NoDataFound from "@/src/components/NoDataFound/NoDataFound";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import StyledSelect from "@/src/components/StyledSelect/StyledSelect";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { apiFetch } from "@/src/lib/apiFetch";
import { Link, LinkOff, PlayCircleRounded } from "@mui/icons-material";
import { Button, DialogContent, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Videos({ course, setCourse }) {
  const { showSnackbar } = useSnackbar();
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => setIsDialogOPen(true);
  const dialogClose = () => setIsDialogOPen(false);
  const [allBanks, setAllBanks] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");

  const moveCard = (fromIndex, toIndex) => {
    setCourse((prev) => {
      const updatedLessonIDs = [...prev.lessonIDs];
      const [movedLesson] = updatedLessonIDs.splice(fromIndex, 1);
      updatedLessonIDs.splice(toIndex, 0, movedLesson);
      return { ...prev, lessonIDs: updatedLessonIDs };
    });
  };

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  const handleLessonUpdate = (e, id, courseID, params = {}) => {
    console.log(id);
    console.log(courseID);
    console.log(params.title);

    const data = apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/lesson/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonID: id,
          courseID: courseID,
          ...params,
        }),
      }
    );
  };

  const onAddLesson = async () => {
    await apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/lesson/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseID: course.id }),
      }
    ).then((data) => {
      if (data.success) {
        showSnackbar(data.message, "success", "", "3000");
        console.log(data);
        fetchLesson();
      } else {
        console.log(data);
        showSnackbar(data.message, "error", "", "3000");
      }
    });
  };

  const fetchLesson = () => {
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/lesson/get`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseID: course.id }),
      }
    ).then((data) => {
      if (data.success) {
        console.log(data);
        setCourse((prev) => ({
          ...prev,
          lessonIDs: data.data.map((lesson) => ({
            id: lesson.id || "",
            title: lesson.title || "",
            path: lesson.path || "",
            courseID: lesson.courseID || "",
          })),
        }));
      }
    });
  };

  useEffect(() => {
    fetchLesson();
  }, []);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const data = await apiFetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/get-all-bank`
        );
        if (data.success) {
          setAllBanks(data.data.banks);
        } else {
          setAllBanks([]);
        }
      } catch (error) {
        console.error(data.message);
      }
    };
    fetchBanks();
  }, []);

  useEffect(() => {
    if (selectedBank) {
      fetchBank(selectedBank);
    }
  }, [selectedBank]);

  const fetchBank = async (bankID) => {
    try {
      const data = await apiFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/get-bank/${bankID}`
      );
      if (data.success) {
        setResourceList(data.data.resources);
      } else {
        showSnackbar("No Bank Found", "error", "", "3000");
        setResourceList([]);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  return (
    <Stack marginTop="20px" gap="20px">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={onAddLesson}
          sx={{
            backgroundColor: "var(--sec-color-acc-1)",
            color: "var(--sec-color)",
            textTransform: "none",
            height: "30px",
            marginLeft: "auto",
          }}
          disableElevation
        >
          Add Component
        </Button>
      </Stack>
      <Stack gap="10px">
        <DndProvider backend={HTML5Backend}>
          {course.lessonIDs && course.lessonIDs.length
            ? course.lessonIDs.map((item, index) => (
                <LectureCard
                  key={item}
                  id={item}
                  index={index}
                  title={
                    <StyledTextField
                      placeholder="Enter Lesson Title"
                      value={item.title}
                      // onChange={(e) => {
                      //   handleLessonUpdate(
                      //     e,
                      //     item.id,
                      //     item.courseID,
                      //     {title:item.title}
                      //   );
                      // } }
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => {
                        const newTitle = e.target.value;
                        handleLessonUpdate(e, item.id, item.courseID, {
                          title: newTitle,
                        });
                      }}
                      onChange={(e) => {
                        // const newTitle = e.target.value;
                        // setCourse((prev) => ({
                        //   ...prev,
                        //   lessonIDs: prev.lessonIDs.map((lesson) =>
                        //     lesson.id === item.id ? { ...lesson, title: newTitle } : lesson
                        //   ),
                        // }));
                        // handleLessonUpdate(e, item.id, item.courseID, { title: newTitle });
                        const newTitle = e.target.value;
                        setCourse((prev) => ({
                          ...prev,
                          lessonIDs: prev.lessonIDs.map((lesson) =>
                            lesson.id === item.id
                              ? { ...lesson, title: newTitle }
                              : lesson
                          ),
                        }));
                      }}
                    />
                  }
                  link={
                    <IconButton disableRipple>
                      {item.link ? (
                        <Link
                          sx={{ color: "var(--sec-color)" }}
                          onClick={dialogOpen}
                        />
                      ) : (
                        <LinkOff sx={{ color: "var(--sec-color)" }} />
                      )}
                    </IconButton>
                  }
                  preview
                  toggle
                  moveCard={moveCard}
                />
              ))
            : ""}
        </DndProvider>
      </Stack>
      <LongDialogBox
        isOpen={isDialogOpen}
        onClose={dialogClose}
        title="Link resources"
      >
        <DialogContent>
          <Stack gap="20px">
            <Stack flexDirection="row" gap="10px">
              <Stack width="30%">
                <StyledSelect
                  title="Select Course"
                  value={selectedBank}
                  options={allBanks}
                  getLabel={(bank) => bank.title}
                  getValue={(bank) => bank.bankID}
                  onChange={handleBankChange}
                />
              </Stack>
              <SearchBox />
            </Stack>
            <Stack
              flexDirection="row"
              columnGap="40px"
              rowGap="15px"
              flexWrap="wrap"
            >
              {resourceList.length > 0 ? (
                resourceList.map((item, index) => (
                  <SecondaryCard
                    key={index}
                    cardWidth="300px"
                    title={item.name}
                    icon={
                      <PlayCircleRounded sx={{ color: "var(--sec-color)" }} />
                    }
                    button={
                      <IconButton
                        sx={{
                          backgroundColor: "var(--sec-color-acc-1)",
                          color: "var(--sec-color)",
                          borderRadius: "6px",
                          fontSize: "14px",
                        }}
                      >
                        Add
                      </IconButton>
                    }
                  />
                ))
              ) : (
                <NoDataFound />
              )}
            </Stack>
          </Stack>
        </DialogContent>
      </LongDialogBox>
    </Stack>
  );
}
