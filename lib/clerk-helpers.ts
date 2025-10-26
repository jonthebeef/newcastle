import { clerkClient } from "@clerk/nextjs/server";

export async function markUserAsPaid(userId: string) {
  const client = await clerkClient();
  await client.users.updateUser(userId, {
    publicMetadata: { isPaid: true },
  });
}

export async function isUserPaid(userId: string): Promise<boolean> {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.publicMetadata?.isPaid === true;
}
