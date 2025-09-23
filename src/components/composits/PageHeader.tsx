"use client";
import React, { useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import NavigationLinks from "@/constants/NavigationLinks";
import Logo from "./Logo";
import { Button } from "../ui/button";

import { Fade } from "react-awesome-reveal";
import { useActive } from "@/hooks/useActive";
import { Routes } from "@/constants/routes";
import { ModeToggle } from "../mode-toggle";
import { usePathname } from "next/navigation";

function PageHeader() {
  const active = useActive();
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  const renderNavigationItems = () => {
    return NavigationLinks.map((link) => {
      if (link.children) {
        return (
          <NavigationMenuItem key={link.label}>
            <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              {link.children.map((child) => (
                <NavigationMenuLink
                  key={child.label}
                  href={child.href}
                  dataActive={active.check(child.href)}
                  target={child.external ? "_blank" : undefined}
                >
                  {child.label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        );
      }
      return (
        <NavigationMenuItem key={link.label}>
          <NavigationMenuLink asChild>
            <Link
              href={link.href}
              className="text-[18px] px-6"
              target={link.external ? "_blank" : undefined}
            >
              {link.label}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      );
    });
  };

  const [isScrolled, setIsScrolled] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 300;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationContent = (
    <NavigationMenu>
      <NavigationMenuList className="gap-0">
        {renderNavigationItems()}
      </NavigationMenuList>
    </NavigationMenu>
  );

  return (
    <header className="backdrop-blur-md bg-primary-100 fixed top-0 left-0 right-0 z-50 shadow-md overflow-hidden">
      <div className="flex items-center justify-between layout-container h-[82px]">
        <Logo />
        {isLandingPage ? (
          <Fade
            direction={isScrolled ? "up" : "down"}
            reverse={!isScrolled}
            duration={222}
          >
            {navigationContent}
          </Fade>
        ) : (
          navigationContent
        )}
        <div className="flex gap-2">
          <Link href={Routes.sign_up}>
            <Button variant={"primary_outline"}>Sign Up</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
