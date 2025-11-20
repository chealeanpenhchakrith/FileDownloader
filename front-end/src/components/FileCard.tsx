import axios from "axios";
import { useEffect, useState } from "react";

export default function FileCard() {
  const [list, setList] = useState<File[]>([]);

  interface File {
    name: string;
    size: string;
    last_modified: string;
  }

  async function fetchFiles() {
    try {
      await axios.get("http://127.0.0.1:5000/api/files").then((response) => {
        setList(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <ul className="list-disc list-inside">
        {list.map((file: File) => {
          return (
            <li key={file.name}>
              {file.name}, {file.size}, {file.last_modified}
            </li>
          );
        })}
      </ul>
    </>
  );
}
