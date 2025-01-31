"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import Header from "@/src/components/Header/Header";
import NoDataFound from "@/src/components/NoDataFound/NoDataFound";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import SecondaryCardSkeleton from "@/src/components/SecondaryCardSkeleton/SecondaryCardSkeleton";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { apiFetch } from "@/src/lib/apiFetch";
import { Add, InsertDriveFile } from "@mui/icons-material";
import { DialogContent, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function AllSubjects() {
  const menuOptions = ["Remove"];
  const [title, setTitle] = useState("");
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  const { showSnackbar } = useSnackbar();

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
        console.log(data.message);
      } else {
        showSnackbar("subje", "error", "", "3000");
      }
    });
  }

  useEffect(() => {
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subjects/get-all-subjects`
    ).then((data) => {
      if (data.success) {
        setSubjectList(data.data.subjects);
      } else {
        setSubjectList([]);
      }
    });
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
        button="Subject"
        icon={<Add />}
        onClick={dialogOpen}
      />
      <DialogBox
        isOpen={isDialogOpen}
        onClose={dialogClose}
        title="Add Subject"
        actionText="Add Subject"
        onClick={OnSubjectCreate}
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
        {subjectList.length > 0 ? (
          subjectList.map((item, index) => (
            <SecondaryCard
              icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
              title={item.title}
              options={menuOptions}
              cardWidth="350px"
              key={index}
            />
          ))
        ) : [...Array(4)].map((_,index) => <SecondaryCardSkeleton key={index} />)
          
        }
      </Stack>
    </Stack>
  );
}
