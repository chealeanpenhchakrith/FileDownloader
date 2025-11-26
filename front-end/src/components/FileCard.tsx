import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Png from "../assets/icons/Png.png";
import Json from "../assets/icons/Json.png";
import Txt from "../assets/icons/Txt.png";
import Pdf from "../assets/icons/Pdf.png";
import Doc from "../assets/icons/Doc.png";
import Xsl from "../assets/icons/Xsl.png";
import Ppt from "../assets/icons/Ppt.png";
import Jpeg from "../assets/icons/Jpeg.png";
import Mp3 from "../assets/icons/Mp3.png";
import Mp4 from "../assets/icons/Mp4.png";
import Csv from "../assets/icons/Csv.png";
import { useStore } from "../Store.tsx";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";

export default function FileCard() {
  const [list, setList] = useState<File[]>([]);
  const filterName = useStore((state) => state.fileName);
  const filterType = useStore((state) => state.filterType);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState<File>();
  const [download, setDownload] = useState<File>();
  const [downloadList, setDownloadList] = useState<string[]>([]);

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
      setDownloadList((downloadList) => [...downloadList, fileName]);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err);
    }
  }

  async function fetchFiles() {
    try {
      await axios.get("http://127.0.0.1:5000/api/files").then((response) => {
        setTimeout(() => {
          setList(response.data);
          setLoading(false);
        }, 500);
      });
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error(err);
    }
  }

  function handleUdpate(file: File) {
    setUpdate(file);
  }

  function resetUpdate() {
    setUpdate(undefined);
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
      case "doc":
        return <img src={Doc} alt="doc" width={50} height={50} />;
      case "xsl":
        return <img src={Xsl} alt="xsl" width={50} height={50} />;
        break;
      case "ppt":
        return <img src={Ppt} alt="ppt" width={50} height={50} />;
        break;
      case "jpeg":
        return <img src={Jpeg} alt="jpeg" width={50} height={50} />;
        break;
      case "mp3":
        return <img src={Mp3} alt="jpeg" width={50} height={50} />;
        break;
      case "mp4":
        return <img src={Mp4} alt="mp4" width={50} height={50} />;
      case "csv":
        return <img src={Csv} alt="csv" width={50} height={50} />;
        break;
    }
  }

  function errorMessage() {
    return (
      <>
        <h1 className="font-bold">
          There has been an error in retrieving data
        </h1>
      </>
    );
  }

  function filterFile(fileType: string) {
    if (loading) {
      return (
        <>
          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:w-213">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={420}
              height={105}
              className="rounded-[10px]"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={420}
              height={105}
              className="rounded-[10px]"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={420}
              height={105}
              className="rounded-[10px]"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={420}
              height={105}
              className="rounded-[10px]"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={420}
              height={105}
              className="rounded-[10px]"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={420}
              height={105}
              className="rounded-[10px]"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={420}
              height={105}
              className="rounded-[10px]"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={420}
              height={105}
              className="rounded-[10px]"
            />
          </div>
        </>
      );
    } else {
      if (list.length === 0) {
        return (
          <>
            <div className="w-78 flex flex-col gap-3 md:flex-row md:flex-wrap md:w-213">
              <Alert severity="error" sx={{ borderRadius: "10px" }}>
                There are no files to display
              </Alert>
            </div>
          </>
        );
      }
    }
    if (fileType === "all") {
      return (
        <>
          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:w-213">
            {list
              .filter((file) => {
                return file.name
                  .toLowerCase()
                  .includes(filterName.toLowerCase());
              })
              .map((file: File) => {
                return (
                  <div
                    className="flex items-center border border-[#e0e0e0] w-105 rounded-[10px]"
                    key={file.id}
                  >
                    <Card
                      className="flex items-center w-105"
                      sx={{
                        bgcolor: "background.default",
                        boxShadow: "none",
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
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
                      <Button
                        loading={file === update ? true : false}
                        className="hover:cursor-pointer px-5 py-8.5 rounded-xl"
                        // sx={{
                        //   bgcolor: "background.default",
                        // }}
                        onClick={() => {
                          downloadFile(file.name);
                          handleUdpate(file);
                          setTimeout(() => {
                            resetUpdate();
                            setDownload(file);
                          }, 1000);
                        }}
                      >
                        {file === download ||
                        downloadList.includes(file.name) ? (
                          <DownloadDoneIcon fontSize="large" />
                        ) : (
                          <FileDownloadIcon fontSize="large" />
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:w-213">
            {list
              .filter((file) => file.type === fileType)
              .filter((file) => {
                return file.name
                  .toLowerCase()
                  .includes(filterName.toLowerCase());
              })
              .map((file: File) => {
                return (
                  <div
                    className="flex items-center border border-[#e0e0e0] w-105 rounded-[10px]"
                    key={file.id}
                  >
                    <Card
                      className="flex items-center w-105"
                      sx={{
                        bgcolor: "background.default",
                        boxShadow: "none",
                        // borderRadius: "10px",
                        borderColor: "#d2d9e0",
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
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
                      <Button
                        loading={file === update ? true : false}
                        className="hover:cursor-pointer px-5 py-8.5 rounded-xl"
                        sx={{
                          bgcolor: "background.default",
                        }}
                        onClick={() => {
                          downloadFile(file.name);
                          handleUdpate(file);
                          setTimeout(() => {
                            resetUpdate();
                            setDownload(file);
                          }, 1000);
                        }}
                      >
                        {file === download ||
                        downloadList.includes(file.name) ? (
                          <DownloadDoneIcon fontSize="large" />
                        ) : (
                          <FileDownloadIcon fontSize="large" />
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      );
    }
  }
  return <>{error ? errorMessage() : filterFile(filterType)}</>;
}
