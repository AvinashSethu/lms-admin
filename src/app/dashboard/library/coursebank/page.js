"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import SecondaryCardSkeleton from "@/src/components/SecondaryCardSkeleton/SecondaryCardSkeleton";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { apiFetch } from "@/src/lib/apiFetch";
import { Add, Close, Folder } from "@mui/icons-material";
import { Button, DialogContent, IconButton, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Coursebank() {
  const router = useRouter();
  const menuOptions = ["delete"];
  const { showSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [isDialogOpen, setIsDialogOPen] = useState(false);

  function OnCourseCreate() {
    if (!title) {
      showSnackbar("Fill all data", "error", "", "3000");
      return;
    }
    apiFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/create-bank`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }).then((data) => {
      if (data.success) {
        showSnackbar(data.message, "success", "", "3000");
      } else {
        showSnackbar(data.message, "error", "", "3000");
      }
    });
  }

  useEffect(() => {
    apiFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/get-all-bank`).then(
      (data) => {
        if (data.success) {
          setCourseList(data.data.banks);
        } else {
          setCourseList([]);
        }
      }
    );
  }, []);

  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };

  return (
    <Stack padding="20px" gap="20px">
      <Header
        title="Course bank"
        search
        button={[
          <Button
            key="Add"
            variant="contained"
            startIcon={<Add />}
            onClick={dialogOpen}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            Add
          </Button>,
        ]}
      />
      <DialogBox
        isOpen={isDialogOpen}
        onClose={dialogClose}
        title="Add Course bank"
        actionText="Add Course bank"
        onClick={OnCourseCreate}
        icon={
          <IconButton
            onClick={dialogClose}
            sx={{ borderRadius: "10px", padding: "6px" }}
          >
            <Close sx={{ color: "var(--text2)" }} />
          </IconButton>
        }
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
              />
            ))
          : [...Array(4)].map((_, index) => (
              <SecondaryCardSkeleton key={index} />
            ))}
      </Stack>
    </Stack>
  );
}
