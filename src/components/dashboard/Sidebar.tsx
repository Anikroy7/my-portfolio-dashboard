"use client";
import { FaHome, FaTachometerAlt } from "react-icons/fa";
import Link from "next/link";
import React from "react";
import Image from "next/image";

import { adminMenuItems } from "@/src/config/dashboardMenu";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-screen shadow-lg">
      <div className="flex items-center justify-center h-16 py-4 ">
        <Link href={"/"} className="mt-6">
          <Image
            alt=""
            height={100}
            src="https://i.ibb.co.com/XWhj4vF/DALL-E-2024-12-31-00-23-47-A-professional-and-creative-logo-for-a-software-engineer-named-Anik-Roy-T.webp"
            width={100}
          />
        </Link>
      </div>
      <nav className="flex-1 mt-9">
        <ul className="space-y-2">
          <li>
            <Link
              className={`flex items-center px-4 py-2 hover:bg-gray-700  transition-colors`}
              href="/dashboard/admin"
            >
              <FaTachometerAlt className="h-5 w-5" />
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          {adminMenuItems.map((item, index) => (
            <li key={index}>
              <Link
                className="flex items-center px-4 py-2 hover:bg-gray-700 ${paths.length===2&&'bg-slate-700'} transition-colors"
                href={`/dashboard/admin/${item.path}`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <Link
          className="flex items-center px-4 py-2 text-gray-00 hover:bg-gray-700 hover:text-white transition-colors"
          href="/"
        >
          <FaHome className="h-5 w-5" />
          <span className="ml-2">Back to home</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
