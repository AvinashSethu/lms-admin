"use client";
import { ExpandMore } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkComp({ isOpen }) {
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
        href="/goals"
        isOpen={isOpen}
      />
      <NavComp
        icon="/Icons/Library.svg"
        title="Library"
        list={[
          { title: "Course Bank", href: "/library/courseBank" },
          { title: "All Questions", href: "/library/allQuestions" },
          { title: "All Subjects", href: "/library/allSubjects" },
        ]}
        isOpen={isOpen}
      />
      <NavComp
        icon="/Icons/Institute.svg"
        title="Institute"
        href="/institute"
        isOpen={isOpen}
      />
      <NavComp
        icon="/Icons/Students.svg"
        title="Students"
        href="/students"
        isOpen={isOpen}
      />
      <NavComp
        icon="/Icons/Settings.svg"
        title="Settings"
        href="/settings"
        isOpen={isOpen}
      />
    </Stack>
  );
}

const NavComp = ({ icon, title, list, href, isOpen }) => {
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
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor:
                pathname === href
                  ? "var(--primary-color-text3)"
                  : "transparent",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "var(--primary-color-text3)",
                borderRadius: "30px",
              },
            }}
          >
            <Stack flexDirection="row">
              <Stack
                sx={{ flexDirection: "row", alignItems: "center", gap: "10px" }}
              >
                <Stack height={16} width={16}>
                  <Image src={icon} alt={title} width={16} height={16} />
                </Stack>
                {!isOpen && (
                  <Typography
                    sx={{
                      fontFamily: "Lato",
                      fontSize: "14px",
                      fontWeight: "600",
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
                    pl: "14px",
                    mt: "10px",
                    justifyContent: "center",
                  }}
                >
                  {list.map((item, index) => (
                    <Link href={item.href} key={index} passHref>
                      <Stack
                        sx={{
                          width: "180px",
                          borderRadius: "6px",
                          padding: "12px",
                          gap: "8px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Lato",
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "var(--text3)",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Stack>
                    </Link>
                  ))}
                </Stack>
              )}
            </Stack>
          </Stack>
        </Link>
      </Stack>
    </>
  );
};
