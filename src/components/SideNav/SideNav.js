"use client";
import { Stack } from "@mui/material";
import Account from "./Account";
import LinkComp from "./LinkComp";
import MasterLogo from "./MasterLogo";
import Image from "next/image";
import { useState } from "react";
import drawer_img from "@/public/Icons/Drawer.svg";

export default function SideNav() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const drawer = () => {
    setIsSideNavOpen((prev) => !prev);
  };
  const sideNavOpen = () => {
    setIsSideNavOpen(false);
  };

  return (
    <Stack bgcolor="var(--white)">
      <Stack position="fixed"
        sx={{
          padding: "40px 10px 40px 30px",
          gap: "50px",
          width: isSideNavOpen ? "100px" : "300px",
          height: "100vh",
          borderRight: "1px solid var(--border-color)",
          transition: "width .5s ease",
          position: "relative",
        }}
      >
        <MasterLogo isSideNavOpen={isSideNavOpen} />
        <LinkComp isSideNavOpen={isSideNavOpen} sideNavOpen={sideNavOpen} />
        <Account isSideNavOpen={isSideNavOpen} />
        <Image
          src={drawer_img.src}
          alt="openclose"
          width={24}
          height={24}
          onClick={drawer}
          style={{
            position: "absolute",
            top: "70px",
            right: "-12px",
            cursor: "pointer",
            transform: isSideNavOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all .4s ease",
          }}
        />
      </Stack>
    </Stack>
  );
}
