import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import { useStore } from "../store/Store.tsx";

export default function SearchBar() {
  const updateFilterName = useStore((state) => state.updateFilterName);
  return (
    <>
      <div className="w-65 md:w-213">
        <div className="flex gap-1 items-center border border-[#e0e0e0] rounded-[10px] py-2 px-3">
          <SearchIcon sx={{ color: "grey" }} />
          <Input
            disableUnderline
            placeholder="Search by file name or type"
            type="text"
            id="input"
            onChange={(e) => updateFilterName(e.target.value)}
            sx={{
              width: [200, 300, 800],
            }}
          ></Input>
        </div>
      </div>
    </>
  );
}
