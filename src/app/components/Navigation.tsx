"use client";

import Link from "next/link";

const Navigation = () => {
  return (
    <header className="border-b border-gray-200 px-5">
      <div className="container max-w-screen-xl mx-auto relative flex justify-center items-center">
        <Link href="/" className="font-bold text-xl cursor-pointer text-white">
          FullStackChannel
        </Link>
      </div>
    </header>
  );
};

export default Navigation;
