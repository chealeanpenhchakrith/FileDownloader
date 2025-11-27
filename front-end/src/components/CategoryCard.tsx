import { useEffect, useState } from "react";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios";
import Stack from "@mui/material/Stack";
import { useStore } from "../store/Store.tsx";
import { type File } from "../interfaces/interface.ts";

export default function CategoryCard() {
  const [alignment, setAlignment] = React.useState<string | null>("all");
  const updateFilterName = useStore((state) => state.updateFilterType);
  const [set, setSet] = useState<string[]>([]);

  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      updateFilterName(newAlignment);
    }
  };

  async function fetchFiles() {
    try {
      await axios.get("http://127.0.0.1:5000/api/files").then((response) => {
        extractFilesType(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  }

  function extractFilesType(list: File[]) {
    const temporaryList: string[] = [];
    list.map((file: File) => {
      temporaryList.push(file.type);
    });
    const uniqueList = [...new Set<string>(temporaryList)];
    setSet(uniqueList);
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        color="primary"
      >
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          <ToggleButton value="all" sx={{ borderRadius: "10px" }}>
            All
          </ToggleButton>
          {set.map((type) => {
            return (
              <ToggleButton
                key={type}
                value={type}
                sx={{ borderRadius: "10px" }}
              >
                {type}
              </ToggleButton>
            );
          })}
        </Stack>
      </ToggleButtonGroup>
    </>
  );
}
