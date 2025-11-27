import Alert from "@mui/material/Alert";

export default function errorMessage() {
  return (
    <>
      <div className="w-78 flex flex-col gap-3 md:flex-row md:flex-wrap md:w-213">
        <Alert severity="error" sx={{ borderRadius: "10px" }}>
          There has been an error in retrieving data
        </Alert>
      </div>
    </>
  );
}
