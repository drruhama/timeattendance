'use client'
import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Content from "@/components/Content";

export default function dashboard() {
  return (
    <>
    <Header />
    <div className="flex flex-row">
      <Sidebar />
      <Content />
    </div>
    </>
  ) 
}

