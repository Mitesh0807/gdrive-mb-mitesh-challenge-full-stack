import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link2Icon } from "@radix-ui/react-icons";

export interface FileData {
  owners: {
    displayName: string;
    emailAddress: string;
  }[];
  webViewLink?: string;
  webContentLink?: string;
  id: string;
  name: string;
  modifiedTime: string;
  isPubliclyAccessible: boolean;
}

interface TableProps {
  files: FileData[];
  captionText?: string;
  accessText?:string;
}

function PublicAccessTable({
  files,
  captionText = "Your Google Drive Files",
  accessText="Public Access"
}: TableProps) {
  return (
    <Table>
      <TableCaption>{captionText}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Modified Time</TableHead>
          <TableHead>{accessText}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
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
              {
                <a
                  href={file.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Link2Icon className="mr-1" /> Open
                </a>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PublicAccessTable;
