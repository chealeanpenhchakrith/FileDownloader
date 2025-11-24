import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import { useStore } from "../Store.tsx";

export default function SearchBar() {
  const updateFilterName = useStore((state) => state.updateFilterName);
  return (
    <>
      <h1 className="text-4xl font-bold ml-5 mt-5">All Files</h1>
      <div>
        <div className="border-2 black rounded-2xl w-70 mt-5 ml-5">
          <div className="ml-1 flex gap-1 items-center">
            <SearchIcon />
            <Input
              className="w-100"
              disableUnderline={true}
              placeholder="Search by file name or type..."
              type="text"
              id="input"
              onChange={(e) => updateFilterName(e.target.value)}
            ></Input>
          </div>
        </div>
      </div>
    </>
  );
}
