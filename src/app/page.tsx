/**
 * Home Page Component
 * 
 * This is the landing page of the CRM dashboard. It serves as the entry point
 * for users and provides authentication flow redirection.
 * 
 * Features:
 * - Responsive design with Tailwind CSS
 * - Authentication status check
 * - Automatic redirect to dashboard for authenticated users
 * - Modern UI with custom animations
 */

import Image from "next/image";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

// Component for feature highlights
const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => (
  <div className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
        <Image src={icon} alt={title} width={24} height={24} />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default async function Home() {
  // Check authentication status
  const session = await getServerSession();
  
  // Redirect authenticated users to dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-8">
          Modern CRM Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          Streamline your customer relationships with our powerful, intuitive CRM solution.
          Built with Next.js, Prisma, and TypeScript for optimal performance.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/signin"
            className="rounded-full bg-blue-600 px-8 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/auth/demo"
            className="rounded-full border border-gray-300 px-8 py-3 font-medium hover:bg-gray-50 transition-colors"
          >
            Try Demo
          </Link>
        </div>
      </header>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Customer Management"
            description="Efficiently organize and track your customer relationships with advanced filtering and search capabilities."
            icon="/icons/customers.svg"
          />
          <FeatureCard
            title="Smart Notes"
            description="Keep detailed records of customer interactions with our real-time note-taking system."
            icon="/icons/notes.svg"
          />
          <FeatureCard
            title="Analytics Dashboard"
            description="Make data-driven decisions with comprehensive analytics and reporting tools."
            icon="/icons/analytics.svg"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-600">
        <p>© 2024 CRM Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}
