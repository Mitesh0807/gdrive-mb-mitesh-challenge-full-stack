import { Button } from "@/components/ui/button";
import { baseUrl } from "@/env";
import metomicAlert from "@/assets/metomic_alert_logo.svg";
import metomicSearch from "@/assets/metomic_serach_logo.svg";
import metomicFile from "@/assets/metomic_files_logo.svg";
import { Separator } from "@/components/ui/separator";
import {
  appReviewPng,
  fiveStarSvg,
  g2LogoSvg,
  gDriveSvg,
  gdriveDiscoverFullPng,
  heroSectionPng,
  leftArrowSvg,
  metomicLogoSvg,
  nonCpaPng,
  reviewPlatformPng,
} from "./assets/images";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const { toast } = useToast();
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
      const res = await fetch(
        `${baseUrl}google/auth:${encodeURIComponent(emailId)}`,
      );
      const data = await res.json();
      localStorage.setItem("_id", data?.state);
      window.open(data?.url, "_blank");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch the redirection URL.",
        variant: "destructive",
      });
      console.error("Failed to fetch the redirection URL:", error);
    }
  };
  const handleOnOpen = () => {
    setIsDialogOpen((prev) => !prev);
  };
  const handleOnClose = () => {
    getRedirectionUrl();
    setIsDialogOpen((prev) => !prev);
  };

  const onEmailIdChange = (value: string) => {
    setEmailId(value);
  };

  return (
    <>
      <div>
        <Dialog open={isDailogOpen} onOpenChange={handleOnOpen}>
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
              <Button
                className="w-full mt-10 h-1/3 border-double bg-gray-800"
                variant="destructive"
                onClick={handleOnClose}
              >
                Submit
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div className="bg-hero-section hero-section">
          <header className="flex justify-between py-8 container mx-auto scale-x-110 background-[url(https://assets-global.website-files.com/633d927…/65a7c4d…_NOISE%20(lower%20opacity\) . webp), linear-gradient(to bottom, var(--gradient--midnight--1) 15%, var(--gradient--midnight--2) 75%, var(--gradient--midnight--3));]">
            <img className="w-40" src={metomicLogoSvg} alt="" />
            <div className="text-sm flex gap-4 justify-end items-center">
              <div className="flex text-white/75 border-1 border-transparent gap-4 px-6 py-2 bg-header-menu-items">
                <span>Platform</span>
                <span>Recource centre</span>
              </div>
              <p className="text-white/75 font-medium">Virtual platform tour</p>
              <button className="bg-white flex items-center justify-end gap-4 rounded-md px-3 py-2">
                <span className="font-semibold text-sm">Book a Demo</span>
                <span className="bg-gray p-2 rounded-sm">
                  <img className="w-4" src={leftArrowSvg} alt="" />
                </span>
              </button>
            </div>
          </header>
          <div className="relative container mx-auto flex justify-between gap-10 pb-12">
            <div className="w-1/2">
              <h5 className="text-[#eb7645] mb-4 font-medium">
                Data Breach Finder
              </h5>
              <h1 className="text-white text-4xl leading-[1.25] mb-6 font-semibold">
                Check if your Google Drive is leaking sensitive data
              </h1>
              <div className="max-w-max">
                <button
                  onClick={handleOnOpen}
                  className="flex items-center gap-3 bg-white py-3 px-6 rounded-sm text-lg font-semibold"
                
                >
                  <img className="w-6" src={gDriveSvg} alt="" />
                  Free Google Drive Risk Report!
                </button>
              </div>
              <div className="h-[1px] w-full bg-white/80 my-8"></div>
              <div>
                {infoItems.map((item) => (
                  <div className="flex items-center gap-4 mb-6">
                    <img src={item.src} className="w-8 h-8" alt="Discovery" />
                    <span className="text-white text-base font-semibold">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-white/90 text-sm font-medium">
                After your scan is completed, we'll delete all collected data
                and remove our access permissions within 24 hours. We will not
                read any of your files' content at any time.
              </p>
            </div>
            <div className="w-1/2 flex justify-end">
              <img className="max-h-[600px]" src={heroSectionPng} alt="" />
            </div>
          </div>
        </div>
        <div className="pt-16 pb-24">
          <div className="container mx-auto">
            <div className="mb-2 text-[var(--neutral--700)] text-base font-semibold max-w-max mx-auto">
              DON'T WAIT UNTIL IT'S TOO LATE
            </div>
            <h2 className="mb-10 font-semibold text-3xl mx-auto text-[var(--neutral--700)] max-w-max">
              Join Infosec leaders securing their data
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="hover:bg-primary/5 flex flex-col gap-4 justify-start border-2 rounded-md p-6 border-primary/10">
                <div className="flex justify-between">
                  <img src={fiveStarSvg} alt="five star svg" />
                  <span>02/28/2023</span>
                </div>
                <p className="font-medium  text-base text-black/75">
                  Metomic helps us identify sensitive information in
                  applications where we previously had no or limited visibility.
                </p>
                <div className="flex justify-start items-center gap-4">
                  <img className="w-9" src={g2LogoSvg} alt="globe logo" />
                  <span className="text-lg font-semibold">Bud B</span>
                </div>
              </div>
              <div className="hover:bg-primary/5 flex flex-col gap-4 justify-start border-2 rounded-md p-6 border-primary/10">
                <div className="flex justify-between">
                  <img src={fiveStarSvg} alt="five star svg" />
                  <span>02/28/2023</span>
                </div>
                <p className="font-medium  text-base text-black/75">
                  Metomic helps us identify sensitive information in
                  applications where we previously had no or limited visibility.
                </p>
                <div className="flex justify-start items-center gap-4">
                  <img className="w-9" src={g2LogoSvg} alt="globe logo" />
                  <span className="text-lg font-semibold">Bud B</span>
                </div>
              </div>
              <div className="hover:bg-primary/5 flex flex-col gap-4 justify-start border-2 rounded-md p-6 border-primary/10">
                <div className="flex justify-between">
                  <img src={fiveStarSvg} alt="five star svg" />
                  <span>02/28/2023</span>
                </div>
                <p className="font-medium  text-base text-black/75">
                  Metomic helps us identify sensitive information in
                  applications where we previously had no or limited visibility.
                </p>
                <div className="flex justify-start items-center gap-4">
                  <img className="w-9" src={g2LogoSvg} alt="globe logo" />
                  <span className="text-lg font-semibold">Bud B</span>
                </div>
              </div>
              <div className="hover:bg-primary/5 flex flex-col gap-4 justify-start border-2 rounded-md p-6 border-primary/10">
                <div className="flex justify-between">
                  <img src={fiveStarSvg} alt="five star svg" />
                  <span>02/28/2023</span>
                </div>
                <p className="font-medium  text-base text-black/75">
                  Metomic helps us identify sensitive information in
                  applications where we previously had no or limited visibility.
                </p>
                <div className="flex justify-start items-center gap-4">
                  <img className="w-9" src={g2LogoSvg} alt="globe logo" />
                  <span className="text-lg font-semibold">Bud B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-16 pb-24 bg-[var(--neutral--200)]">
          <div className="container mx-auto">
            <p className="text-lg text-center mb-4 font-medium">UNCOVER</p>
            <h2 className="text-5xl max-w-3xl mx-auto font-semibold text-center mb-12 text-black/75">
              See the data Google Drive doesn’t show you{" "}
            </h2>
            <div className="flex items-start">
              <div className="w-1/2 font-medium text-2xl text-black/65">
                <ul className="list-disc">
                  <li className="mb-1">Personal data (PII)</li>
                  <li className="mb-1">Protected health information (PHI)</li>
                  <li className="mb-1">Payment card data (PCI)</li>
                  <li className="mb-1">Confidential data</li>
                  <li className="mb-1">Specific category data</li>
                  <li className="mb-1">Secrets, keys and passwords</li>
                </ul>
              </div>
              <div>
                <img className="max-w-lg" src={gdriveDiscoverFullPng} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-16 pb-24">
          <div className="container mx-auto">
            <p className="text-lg text-center mb-4 font-medium">GET STARTED</p>
            <h2 className="text-4xl font-semibold text-center mb-4">
              Choose Your Free Google Drive Risk Report
            </h2>
            <div className="flex items-stretch gap-4 pt-8">
              <div className="relative flex flex-col bg-primary text-white p-12 w-2/5 rounded-lg">
                <span className="absolute bg-acent px-4 py-2 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  Recommended
                </span>
                <h3 className="text-2xl font-semibold">
                  Scan your Google Drive company account
                </h3>
                <div className="h-[1px] bg-white/30 my-6"></div>
                <p className="text-base mb-4">
                  Get a full risk report for your company in minutes
                </p>
                <p className="text-sm mb-4">
                  After your scan is completed, we'll delete all collected data
                  and remove our access permissions within 24 hours. We will not
                  read any of your files' content at any time.
                </p>
                <button className="bg-white flex items-center justify-center text-black hover:bg-acent/90 gap-2 rounded-md leading-1 px-6 py-3  mt-auto font-semibold">
                  <img src={gDriveSvg} alt="google drive svg" />
                  <span>Free Google Drive Risk Report!</span>
                </button>
              </div>
              <div className="flex flex-col bg-primary/10 p-12 w-[30%]  rounded-lg">
                <h3 className="text-2xl font-semibold">
                  Run a dummy scan using our demo account
                </h3>
                <div className="h-[1px] bg-black/30 my-6"></div>
                <p className="text-base mb-4">
                  Get a sample report using dummy data.
                </p>
                <p className="text-sm mb-4">
                  See how our scanner detects sensitive data such as Driving
                  licenses, Credit card numbers and ID’s{" "}
                </p>
                <button className="mt-auto text-center gap-2 bg-primary hover:bg-acent/90 text-white max-w-max mx-auto leading-1 px-6 py-3 rounded-md transition-colors duration-400 font-semibold">
                  Scan our Demo account
                </button>
              </div>
              <div className="flex flex-col bg-primary/10 p-12 w-[30%]  rounded-lg">
                <h3 className="text-2xl font-semibold">
                  See all our Metomic features in action. Book a demo.
                </h3>
                <div className="h-[1px] bg-black/30 my-6"></div>
                <p className="text-base mb-4">
                  Let's see how Metomic can help your business.
                </p>
                <p className="text-sm mb-4">
                  Request a demo to see how our platform can give you
                  unparalleled visibility and control over your sensitive data.
                </p>
                <button className="mt-auto text-center gap-2 bg-primary hover:bg-acent/90 text-white max-w-max mx-auto leading-1 px-6 py-3 rounded-md transition-colors duration-400 font-semibold">
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
        <footer className="text-white bg-hero-section">
          <div className="container mx-auto">
            <div className="grid grid-cols-5 gap-8 py-20">
              <div>
                <img src={metomicLogoSvg} alt="" />
              </div>
              <div>
                <div className="footer-link-header">Company</div>
                <div className="text-sm">
                  <ul>
                    <li className="footer-link-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Carees</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">About us</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Contact us</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="footer-link-header text-xl">Integrations</div>
                <div className="text-sm">
                  <ul>
                    <li className="footer-link-item">
                      <a href="#">Google drive</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Slack</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Zira</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Teams</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Zendesk</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Github</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">ChatGPT</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Notion</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="footer-link-header text-xl">Platform</div>
                <div className="text-sm">
                  <ul>
                    <li className="footer-link-item">
                      <a href="#">Data Discovery</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Data Loss Prevention</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Access Controls</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">DSPM Tool</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Human Firewall</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Insider Threat</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Compliance</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="footer-link-header text-xl">Resources</div>
                <div className="text-sm">
                  <ul>
                    <li className="footer-link-item">
                      <a href="#">Guides</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Whitepapers & Reports</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Blog</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Press</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Video</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Product</a>
                    </li>
                    <li className="footer-link-item">
                      <a href="#">Email Sbscription Management Centre</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="h-[1px] bg-white/30"></div>
            <div className="py-20 flex justify-between items-center">
              <div>
                <p className="text-[22px] mb-6">Try a virtual platform tour</p>
                <p className="text-base mb-6">
                  Take a guided tour of the Metomic data security platform.
                </p>
                <div className="bg-white max-w-max flex items-center gap-3 pl-3 pr-1 py-1 rounded-lg">
                  <span className="text-sm text-black font-medium">
                    Virtual platform tour
                  </span>
                  <span className="p-1.5 bg-dark-gray rounded-lg">
                    <img className="w-4 " src={leftArrowSvg} alt="" />
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-8">
                <img className="h-24 max-w-32" src={nonCpaPng} alt="" />
                <img
                  className="h-20 max-w-32 bg-contain"
                  src={appReviewPng}
                  alt=""
                />
                <a href="#">
                  <img className="h-20" src={reviewPlatformPng} alt="" />
                </a>
              </div>
            </div>
            <div className="h-[1px] bg-white/30"></div>
            <div className="py-8 flex justify-between">
              <p>Copyright@ Metomic 2024</p>
              <div className="flex justify-end items-center gap-6">
                <a href="#">Terms & conditions</a>
                <a href="#">Privacy Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
