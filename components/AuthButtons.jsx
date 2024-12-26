import React from "react";
import { signIn, signOut } from "@/auth";

export async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      className="w-full black_btn cursor-pointer"
    >
      <button type="submit">Sign In</button>
    </form>
  );
}

export async function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="w-full black_btn cursor-pointer"
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
