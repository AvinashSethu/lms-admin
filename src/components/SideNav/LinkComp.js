"use client";
import { ExpandMore } from "@mui/icons-material";
import { Stack, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
        isRoot={true}
      />
      <NavComp
        icon="/Icons/Library.svg"
        title="Library"
        href="#"
        list={[
          { title: "Course Bank", href: "/dashboard/library/coursebank" },
          { title: "All Questions", href: "/dashboard/library/allQuestions" },
          { title: "All Subjects", href: "/dashboard/library/allSubjects" },
          { title: "All Exams", href: "/dashboard/library/allExams" },
        ]}
        isSideNavOpen={isSideNavOpen}
        sideNavOpen={sideNavOpen}
      />
      <NavComp
        icon="/Icons/Institute.svg"
        title="Institute"
        href="/dashboard/institute"
        isSideNavOpen={isSideNavOpen}
      />
      <NavComp
        icon="/Icons/Students.svg"
        title="Students"
        href="/dashboard/students"
        isSideNavOpen={isSideNavOpen}
      />
      <NavComp
        icon="/Icons/rupee.svg"
        title="Payments & Coupons"
        href="/dashboard/payments"
        isSideNavOpen={isSideNavOpen}
      />
    </Stack>
  );
}

const NavComp = ({
  icon,
  title,
  list,
  href,
  isSideNavOpen,
  sideNavOpen,
  isRoot,
}) => {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const isParentActive = isRoot
    ? pathname === "/dashboard" || pathname.startsWith("/dashboard/goals")
    : pathname === href || pathname.startsWith(href + "/");
  // const isChildActive = list?.some((item) => pathname === item.href);
  const isChildActive = list?.some((item) => pathname.startsWith(item.href));

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

  return (
    <Stack>
      <Tooltip title={title} disableHoverListener={!isSideNavOpen}>
        <Stack
          sx={{
            minHeight: "40px",
            padding: "10px 20px",
            cursor: "pointer",
            alignItems: !isSideNavOpen ? "" : "center",
            backgroundColor: isParentActive
              ? "var(--primary-color-acc-2)"
              : "transparent",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor:
                list && isNavOpen
                  ? "transparent"
                  : "var(--primary-color-acc-2)",
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
                  pl: "15px",
                  mt: "10px",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                {list.map((item, index) => (
                  <Link href={item.href} key={index} passHref>
                    <Typography
                      sx={{
                        fontFamily: "Lato",
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "var(--text4)",
                        whiteSpace: "nowrap",
                        borderRadius: "20px",
                        height: "28px",
                        paddingTop: "4px",
                        paddingLeft: "15px",
                        backgroundColor: pathname.startsWith(item.href)
                          ? "var(--primary-color-acc-2)"
                          : "transparent",
                        "&:hover": {
                          backgroundColor: "var(--primary-color-acc-2)",
                        },
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
