import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ActivateButton from "@/components/ActivateButton";

export default async function SuccessPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6">
            ✓
          </div>

          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>

          <p className="text-xl text-gray-600 mb-8">
            Thank you for upgrading to Pro. Your payment has been processed.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-700 mb-4">
              Your account is being activated. This usually takes a few seconds.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              If the webhook hasn't processed yet, you can manually activate your access:
            </p>
            <ActivateButton />
          </div>

          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>

          <p className="text-sm text-gray-500 mt-8">
            If you have any issues, please contact support.
          </p>
        </div>
      </main>
    </div>
  );
}
