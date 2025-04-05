import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  const features = [
    {
      title: "Smart Onboarding",
      description: "Digital document management & automated team assignment system",
    },
    {
      title: "Employee Portal",
      description: "Role-based access with hierarchical team management",
    },
    {
      title: "Hierarchical Attendance",
      description: "Multi-level approval system with detailed leave tracking",
    },
    {
      title: "Leave Management",
      description: "Hierarchical approval workflow with complete audit trail",
    },
    {
      title: "Social Connect",
      description: "Private social network for internal communication & learning",
    },
    {
      title: "Smart Offboarding",
      description: "Automated access management with historical data retention",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uptoskills-ZHbVaZ5Yfq5X7wejp3UMlQFWuRdT4j.png"
                alt="Uptoskills Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-gray-200">
                Home
              </Link>
              <Link href="#features" className="text-white hover:text-gray-200">
                Features
              </Link>
              <Link href="#pricing" className="text-white hover:text-gray-200">
                Pricing
              </Link>
              <Link href="#contacts" className="text-white hover:text-gray-200">
                Contacts
              </Link>
            </div>
            <Link href="/login">
              <Button className="bg-coral-500 hover:bg-coral-600 text-white rounded-full px-6">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-purple-600 via-blue-500 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">HR Management System</h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Digital onboarding • Hierarchy management • Smart attendance
            <br />
            Social workplace integration • Automated workflows
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8">
              Free Demo
            </Button>
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  Learn More
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

