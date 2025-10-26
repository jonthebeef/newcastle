import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isUserPaid } from "@/lib/clerk-helpers";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const isPaid = await isUserPaid(userId);

  if (!isPaid) {
    redirect("/upgrade");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <nav className="p-4 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Home
          </Link>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <UserButton />
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl">
              ✓
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome to Your Dashboard!</h2>
              <p className="text-green-600 font-semibold">Pro Member</p>
            </div>
          </div>
          <p className="text-gray-600">
            You have full access to all premium features. This is your product area.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-gray-600 text-sm">
              View your usage analytics and insights
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="text-xl font-bold mb-2">Settings</h3>
            <p className="text-gray-600 text-sm">
              Customize your experience and preferences
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold mb-2">Features</h3>
            <p className="text-gray-600 text-sm">
              Access all premium features and tools
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-xl font-bold mb-2">Reports</h3>
            <p className="text-gray-600 text-sm">
              Generate and download detailed reports
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-3">🔔</div>
            <h3 className="text-xl font-bold mb-2">Notifications</h3>
            <p className="text-gray-600 text-sm">
              Stay updated with real-time notifications
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-xl font-bold mb-2">Support</h3>
            <p className="text-gray-600 text-sm">
              Get priority support from our team
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
