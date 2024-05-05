import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from "@/components/comman/header";
import Footer from '@/components/comman/footer.tsx';
import { ThemeProvider } from "@/components/theme-provider"
import DriveReport from './pages/report.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/report",
    element: <DriveReport />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </ThemeProvider>
  </React.StrictMode>,
)
