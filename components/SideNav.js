"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users2Icon,
  Store,
  ShoppingBagIcon,
  LogInIcon,
  CircleUserRound,
} from "lucide-react";
import { Globe } from "lucide-react";
import config from "@/config";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

function NavItem({ href, icon: Icon, label, active, size = "h-4 w-4" }) {
  if (!Icon) return null;
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-100 ease-in-out ${
        active
          ? "bg-muted text-primary"
          : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
      }`}
    >
      <Icon className={size} />
      {label}
    </Link>
  );
}

function AccountSection({ pathname }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        asChild
        variant={pathname === "/profile" ? "secondary" : "outline"}
        className="w-full justify-center"
      >
        <Link href="/profile">
          <CircleUserRound className="h-4 w-4" />
          Account
        </Link>
      </Button>
      <Button
        variant="outline"
        onClick={() => signOut()}
        className="w-full justify-center"
      >
        <LogInIcon className="h-4 w-4 rotate-180" />
        Sign Out
      </Button>
    </div>
  );
}

export function SideNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const routes = [
    {
      label: "Find Creators",
      icon: Users2Icon,
      href: "/find-creators",
    },
    {
      label: "Find Brands",
      icon: Store,
      href: "/find-brands",
    },
    {
      label: "Find Products",
      icon: ShoppingBagIcon,
      href: "/find-products",
    },
  ];

  return (
    <div className="sticky top-0 h-screen flex-col flex">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Globe className="h-6 w-6" />
          <span className="">{config.appName}</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto">
        <nav className="grid items-start p-2 text-sm font-medium gap-1">
          {routes.map((route) => (
            <NavItem
              key={route.href}
              href={route.href}
              icon={route.icon}
              label={route.label}
              active={
                pathname.startsWith(route.href) ||
                (route.label === "Find Creators" && pathname === "/")
              }
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        {session ? (
          <AccountSection pathname={pathname} />
        ) : (
          <NavItem
            href="/login"
            icon={LogInIcon}
            label="Sign In / Sign Up"
            active={pathname === "/login"}
          />
        )}
      </div>
    </div>
  );
}
