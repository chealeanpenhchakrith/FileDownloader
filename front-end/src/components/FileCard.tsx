import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Png from "../assets/icons/Png.png";
import Json from "../assets/icons/Json.png";
import Txt from "../assets/icons/Txt.png";
import Pdf from "../assets/icons/Pdf.png";

export default function FileCard() {
  const [list, setList] = useState<File[]>([]);

  interface File {
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
    matchFormat("notes.txt");
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
            <Card key={file.name} className="flex mt-10 items-cente">
              {matchFormat(file.name)}
              <CardContent>
                {file.name}, {file.size}, {file.last_modified}
              </CardContent>
              <CardActions>
                <button
                  className="hover:cursor-grab bg-amber-200"
                  onClick={() => {
                    downloadFile(file.name);
                  }}
                >
                  <FileDownloadIcon />
                </button>
              </CardActions>
            </Card>
          );
        })}
      </ul>
    </>
  );
}
