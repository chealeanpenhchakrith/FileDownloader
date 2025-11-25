import SearchBar from "./components/SearchBar";
import FileCard from "./components/FileCard";
import CategoryCard from "./components/CategoryCard";

// export default function App() {
//   return (
//     <>
// <div className="flex flex-col ml-10 mt-10 gap-5">
//   <h1 className="font-bold text-4xl">All Files</h1>
//   <SearchBar />
//   <CategoryCard />
//   <FileCard />
// </div>
//     </>
//   );
// }

import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import {
  ThemeProvider,
  createTheme,
  useColorScheme,
} from "@mui/material/styles";
import { Height } from "@mui/icons-material";

function App() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex flex-col",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
          minHeight: "100vh",
          height: "auto",
        }}
      >
        <FormControl>
          <FormLabel id="demo-theme-toggle">Theme</FormLabel>
          <RadioGroup
            aria-labelledby="demo-theme-toggle"
            name="theme-toggle"
            row
            value={mode}
            onChange={(event) =>
              setMode(event.target.value as "system" | "light" | "dark")
            }
          >
            <FormControlLabel
              value="system"
              control={<Radio />}
              label="System"
            />
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </RadioGroup>
        </FormControl>
        <div className="flex flex-col ml-10 mt-10 gap-5">
          <h1 className="font-bold text-4xl">All Files</h1>
          <SearchBar />
          <CategoryCard />
          <FileCard />
        </div>
      </Box>
    </>
  );
}

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function ToggleColorMode() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
