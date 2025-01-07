import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Account({isOpen}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack
        onClick={handleClick}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          borderRadius: "41px",
          cursor: "pointer",
          padding: "3px 14px 3px 5px",
          backgroundColor: open ? "var(--primary-color-text3)" : "transparent",
          "&:hover": { backgroundColor: "var(--primary-color-text3)" },
        }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "12px" }}>
          <Image src="/Images/avatar.svg" alt="avatar" width={45} height={45} />
          {!isOpen && (<Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "700",
              color: "var(--primary-color-text1)",
            }}
          >
            Abishek
          </Typography>)}
        </Stack>
        {!isOpen && (<Image
          src="/Icons/More.svg"
          alt="more"
          width={18}
          height={18}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "all .5s ease",
          }}
        />)}
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            width: "240px",
            marginTop: "-90px",
            backgroundColor: "var(--library-expand)",
            borderRadius: "6px",
            color: "var(--text3)",
          },
        }}
        elevation={0}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            gap: "15px",
            fontFamily: "Lato",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          <Image
            src="/Icons/Students.svg"
            alt="profile"
            width={16}
            height={16}
          />
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            gap: "15px",
            fontFamily: "Lato",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          <Image src="/Icons/Logout.svg" alt="profile" width={16} height={16} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
