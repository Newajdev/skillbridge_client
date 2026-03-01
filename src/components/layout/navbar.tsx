"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LogOut, User, LayoutDashboard, Settings } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Tutors",
      url: "/tutors",
    },
    {
      title: "contact",
      url: "/contact",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const isLoggedIn = !!session;
  const user = session?.user;
  const userRole = (user as any)?.role?.toLowerCase()

  
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <section className={cn("py-4", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={"/"} className="flex items-center gap-2">
              <Image
                src={"/logo.png"}
                alt="Skillbridge The Best Online Learning Platform"
                height={80}
                width={80}
              />
            </a>
          </div>
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex gap-2">
            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-12 flex items-center gap-3 px-3 rounded-full hover:bg-muted font-bold text-[#173e72]"
                  >
                    <Avatar className="h-9 w-9 border-2 border-primary/20">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary uppercase">
                        {user.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="max-w-30 truncate">
                      {(user as any).role || "user"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none text-[#173e72]">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/${userRole}-dashboard`}
                        className="cursor-pointer"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="secondary">
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>
                <Button asChild>
                  <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={"/"} className="flex items-center gap-2">
              <Image
                src={"/logo.png"}
                alt="Skillbridge The Best Online Learning Platform"
                height={50}
                width={50}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={"/"} className="flex items-center gap-2">
                      <Image
                        src={"/logo.png"}
                        alt="Skillbridge The Best Online Learning Platform"
                        height={80}
                        width={80}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 p-4 pt-10">
                  {isLoggedIn && user && (
                    <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-2xl">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage
                          src={user.image || ""}
                          alt={user.name || "User"}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                          {user.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#173e72] text-lg">
                          {user.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-6">
                    {menu.map((item) => renderMobileMenuItem(item))}
                    {isLoggedIn && (
                      <>
                        <Link
                          href="/dashboard"
                          className="text-xl font-bold text-[#173e72] hover:translate-x-1 transition-transform flex items-center gap-2"
                        >
                          <LayoutDashboard className="h-5 w-5" /> Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="text-xl font-bold text-[#173e72] hover:translate-x-1 transition-transform flex items-center gap-2"
                        >
                          <User className="h-5 w-5" /> Profile
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 mt-4 border-t pt-8">
                    {isLoggedIn ? (
                      <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="w-full h-12 rounded-xl font-bold"
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        Log out
                      </Button>
                    ) : (
                      <>
                        <Button
                          asChild
                          variant="secondary"
                          className="w-full h-12 rounded-xl font-bold"
                        >
                          <a href={auth.login.url}>{auth.login.title}</a>
                        </Button>
                        <Button
                          asChild
                          className="w-full h-12 rounded-xl font-bold"
                        >
                          <a href={auth.signup.url}>{auth.signup.title}</a>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-semibold text-[#173e72] transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link key={item.title} href={item.url} className="text-xl font-bold text-[#173e72] hover:translate-x-1 transition-transform">
      {item.title}
    </Link>
  );
};



export { Navbar };
