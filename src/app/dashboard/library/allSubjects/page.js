"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import SecondaryCardSkeleton from "@/src/components/SecondaryCardSkeleton/SecondaryCardSkeleton";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { apiFetch } from "@/src/lib/apiFetch";
import {
  Add,
  Close,
  DeleteRounded,
  East,
  InsertDriveFile,
} from "@mui/icons-material";
import {
  Button,
  DialogContent,
  IconButton,
  MenuItem,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function AllSubjects() {
  const menuOptions = ["Remove"];
  const { showSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [isDialogOpen, setIsDialogOPen] = useState(false);

  function OnSubjectCreate() {
    if (!title) {
      showSnackbar("Fill all data", "error", "", "3000");
      return;
    }

    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subjects/create-subject`,
      {
        method: "POST",
        body: JSON.stringify({
          title,
        }),
      }
    ).then((data) => {
      if (data.success) {
        showSnackbar(data.message, "success", "", "3000");
        setTitle("");
        setIsDialogOPen(false);
        fetchSubject();
      } else {
        showSnackbar(data.message, "error", "", "3000");
      }
    });
  }

  const fetchSubject = () => {
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subjects/get-all-subjects`
    ).then((data) => {
      if (data.success) {
        setSubjectList(data.data.subjects);
      } else {
        setSubjectList([]);
      }
    });
  };

  useEffect(() => {
    fetchSubject();
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
        title="All Subjects"
        search
        button={[
          <Button
            key="Filter"
            variant="contained"
            startIcon={<Add />}
            onClick={dialogOpen}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            Subject
          </Button>,
        ]}
      />
      <DialogBox
        isOpen={isDialogOpen}
        title="Add Subject"
        icon={
          <IconButton
            onClick={dialogClose}
            sx={{ borderRadius: "10px", padding: "6px" }}
          >
            <Close sx={{ color: "var(--text2)" }} />
          </IconButton>
        }
        actionButton={
          <Button
            variant="text"
            endIcon={<East />}
            onClick={OnSubjectCreate}
            sx={{ textTransform: "none", color: "var(--primary-color)" }}
          >
            Create
          </Button>
        }
      >
        <DialogContent>
          <StyledTextField
            placeholder="Enter Subject"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </DialogContent>
      </DialogBox>
      <Stack flexDirection="row" columnGap="40px" rowGap="15px" flexWrap="wrap">
        {subjectList.length > 0
          ? subjectList.map((item, index) => (
              <SecondaryCard
                icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
                title={item.title}
                cardWidth="350px"
                key={index}
                options={[
                  <MenuItem
                    key="index"
                    sx={{ fontSize: "12px", color: "var(--delete-color)" ,gap:"2px"}}
                    disableRipple
                  >
                    <DeleteRounded sx={{fontSize:"16px"}} />
                    Delete
                  </MenuItem>,
                ]}
              />
            ))
          : [...Array(4)].map((_, index) => (
              <SecondaryCardSkeleton key={index} />
            ))}
      </Stack>
    </Stack>
  );
}
