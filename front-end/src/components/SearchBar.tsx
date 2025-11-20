import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <>
      <h1 className="text-2xl text-center">Files</h1>
      <div className="flex justify-center">
        <div className="border-2 black rounded-2xl w-111 mt-5">
          <SearchIcon />
          <Input
            disableUnderline={true}
            placeholder="Search"
            type="text"
            fullWidth={false}
          ></Input>
        </div>
      </div>
    </>
  );
}
