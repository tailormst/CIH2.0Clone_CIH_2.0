"use client"

import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { isSignedIn } = useAuth()

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            FDaaS
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">
              Documentation
            </Link>

            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex space-x-2">
                <SignInButton mode="modal">
                  <Button variant="outline">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Sign Up</Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
