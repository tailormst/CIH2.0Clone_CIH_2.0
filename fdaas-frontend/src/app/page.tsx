import { auth } from "@clerk/nextjs/server"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import WhatIsFraud from "@/components/WhatIsFraud"
import PreventionTips from "@/components/PreventionTips"
import ImageGallery from "@/components/ImageGallery"
import Footer from "@/components/Footer"

export default async function HomePage() {
  const { userId } = await auth()
  const isAuthenticated = !!userId

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection isAuthenticated={isAuthenticated} />
      <WhatIsFraud />
      <PreventionTips />
      <ImageGallery />
      <Footer />
    </div>
  )
}
