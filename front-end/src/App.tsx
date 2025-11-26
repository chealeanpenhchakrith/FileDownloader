import SearchBar from "./components/SearchBar";
import FileCard from "./components/FileCard";
import CategoryCard from "./components/CategoryCard";
import Box from "@mui/material/Box";
import {
  ThemeProvider,
  createTheme,
  useColorScheme,
} from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function App() {
  const { mode, setMode } = useColorScheme();

  function toggleMode() {
    if (mode === "light") {
      return (
        <>
          <button
            onClick={() => {
              setMode("dark");
            }}
          >
            <LightModeIcon />
          </button>
        </>
      );
    } else {
      return (
        <button
          onClick={() => {
            setMode("light");
          }}
        >
          <DarkModeIcon />
        </button>
      );
    }
  }

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
          p: 2,
          minHeight: "100vh",
          height: "auto",
        }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            {toggleMode()}
            <h1 className="font-bold text-4xl">All Files</h1>
          </div>
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
