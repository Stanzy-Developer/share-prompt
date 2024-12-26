"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const MobileDropdown = ({ userImage, SignOut }) => {
  const [toggleDropdown, setToggleDropdown] = React.useState(false);
  return (
    <div className="flex">
      <Image
        src={userImage}
        width={37}
        height={37}
        alt="Profile"
        className="rounded-full"
        onClick={() => setToggleDropdown((prev) => !prev)}
      />
      {toggleDropdown && (
        <div className={`dropdown`}>
          <Link
            className="dropdown_link"
            href="/profile"
            onClick={() => setToggleDropdown(false)}
          >
            My Profile
          </Link>
          <Link
            className="dropdown_link"
            href="/create-prompt"
            onClick={() => setToggleDropdown(false)}
          >
            Create Prompt
          </Link>
          {SignOut}
        </div>
      )}
    </div>
  );
};

export default MobileDropdown;
