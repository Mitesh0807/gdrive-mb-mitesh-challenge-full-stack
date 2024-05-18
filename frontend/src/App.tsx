import "@/App.css";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/env";
import googleDriveIcon from "@/assets/Google_Drive_icon_(2020).svg";
import { ExternalLink } from 'lucide-react';
import googleDrivePreview from "@/assets/google_drive_report_preview.png";
import metomicAlert from "@/assets/metomic_alert_logo.svg";
import metomicSearch from '@/assets/metomic_serach_logo.svg';
import metomicFile from '@/assets/metomic_files_logo.svg'
import { Separator } from "@/components/ui/separator";
import Portfolio from "@/components/core/testomony";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";


const infoItems = [
  {
    src: metomicSearch,
    text: "See how secure your Google Drive account is in seconds",
  },
  {
    src: metomicFile,
    text: "Discover who still has access to your files, and who they were created by",
  },
  {
    src: metomicAlert,
    text: "Find risky files exposed publicly to anyone on the internet",
  },
];

function App() {
  const { toast } = useToast()
  const [isDailogOpen, setIsDialogOpen] = useState(false);
  const [emailId, setEmailId] = useState("");
  const getRedirectionUrl = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await fetch(`${baseUrl}google/auth:${encodeURIComponent(emailId)}`);
      const data = await res.json();
      localStorage.setItem("_id", data?.state);
      window.open(data?.url, "_blank");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch the redirection URL.",
        variant: "destructive",
      })
      console.error('Failed to fetch the redirection URL:', error);
    }
  };
  const handleOnOpen = () => {
    setIsDialogOpen((prev) => !prev
    )
  };
  const handleOnClose = () => {
    getRedirectionUrl();
    setIsDialogOpen((prev) => !prev
    )
  };

  const onEmailIdChange = (value: string) => {
    setEmailId(value);
  };

  return (
    <>
      <div className="App flex items-center justify-center mb-96">
        <div className="w-1/2 mr-10">
          <Dialog open={isDailogOpen} onOpenChange={handleOnOpen}>
            <Button
              className="w-full mb-10 h-1/3 border-double bg-gray-800"
              variant="destructive"
              onClick={handleOnOpen}
            >
              <img className="w-10 h-10" src={googleDriveIcon} alt="Google Drive Icon" />
              Get Your Google Drive Analysis
              <ExternalLink className="ml-2" />
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Email Id Of your Google Drive Account</DialogTitle>
                <DialogDescription>
                  Enter the email id of your Google Drive account.
                </DialogDescription>
                <Input
                  type="email"
                  value={emailId}
                  onChange={(e) => onEmailIdChange(e.target.value)}
                />
                <Separator />
                <Separator />
                <Button className="w-full mt-10 h-1/3 border-double bg-gray-800" variant="destructive" onClick={handleOnClose}>Submit</Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Separator />
          <Table>
            <TableBody>
              {infoItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="justify-center">
                    <img src={item.src} alt="Metomic Alert Logo" className="w-10 h-10" />
                    {item.text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator />
        </div>
        <div>
          <img src={googleDrivePreview} alt="Google Drive Report Preview" />
        </div>
      </div>
      <Portfolio />
    </>
  );
}

export default App;
