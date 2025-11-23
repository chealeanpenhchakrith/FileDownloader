import SearchBar from "./components/SearchBar";
import FileCard from "./components/FileCard";
import CategoryCard from "./components/CategoryCard";

export default function App() {
  return (
    <>
      <SearchBar />
      <div className="mt-5 ml-5">
        <CategoryCard />
      </div>
      <FileCard />
    </>
  );
}
