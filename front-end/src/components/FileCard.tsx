import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Png from "../assets/icons/Png.png";
import Json from "../assets/icons/Json.png";
import Txt from "../assets/icons/Txt.png";
import Pdf from "../assets/icons/Pdf.png";
import { useStore } from "../Store.tsx";
import Skeleton from "@mui/material/Skeleton";

export default function FileCard() {
  const [list, setList] = useState<File[]>([]);
  const filterName = useStore((state) => state.fileName);
  const filterType = useStore((state) => state.filterType);

  interface File {
    id: number;
    name: string;
    size: string;
    last_modified: string;
    type: string;
  }

  async function downloadFile(fileName: string) {
    try {
      await axios.get(`http://127.0.0.1:5000/download/${fileName}`);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchFiles() {
    try {
      await axios.get("http://127.0.0.1:5000/api/files").then((response) => {
        setTimeout(() => {
          setList(response.data);
        }, 500);
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  function matchFormat(fileName: string) {
    const separatedList: string = fileName.split(".")[1];
    switch (separatedList) {
      case "txt":
        return <img src={Txt} alt="txt" width={50} height={50} />;
        break;
      case "pdf":
        return <img src={Pdf} alt="pdf" width={50} height={50} />;
        break;
      case "png":
        return <img src={Png} alt="png" width={50} height={50} />;
        break;
      case "json":
        return <img src={Json} alt="json" width={50} height={50} />;
        break;
    }
  }

  function filterFile(fileType: string) {
    if (list.length === 0) {
      return (
        <>
          <div className="ml-5 mt-5 flex flex-col gap-3">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={500}
              height={100}
              className="rounded-2xl"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={500}
              height={100}
              className="rounded-2xl"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={500}
              height={100}
              className="rounded-2xl"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={500}
              height={100}
              className="rounded-2xl"
            />
          </div>
        </>
      );
    }
    if (fileType === "all") {
      return (
        <>
          <ul>
            {list
              .filter((file) => {
                return file.name
                  .toLowerCase()
                  .includes(filterName.toLowerCase());
              })
              .map((file: File) => {
                return (
                  <div className="flex items-center" key={file.id}>
                    <Card
                      className="flex mt-5 items-center ml-5 w-105"
                      sx={{
                        bgcolor: "white",
                        boxShadow: "none",
                        border: "black",
                      }}
                    >
                      <div className="pt-5 pl-5 pb-5">
                        {matchFormat(file.name)}
                      </div>
                      <CardContent className="flex flex-col">
                        <h1 className="text-2xl font-bold">{file.name}</h1>
                        <h2 className="text-gray-400 font-light">
                          {file.last_modified} | {file.size}
                        </h2>
                      </CardContent>
                    </Card>
                    <div className="flex flex-col justify-center items-center">
                      <button
                        className="hover:cursor-pointer mt-4 px-5 py-8.5 rounded-xl ml-2"
                        onClick={() => {
                          downloadFile(file.name);
                        }}
                      >
                        <FileDownloadIcon fontSize="large" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </ul>
        </>
      );
    } else {
      return (
        <>
          <ul>
            {list
              .filter((file) => file.type === fileType)
              .filter((file) => {
                return file.name
                  .toLowerCase()
                  .includes(filterName.toLowerCase());
              })
              .map((file: File) => {
                return (
                  <div className="flex items-center" key={file.id}>
                    <Card
                      className="flex mt-5 items-center ml-5 w-105"
                      sx={{
                        bgcolor: "white",
                        boxShadow: "none",
                        border: "black",
                      }}
                    >
                      <div className="pt-5 pl-5 pb-5">
                        {matchFormat(file.name)}
                      </div>
                      <CardContent className="flex flex-col">
                        <h1 className="text-2xl font-bold">{file.name}</h1>
                        <h2 className="text-gray-400 font-light">
                          {file.last_modified} | {file.size}
                        </h2>
                      </CardContent>
                    </Card>
                    <div className="flex flex-col justify-center items-center">
                      <button
                        className="hover:cursor-pointer mt-4 px-5 py-8.5 rounded-xl ml-2"
                        onClick={() => {
                          downloadFile(file.name);
                        }}
                      >
                        <FileDownloadIcon fontSize="large" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </ul>
        </>
      );
    }
  }
  return <>{filterFile(filterType)}</>;
}
