import "./App.css";

import { Button } from "@/components/ui/button";
import { baseUrl } from "./env";
import googleDriveIcon from "@/assets/Google_Drive_icon_(2020).svg";
import { ExternalLink } from 'lucide-react';
import googleDrivePreview from "@/assets/google_drive_report_preview.png";
import { Separator } from "./components/ui/separator";

function App() {
  const getRedirectionUrl = async () => {
    const res = await fetch(`${baseUrl}google/auth:waste6989@gmail.com`);
    const data = await res.json();
    console.log(data)
    localStorage.setItem("_id", data?.state)
    window.open(data?.url, "_blank");
  }
  return (
    <>
      <div className="App flex  items-center justify-center mb-96" onClick={getRedirectionUrl}>
        <div className="w-1/2 mr-10">
          <Button className="w-full mb-10 h-1/3 border-double bg-gray-800" variant={'destructive'}><img className="w-10 h-10" src={googleDriveIcon} />Get Your Google Drive Anaylsis<ExternalLink className="ml-2 " /></Button>
          <Separator />

        </div>
        <div>
          <img src={googleDrivePreview} />
        </div>
      </div>
    </>
  );
}

export default App;
