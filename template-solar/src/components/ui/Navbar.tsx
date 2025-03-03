"use client"

import { siteConfig } from "@/app/siteConfig"
import useScroll from "@/lib/useScroll"
import { cx } from "@/lib/utils"
import { RiCloseFill, RiMenuFill } from "@remixicon/react"
import Link from "next/link"
import React from "react"
import { Button } from "@/components/Button"
import MedellinAILogo from "../MedellinAILogo"

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(15)

  return (
    <header
      className={cx(
        "fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b transition duration-300",
        scrolled || open
          ? "border-gray-200/50 shadow-md shadow-black/5"
          : "border-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Link href={siteConfig.baseLinks.home} aria-label="Home">
            <span className="sr-only">Medellin AI Logo</span>
            <MedellinAILogo />
          </Link>
          <nav className="hidden md:flex ml-10 space-x-8">
            {siteConfig.navigation.map((item) => (
              <Link 
                key={item.name} 
                className="px-2 py-1 text-gray-900 hover:text-gray-600 transition-colors" 
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex space-x-3">
            <Button
              variant="outline"
              className="h-10 font-medium"
            >
              Login
            </Button>
            <Button
              variant="default"
              className="h-10 font-medium"
            >
              Register
            </Button>
          </div>
          <Button
            onClick={() => setOpen(!open)}
            variant="ghost"
            className="p-1.5 sm:hidden"
            aria-label={open ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {!open ? (
              <RiMenuFill
                className="size-6 shrink-0 text-gray-900"
                aria-hidden="true"
              />
            ) : (
              <RiCloseFill
                className="size-6 shrink-0 text-gray-900"
                aria-hidden="true"
              />
            )}
          </Button>
        </div>
      </div>
      <div
        id="mobile-menu"
        className={cx(
          "mt-0 transition-all duration-300 ease-in-out overflow-hidden md:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="container mx-auto px-4 py-3">
          <ul className="space-y-4 font-medium">
            {siteConfig.navigation.map((item) => (
              <li key={item.name} onClick={() => setOpen(false)}>
                <Link 
                  href={item.href}
                  className="block py-2 text-gray-900 hover:text-gray-600 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col space-y-3 mt-6">
            <Button
              variant="outline"
              className="w-full font-medium"
            >
              Login
            </Button>
            <Button
              variant="default"
              className="w-full font-medium"
            >
              Register
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar