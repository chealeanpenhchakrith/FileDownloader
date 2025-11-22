import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
// import CardActions from "@mui/material/CardActions";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Png from "../assets/icons/Png.png";
import Json from "../assets/icons/Json.png";
import Txt from "../assets/icons/Txt.png";
import Pdf from "../assets/icons/Pdf.png";

export default function FileCard() {
  const [list, setList] = useState<File[]>([]);

  interface File {
    id: number;
    name: string;
    size: string;
    last_modified: string;
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
        setList(response.data);
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
  return (
    <>
      <ul>
        {list.map((file: File) => {
          return (
            <div className="flex items-center" key={file.id}>
              <Card
                className="flex mt-5 items-center ml-5 w-105"
                sx={{ bgcolor: "white", boxShadow: "none", border: "black" }}
              >
                <div className="pt-5 pl-5 pb-5">{matchFormat(file.name)}</div>
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
