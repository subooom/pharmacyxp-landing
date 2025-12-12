"use client";
import React, { useEffect, useState } from "react";
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
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

function PageHeader() {
  const active = useActive();
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 300;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavigationItems = () =>
    NavigationLinks.map((link) => {
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

  const navigationContent = (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList className="gap-0">
        {renderNavigationItems()}
      </NavigationMenuList>
    </NavigationMenu>
  );

  return (
    <header className="backdrop-blur-md max-w-screen bg-primary-100 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div
        className="
      flex flex-wrap items-center justify-between 
      layout-container h-[82px] overflow-hidden
    "
      >
        <Logo />

        {/* Desktop Nav (only lg and above) */}
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

        {/* Right section */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Desktop sign up */}
          <Link href={Routes.sign_up} className="hidden lg:flex">
            <Button variant="primary_outline">Sign Up</Button>
          </Link>

          {/* ModeToggle always visible */}
          <ModeToggle />

          {/* Mobile & Tablet hamburger (below lg) */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <SheetHeader />
                {/* Centered mobile nav */}
                <div className="mt-8 flex flex-col items-center gap-6">
                  {NavigationLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium hover:text-primary"
                      target={link.external ? "_blank" : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href={Routes.sign_up}
                    className="w-full flex justify-center"
                  >
                    <Button variant="primary_outline" className="w-[80%]">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
