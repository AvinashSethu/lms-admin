"use client";
import { ExpandMore } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import Library from "./Library/Library";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkComp({ isOpen }) {
  return (
    <Stack
      sx={{
        gap: "15px",
        maxHeight: "350px",
        overflowY: "auto",
        scrollbarWidth: "thin",
      }}
    >
      <NavComp
        icon="/Icons/Goals.svg"
        title="Goals"
        href="/Goals"
        isOpen={isOpen}
      />
      <NavComp icon="/Icons/Library.svg" title="Library" list isOpen={isOpen} />
      <NavComp
        icon="/Icons/Institute.svg"
        title="Institute"
        href="/Institute"
        isOpen={isOpen}
      />
      <NavComp
        icon="/Icons/Students.svg"
        title="Students"
        href="/Students"
        isOpen={isOpen}
      />
      <NavComp
        icon="/Icons/Settings.svg"
        title="Settings"
        href="/Settings"
        isOpen={isOpen}
      />
    </Stack>
  );
}

const NavComp = ({ icon, title, list, href,isOpen }) => {
  const [List, setList] = useState(false);

  const toggleLibrary = () => {
    setList(!List);
  };
  const pathname = usePathname();

  return (
    <>
      <Stack>
        <Link href={href || "#"} passHref>
          {" "}
          <Stack
            onClick={toggleLibrary}
            sx={{
              minHeight: "40px",
              overflowY: list && List ? "none" : "none",
              padding: "10px 20px 10px 20px",
              cursor: "pointer",
              backgroundColor:
                pathname === href
                  ? "var(--primary-color-text3)"
                  : "transparent",
              borderRadius: "30px",
              "&:hover": {
                backgroundColor: "var(--primary-color-text3)",
                borderRadius: "30px",
              },
              // backgroundColor: list && List ? "var(--primary-color-text3)" : "transparent",
            }}
          >
            <Stack flexDirection="row">
              <Stack
                sx={{ flexDirection: "row", alignItems: "center", gap: "10px" }}
              >
                <Stack height={16} width={16}>                <Image src={icon} alt={title} width={16} height={16} /></Stack>
                {!isOpen && (
                  <Typography
                    sx={{
                      fontFamily: "Lato",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "var(--primary-color-text1)",
                    }}
                  >
                    {title}
                  </Typography>
                )}
              </Stack>
              {list && !isOpen && (
                <ExpandMore
                  sx={{
                    color: "var(--primary-color-text1)",
                    marginLeft: "auto",
                    transition: "all .5s ease",
                    transform: List ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              )}
            </Stack>
            <Stack>
              {List && list && (
                <Stack
                  sx={{
                    height: "100px",
                    width: "100px",
                    padding: "0px 15px 0px 15px",
                    justifyContent: "center",
                  }}
                >
                  <Library />
                </Stack>
              )}
            </Stack>
          </Stack>
        </Link>
      </Stack>
    </>
  );
};
