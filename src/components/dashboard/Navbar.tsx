"use client";

import { Button } from "@nextui-org/button";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { useRouter } from "next/navigation";
import React from "react";

import { logout } from "@/src/services/auth.service";

export default function NavbarComponent() {
  const router = useRouter();
  const handleLogout = () => {
    const isConfirm = confirm("Are you want to logout?");

    if (isConfirm) {
      logout();
      router.push("/login");
    }
  };

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">Hello Anik</p>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button color="danger" onClick={() => handleLogout()}>
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
