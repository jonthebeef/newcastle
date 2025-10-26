import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="p-4 flex justify-between items-center max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">LAPP Demo</h1>
        <div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Welcome to LAPP Framework Demo
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Landing, Authentication, Payments, Product
        </p>
        <p className="text-lg text-gray-500 mb-12">
          A minimal local-first web app demonstrating the complete LAPP stack
          with Clerk auth and Stripe payments.
        </p>

        <div className="space-y-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
                Get Started - Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/upgrade"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
            >
              Upgrade to Pro
            </Link>
          </SignedIn>
        </div>

        <div className="mt-20 grid md:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="font-bold mb-2">Landing</h3>
            <p className="text-sm text-gray-600">Simple, clear value proposition</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="font-bold mb-2">Authentication</h3>
            <p className="text-sm text-gray-600">Powered by Clerk</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="font-bold mb-2">Payments</h3>
            <p className="text-sm text-gray-600">Stripe subscriptions</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="font-bold mb-2">Product</h3>
            <p className="text-sm text-gray-600">Your SaaS features</p>
          </div>
        </div>
      </main>
    </div>
  );
}
