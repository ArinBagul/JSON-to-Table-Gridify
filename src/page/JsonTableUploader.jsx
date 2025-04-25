import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Alert,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import demoData from "../test/demo.json"; // Adjust the path if needed
import UploadFileIcon from "@mui/icons-material/UploadFile";

const JsonTableUploader = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fileName, setFileName] = useState("Loaded from demo.json");
  const [error, setError] = useState("");

  const loadJsonToTable = (json, sourceName = "Loaded JSON") => {
    try {
      if (!Array.isArray(json) || json.length === 0) {
        throw new Error("JSON must be a non-empty array of objects");
      }

      const firstRow = json[0];
      if (typeof firstRow !== "object" || Array.isArray(firstRow)) {
        throw new Error("Each item in the array should be an object");
      }

      const cols = Object.keys(firstRow).map((key) => ({
        field: key,
        headerName: key,
        flex: 1,
      }));

      const rowsWithIds = json.map((row, index) => ({
        id: row.id || index,
        ...row,
      }));

      setColumns(cols);
      setRows(rowsWithIds);
      setFileName(sourceName);
      setError("");
    } catch (err) {
      setError(`Error processing JSON: ${err.message}`);
      setColumns([]);
      setRows([]);
      setFileName("");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        loadJsonToTable(json, file.name);
      } catch (err) {
        setError(`Invalid JSON: ${err.message}`);
        setColumns([]);
        setRows([]);
        setFileName("");
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    // Load demo data on mount
    loadJsonToTable(demoData, "demo.json");
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", mx: "auto" }}>
      <Card elevation={3}>
        <CardContent>
          <Stack spacing={3}>
            {/* <Typography variant="h5" fontWeight={600}>
              JSON to Table Converter
            </Typography> */}

            <Stack direction="row" alignItems="center" spacing={2}>
              {/* <Button
                component="label"
                variant="contained"
                startIcon={<UploadFileIcon />}
              >
                Upload JSON File
                <input
                  type="file"
                  accept=".json"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button> */}
              {fileName && (
                <Typography variant="body1" color="text.secondary">
                  {fileName}
                </Typography>
              )}
            </Stack>

            {error && <Alert severity="error">{error}</Alert>}

            <Divider />

            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                showToolbar
                disableRowSelectionOnClick
                sx={{
                  "& .MuiDataGrid-toolbarContainer": {
                    justifyContent: "flex-end",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f5f5f5",
                    fontWeight: "bold",
                  },
                  borderRadius: 1,
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JsonTableUploader;
