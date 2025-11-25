import SearchBar from "./components/SearchBar";
import FileCard from "./components/FileCard";
import CategoryCard from "./components/CategoryCard";

export default function App() {
  return (
    <>
      <div className="flex flex-col ml-10 mt-10 gap-5">
        <h1 className="font-bold text-4xl">All Files</h1>
        <SearchBar />
        <CategoryCard />
        <FileCard />
      </div>
    </>
  );
}
