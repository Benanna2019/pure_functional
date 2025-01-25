import clsx from "clsx";
import { Button, buttonVariants } from "../ui/button";
import { Link } from "@tanstack/react-router";

export function LinkButton({
  className,
  href,
  children,
}: {
  className: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Button asChild>
      <Link className={clsx(className)} to={href}>
        {children}
      </Link>
    </Button>
  );
}
