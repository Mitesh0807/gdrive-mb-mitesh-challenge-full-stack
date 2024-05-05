import "./App.css";

import { Button } from "@/components/ui/button";
import { baseUrl } from "./env";
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
      <div className="App flex flex-col items-center justify-center mb-96" onClick={getRedirectionUrl}>
        <img src="https://skillicons.dev/icons?i=gdrive&theme=dark" />
        <Button variant={'destructive'}>Get Your Google Drive Anaylsis</Button>
      </div>
    </>
  );
}

export default App;
