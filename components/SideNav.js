"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  Users2Icon,
  Store,
  ShoppingBagIcon,
  LogInIcon,
} from "lucide-react";
import { Globe } from "lucide-react";
import config from "@/config";

function NavItem({ href, icon: Icon, label, active }) {
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
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

export function SideNav() {
  const pathname = usePathname();

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
        <nav className="grid items-start px-2 text-sm font-medium">
          {routes.map((route) => (
            <NavItem
              key={route.href}
              href={route.href}
              icon={route.icon}
              label={route.label}
              active={pathname === route.href}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <NavItem
          href="/login"
          icon={LogInIcon}
          label="Sign In / Sign Up"
          active={pathname === "/login"}
        />
      </div>
    </div>
  );
}
