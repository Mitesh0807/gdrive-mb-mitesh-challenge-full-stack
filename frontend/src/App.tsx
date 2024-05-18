import "./App.css";
import { Button } from "@/components/ui/button";
import { baseUrl } from "./env";
import googleDriveIcon from "@/assets/Google_Drive_icon_(2020).svg";
import { ExternalLink } from 'lucide-react';
import googleDrivePreview from "@/assets/google_drive_report_preview.png";
import metomicAlert from "@/assets/metomic_alert_logo.svg";
import metomicSearch from '@/assets/metomic_serach_logo.svg';
import metomicFile from '@/assets/metomic_files_logo.svg'
import { Separator } from "@/components/ui/separator";
import Portfolio from "@/components/core/testomony";
import { Table, TableBody, TableCell, TableRow } from "./components/ui/table";

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
  const getRedirectionUrl = async () => {
    try {
      const res = await fetch(`${baseUrl}google/auth?email=waste6989@gmail.com`);
      const data = await res.json();
      console.log(data);
      localStorage.setItem("_id", data?.state);
      window.open(data?.url, "_blank");
    } catch (error) {
      console.error('Failed to fetch the redirection URL:', error);
    }
  };

  return (
    <>
      <div className="App flex items-center justify-center mb-96">
        <div className="w-1/2 mr-10">
          <Button
            className="w-full mb-10 h-1/3 border-double bg-gray-800"
            variant="destructive"
            onClick={getRedirectionUrl}
          >
            <img className="w-10 h-10" src={googleDriveIcon} alt="Google Drive Icon" />
            Get Your Google Drive Analysis
            <ExternalLink className="ml-2" />
          </Button>
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
          {/* {
            infoItems.map((item, index) => (
              <div className="w-full flex items-center justify-center m-5" key={index}>
                <img src={item.src} alt="Metomic Alert Logo" className="w-10 h-10" />
                <p className="text-amber-500">{item.text}</p>
              </div>
            ))
          } */}
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
