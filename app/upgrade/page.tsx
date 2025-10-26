import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isUserPaid } from "@/lib/clerk-helpers";
import UpgradeButton from "@/components/UpgradeButton";
import Link from "next/link";

export default async function UpgradePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const isPaid = await isUserPaid(userId);

  if (isPaid) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="p-4 max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upgrade to Pro</h1>
          <p className="text-xl text-gray-600">
            Unlock full access to the dashboard and all features
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold mb-2">£10</div>
            <div className="text-gray-600">per month</div>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Full dashboard access
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              All premium features
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Priority support
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Cancel anytime
            </li>
          </ul>

          <UpgradeButton />

          <p className="text-xs text-gray-500 text-center mt-6">
            For demo: Use card 4242 4242 4242 4242
          </p>
        </div>
      </main>
    </div>
  );
}
