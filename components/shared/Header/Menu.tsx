import { Button } from "@/components/ui/button";
import ModeToggle from "./Mode-Toggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCartIcon, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "./user-button";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      {/* medium screens and up navbar */}
      <nav className="hidden md:flex w-full max-w-sx gap-1">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href={"/cart"}>
            <ShoppingCartIcon /> Cart
          </Link>
        </Button>
        <UserButton />
      </nav>

      {/* small screen navbar */}
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <UserButton />
            <Button asChild>
              <Link href={"/sign-in"}>
                <UserIcon /> Sign In
              </Link>
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
