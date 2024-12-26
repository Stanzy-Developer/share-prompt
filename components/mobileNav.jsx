import React from "react";
import { SignIn, SignOut } from "./AuthButtons";
import MobileDropdown from "./MobileDropdown";
import { auth } from "@/auth";

const MobileNav = async () => {
  let session;
  try {
    session = await Promise.race([
      auth(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Auth timeout")), 5000)
      ),
    ]);
  } catch (error) {
    console.error("Auth error:", error);
    // Return SignIn component if auth times out or fails
    return (
      <div className="sm:hidden flex relative">
        <SignIn />
      </div>
    );
  }

  // If we get here, we have a valid session or null
  return (
    <div className="sm:hidden flex relative">
      {session?.user ? (
        <MobileDropdown userImage={session.user.image} SignOut={<SignOut />} />
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default MobileNav;
