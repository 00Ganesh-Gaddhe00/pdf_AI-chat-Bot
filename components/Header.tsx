import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";

function Header() {
  return (
    <div className="flex justify-between bg-white shadow-sm p-5 border-b-gray-500">
      <Link href="/dashboard" className="text-2xl">
        chat to <span className=" text-indigo-600">PDF</span>
      </Link>
      <SignedIn>
        <div className="flex items-center space-x-2">
          <Button asChild variant="link" className="hidden md:flex">
            <Link href="/dashboard/upgrade">Pricing</Link>
          </Button>

          <Button asChild variant="outline" className="border-gray-300">
            <Link href="/dashboard/">My Documents</Link>
          </Button>

          <Button asChild variant="outline" className="border-indigo-600">
            <Link href="/dashboard/upload">
              <FilePlus2 className="text-indigo-600"></FilePlus2>
            </Link>
          </Button>

          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}

export default Header;
