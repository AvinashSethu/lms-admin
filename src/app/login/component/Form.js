"use client";
import { useState } from "react";
import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.ok) {
        router.push("/dashboard");
        setIsLoading(false);
      } else {
        alert("Invalid email or password");
      }
    });
  };


  return (
    <>
      <Stack
        sx={{
          width: "350px",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack gap={1}>
          <Typography
            sx={{ fontSize: "Lato", fontSize: "16px", fontWeight: "500" }}
          >
            Email
          </Typography>
          <TextField
            variant="outlined"
            label=""
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                "&::placeholder": {
                  fontFamily: "Lato",
                  fontSize: "16px",
                  fontWeight: "500",
                },
              },
              "& .MuiOutlinedInput-root": {
                width: "350px",
                height: "40px",
                "&.Mui-focused fieldset": {
                  borderColor: "var(--sec-color)",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "var(--sec-color)",
                },
              },
            }}
          />
        </Stack>
        <Stack gap={1}>
          <Typography
            sx={{ fontSize: "Lato", fontSize: "16px", fontWeight: "500" }}
          >
            Password
          </Typography>
          <TextField
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            label=""
            placeholder="Enter your password"
            type="password"
            sx={{
              "& .MuiInputBase-input": {
                "&::placeholder": {
                  fontFamily: "Lato",
                  fontSize: "16px",
                  fontWeight: "500",
                },
              },
              "& .MuiOutlinedInput-root": {
                width: "350px",
                height: "40px",
                "&.Mui-focused fieldset": {
                  borderColor: "var(--sec-color)",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "var(--sec-color)",
                },
              },
            }}
          />
        </Stack>
        <Stack>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "var(--primary-color)",
              borderRadius: "4px",
              fontFamily: "Lato",
              fontSize: "18px",
              height: "40px",
              width: "350px",
            }}
            disableElevation
            onClick={onSubmit}
          >
            {isLoading ? (<CircularProgress size={24} sx={{color:"var(--sec-color)"}}/>) : "Sign In"}
            
          </Button>
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "14px",
              paddingTop: "5px",
              textAlign: "center",
              color: "var(--text4)",
            }}
          >
            Please note: This is the company login page.
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
