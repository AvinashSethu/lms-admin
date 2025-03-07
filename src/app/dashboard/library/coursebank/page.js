"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import Header from "@/src/components/Header/Header";
import NoDataFound from "@/src/components/NoDataFound/NoDataFound";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import SecondaryCardSkeleton from "@/src/components/SecondaryCardSkeleton/SecondaryCardSkeleton";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { apiFetch } from "@/src/lib/apiFetch";
import {
  Add,
  Close,
  Delete,
  DeleteRounded,
  East,
  Folder,
} from "@mui/icons-material";
import {
  Button,
  DialogContent,
  IconButton,
  MenuItem,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Coursebank() {
  const router = useRouter();
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
        setIsDialogOPen(false);
        setTitle("");
        fetchCourse();
      } else {
        showSnackbar(data.message, "error", "", "3000");
      }
    });
  }

  const fetchCourse = () => {
    apiFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/get-all-bank`).then(
      (data) => {
        if (data.success) {
          setCourseList(data.data.banks);
        } else {
          setCourseList([]);
        }
      }
    );
  };
  useEffect(() => {
    fetchCourse();
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
        actionButton={
          <Button
            variant="text"
            onClick={OnCourseCreate}
            endIcon={<East />}
            sx={{ textTransform: "none", color: "var(--primary-color)" }}
          >
            Add Course bank
          </Button>
        }
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
        {courseList ? (courseList.length > 0
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
                options={[
                  <MenuItem
                    key="one"
                    sx={{
                      fontSize: "12px",
                      color: "var(--delete-color)",
                      gap: "2px",
                    }}
                    // onClick={dialogDelete}
                  >
                    <DeleteRounded sx={{ fontSize: "16px" }} />
                    Delete
                  </MenuItem>,
                ]}
                cardWidth="350px"
              />
            ))
          : [...Array(4)].map((_, index) => (
              <SecondaryCardSkeleton key={index} />
            ))) : <NoDataFound info="No Bank Created yet" />}
      </Stack>
    </Stack>
  );
}
