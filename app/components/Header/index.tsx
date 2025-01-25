import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { LinkButton } from "../LinkButton";
import { Authenticated, Unauthenticated } from "convex/react";

// ** Import Clerk/Convex Auth methods **

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-10 mx-auto flex h-12 items-center justify-center px-6 transition-colors duration-300 text-black border-b-[.5px] border-gray-600 "
      )}
    >
      <div className="z-10 flex w-full max-w-[90rem] items-center justify-between text-inherit">
        <nav className="w-full items-center justify-between md:flex">
          <Link
            aria-label="Navigate to the homepage"
            to="/"
            className="w-[20%] text-lg font-mono"
          >
            Pure Functional
          </Link>
          <ul className="relative mx-auto hidden w-[60%] items-center justify-center text-sm font-medium md:flex">
            <li>
              <Link
                aria-label="Workshops"
                className={cn(
                  "group flex w-max cursor-default items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors hover:cursor-pointer"
                )}
                to="/workshops"
              >
                Workshops
              </Link>
            </li>
            {/* <li>
              <Link
                aria-label="Tips"
                className={cn(
                  "group flex w-max cursor-default items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors hover:cursor-pointer"
                )}
                href="/tips"
              >
                Tips
              </Link>
            </li> */}
            {/* <li>
              <Link
                aria-label="Tutorials"
                className={cn(
                  "group flex w-max cursor-default items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors hover:cursor-pointer"
                )}
                href="/tutorials"
              >
                Tutorials
              </Link>
            </li> */}
            <li>
              <Link
                aria-label="Posts"
                className={cn(
                  "group flex w-max cursor-default items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors hover:cursor-pointer"
                )}
                to="/posts"
              >
                Posts
              </Link>
            </li>
          </ul>
          <div className="hidden w-[20%] items-center justify-end gap-4 md:flex">
            <div className="">
              <Unauthenticated>
                <SignInButton />
              </Unauthenticated>
              <Authenticated>
                <UserButton />
              </Authenticated>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Helper components for UserMenu and ModalContent would be defined here
