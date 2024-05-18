import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileData } from "./publicaccesstable";
import { AlertCircleIcon } from "lucide-react";

interface TableProps {
  files: FileData[];
}
function HighRiskTable({ files }: TableProps) {
  return (
    <Table>
      <TableCaption>
        This Files needs urget attentions as it is high risked files
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Modified Time</TableHead>
          <TableHead>Risk level</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file: FileData) => (
          <TableRow key={file.id}>
            <TableCell>{file.name}</TableCell>
            <TableCell>
              {file.owners.map((owner) => (
                <div key={owner.emailAddress}>{owner.displayName}</div>
              ))}
            </TableCell>
            <TableCell>
              {new Date(file.modifiedTime).toLocaleString()}
            </TableCell>
            <TableCell>
              <AlertCircleIcon />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default HighRiskTable;
