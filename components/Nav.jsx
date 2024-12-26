import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { SignIn, SignOut } from "./AuthButtons";
import MobileNav from "./mobileNav";

const Nav = async () => {
  const session = await auth();
  return (
    <nav className={`flex-between w-full mb-16 p-3`}>
      {/* Logo */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        ></Image>
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session && session?.user ? (
          <div className="flex-center gap-3 md:gap-5">
            <Link href="/create-prompt" className="w-full black_btn">
              Create Post
            </Link>

            <SignOut />

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={112}
                height={112}
                alt="Profile"
                className="rounded-full"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            <SignIn />
          </>
        )}
      </div>

      <MobileNav />
    </nav>
  );
};

export default Nav;
