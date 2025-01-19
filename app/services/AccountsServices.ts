import { db } from "../../lib/db";
import { accounts } from "../../db/schema";

import { eq } from 'drizzle-orm';

// get all accounts
export async function getAccounts() {
  try {
    return await db.select().from(accounts);
  } catch {
    console.error('Error fetching accounts');
  }
}

// get account by id
export async function getAccountById(id: number) {
    try {
        return await db.select().from(accounts).where(eq(accounts.id, id));
      } catch {
        console.error('Error fetching accounts');
      }
}


export const createAccounts = async (data: {
  name: string;
  balance: string;
}) => {
  const { name,balance } = data;
  return await db.insert(accounts).values({
    name,
    balance    
});
};


// export const updateAccount = async (id: number, data: {
//   name: string;
//   balance: number;
// }) => {
//   try {
//     const updatedTransaction = await db
//       .update(accounts)
//       .set(data)
//       .where(eq(accounts.id, id))
//       .returning();

//     return updatedTransaction;
//   } catch {
//     console.error("Failed to update transaction");
//   }
// };

// export const deleteAccount = async (id: number) => {
//   return await db.delete(accounts).where(eq(accounts.id,id));
// };