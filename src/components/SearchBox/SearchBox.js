import { Search } from "@mui/icons-material";
import {  IconButton, InputAdornment, TextField } from "@mui/material";

export default function SearchBox() {
  return (
      <TextField
      
        sx={{
          width:"100%",
          "& .MuiOutlinedInput-root": {
            height: "35px",
            borderRadius: "5px",
            fontFamily: "Lato",
            fontWeight: "400",
            fontSize: "16px",
            "&.Mui-focused fieldset": {
              borderColor: "var(--sec-color)",
              borderWidth: "1px",
            },
            "&:hover fieldset": {
              borderColor: "var(--sec-color)",
            },
          },
        }}
        placeholder="Search"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Search fontSize="small"/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      >
      </TextField>
  );
}
