"use client";
import { ExpandMore } from "@mui/icons-material";
import { Stack, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkComp({ isSideNavOpen, sideNavOpen }) {
  return (
    <Stack
      sx={{
        gap: "10px",
        maxHeight: "100%",
        overflowY: "auto",
        scrollbarWidth: "thin",
      }}
    >
      <NavComp
        icon="/Icons/Goals.svg"
        title="Goals"
        href="/"
        isSideNavOpen={isSideNavOpen}
      />
      <NavComp
        icon="/Icons/Library.svg"
        title="Library"
        href="#"
        list={[
          { title: "Course Bank", href: "/library/courseBank" },
          { title: "All Questions", href: "/library/allQuestions" },
          { title: "All Subjects", href: "/library/allSubjects" },
        ]}
        isSideNavOpen={isSideNavOpen}
        sideNavOpen={sideNavOpen}
      />
      <NavComp
        icon="/Icons/Institute.svg"
        title="Institute"
        href="/institute"
        isSideNavOpen={isSideNavOpen}
      />
      <NavComp
        icon="/Icons/Students.svg"
        title="Students"
        href="/students"
        isSideNavOpen={isSideNavOpen}
      />
      <NavComp
        icon="/Icons/Settings.svg"
        title="Settings"
        href="/settings"
        isSideNavOpen={isSideNavOpen}
      />
    </Stack>
  );
}

const NavComp = ({ icon, title, list, href, isSideNavOpen, sideNavOpen }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleLibrary = () => {
    setIsNavOpen((prev) => {
      !prev && sideNavOpen && sideNavOpen();
      return !prev;
    });
  };
  useEffect(() => {
    isSideNavOpen && setIsNavOpen(false);
    !isSideNavOpen && setIsNavOpen(true);
  }, [isSideNavOpen]);

  const pathname = usePathname();

  return (
    <Stack>
      <Tooltip title={title} disableHoverListener={!isSideNavOpen}>
        <Stack
          sx={{
            minHeight: "40px",
            padding: "10px 20px",
            cursor: "pointer",
            alignItems: !isSideNavOpen ? "" : "center",
            backgroundColor:
              pathname === href ? "var(--primary-color-acc-2)" : "transparent",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "var(--primary-color-acc-2)",
            },
          }}
        >
          <Link href={href || ""} passHref>
            <Stack
              flexDirection="row"
              alignItems="center"
              onClick={toggleLibrary}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={"10px"}
                height={"20px"}
              >
                <Image src={icon} alt={title} width={16} height={16} />
                {!isSideNavOpen && (
                  <Typography
                    sx={{
                      fontFamily: "Lato",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "var(--primary-color)",
                    }}
                  >
                    {title}
                  </Typography>
                )}
              </Stack>
              {list && !isSideNavOpen && (
                <ExpandMore
                  sx={{
                    color: "var(--primary-color)",
                    marginLeft: "auto",
                    transition: "all .3s ease",
                    transform: isNavOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              )}
            </Stack>
          </Link>
          <Stack>
            {isNavOpen && list && (
              <Stack
                sx={{
                  pl: "14px",
                  mt: "10px",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {list.map((item, index) => (
                  <Link href={item.href} key={index} passHref>
                    <Typography
                      sx={{
                        fontFamily: "Lato",
                        fontSize: "14px",
                        pl: "14px",
                        fontWeight: "700",
                        color: "var(--text4)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Tooltip>
    </Stack>
  );
};
