"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import logo from "@/app/icon.png";
import config from "@/config";
import {
  Clock,
  Smartphone,
  Globe,
  PenTool,
  Layers,
  Chrome,
} from "lucide-react";

const categories = [
  { href: "/screen-time", label: "Screen Time", icon: Clock },
  { href: "/mobile", label: "Mobile", icon: Smartphone },
  { href: "/productivity", label: "Productivity", icon: PenTool },
  { href: "/web", label: "Web", icon: Globe },
  { href: "/replacements", label: "Alternatives", icon: Layers },
  { href: "/extensions", label: "Extensions", icon: Chrome },
];

const Header = () => {
  return (
    <header className="bg-white border-b border-neutral-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt={`${config.appName} logo`}
            className="w-8 h-8"
            width={32}
            height={32}
          />
          <span className="font-semibold text-lg text-neutral-700">
            {config.appName}
          </span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Apps</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] sm:w-[400px] gap-3 p-4 md:grid-cols-2">
                  {categories.map((category) => (
                    <ListItem
                      key={category.href}
                      title={category.label}
                      href={category.href}
                      icon={category.icon}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                onClick={() => {
                  window.open(
                    `mailto:${config.mailgun.supportEmail}?subject=Need help with ${config.appName}`,
                    "_blank"
                  );
                }}
              >
                Submit
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef(
  ({ className, title, children, icon: Icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              <div className="text-sm font-medium leading-none">{title}</div>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default Header;
