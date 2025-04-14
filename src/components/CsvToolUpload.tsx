
import React, { useState } from "react";
import { toast } from "sonner";
import { Tool, saveTools } from "../data/toolsData";
import { v4 as uuidv4 } from "uuid";
import { Upload, FileText, Check, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CsvToolUploadProps {
  onUploadTools: (tools: Tool[]) => void;
  existingTools: Tool[];
}

interface CsvRow {
  name: string;
  description: string;
  categories: string;
  url: string;
  free: string;
  isValid: boolean;
  errors?: string[];
}

export function CsvToolUpload({
  onUploadTools,
  existingTools,
}: CsvToolUploadProps) {
  const [open, setOpen] = useState(false);
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      parseCsvData(text);
    };
    reader.readAsText(file);
  };

  const parseCsvData = (csvText: string) => {
    const lines = csvText.split("\n");
    const parsedData: CsvRow[] = [];
    
    // Skip header row if it exists
    const startIndex = lines[0].toLowerCase().includes("tool name") ? 1 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const columns = line.split(",").map(col => col.trim());
      
      if (columns.length < 5) continue;
      
      const name = columns[0];
      const description = columns[1];
      const categories = columns[2];
      const url = columns[3];
      const free = columns[4].toLowerCase();
      
      // Validate data
      const errors: string[] = [];
      
      if (!name) errors.push("Tool name is required");
      if (!description) errors.push("Description is required");
      if (!categories) errors.push("At least one category is required");
      if (!url) errors.push("URL is required");
      if (!url.startsWith("http")) errors.push("URL must start with http:// or https://");
      if (free !== "yes" && free !== "no") errors.push("Free must be 'yes' or 'no'");
      
      // Check if tool name already exists
      if (existingTools.some(tool => tool.name === name)) {
        errors.push("Tool with this name already exists");
      }
      
      parsedData.push({
        name,
        description,
        categories,
        url,
        free,
        isValid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined,
      });
    }
    
    setCsvData(parsedData);
    setIsUploaded(true);
  };

  const handleCreateTools = () => {
    // Filter only valid tools
    const validTools = csvData.filter(row => row.isValid);
    
    if (validTools.length === 0) {
      toast.error("No valid tools to create");
      return;
    }
    
    // Convert CSV rows to Tool objects
    const newTools: Tool[] = validTools.map(row => ({
      id: uuidv4(),
      name: row.name,
      description: row.description,
      category: row.categories.split(';').map(cat => cat.trim()),
      url: row.url,
      free: row.free.toLowerCase() === "yes",
    }));
    
    // Add tools
    onUploadTools(newTools);
    
    // Show success message
    toast.success(`Successfully added ${newTools.length} tools`);
    
    // Reset state and close dialog
    setCsvData([]);
    setIsUploaded(false);
    setFileName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Upload size={16} /> Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Import Tools from CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file with tool details to add multiple tools at once.
            <br />
            CSV format: Tool Name, Description, Categories (semicolon separated), Website URL, Free (yes/no)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!isUploaded ? (
            <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-muted-foreground/20 rounded-md">
              <FileText className="mb-2 h-10 w-10 text-muted-foreground" />
              <p className="mb-4 text-sm text-muted-foreground">
                Upload your CSV file here
              </p>
              <label htmlFor="csv-upload">
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                  <span>Select CSV File</span>
                </Button>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{fileName}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setIsUploaded(false);
                    setCsvData([]);
                    setFileName("");
                  }}
                  className="ml-auto"
                >
                  Change File
                </Button>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30px]">Status</TableHead>
                      <TableHead>Tool Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Free</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {csvData.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          {row.isValid ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="tooltip" title={row.errors?.join(", ")}>
                              <X className="h-4 w-4 text-red-500" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{row.description}</TableCell>
                        <TableCell>{row.categories}</TableCell>
                        <TableCell className="max-w-[120px] truncate">{row.url}</TableCell>
                        <TableCell>{row.free}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="bg-muted p-2 rounded">
                  <span className="font-medium">Total: {csvData.length}</span>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                  <span className="font-medium text-green-700 dark:text-green-400">
                    Valid: {csvData.filter(row => row.isValid).length}
                  </span>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded">
                  <span className="font-medium text-red-700 dark:text-red-400">
                    Invalid: {csvData.filter(row => !row.isValid).length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            onClick={handleCreateTools}
            disabled={!isUploaded || csvData.filter(row => row.isValid).length === 0}
            className="w-full sm:w-auto"
          >
            Create Tools
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
