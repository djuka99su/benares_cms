"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Infobar from "../components/infobar/Infobar";
import Footer from "../components/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-800">
        <Infobar/>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
