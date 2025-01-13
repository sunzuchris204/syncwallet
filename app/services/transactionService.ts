// services/transactionService.ts
import { db } from "../../lib/db";
import { transactions } from "../../db/schema";
import { eq } from 'drizzle-orm';



export async function getTransactions() {
  try {
    return await db.select().from(transactions);
  } catch {
    console.error('Error fetching transactions');
  }
}

export const createTransaction = async (data: {
  amount: number;
  type: string;
  accountId: number;
  category: string;
  date?: string;
}) => {
  const { amount, type, accountId, category, date } = data;
  return await db.insert(transactions).values({
    amount,
    type,
    accountId,
    category,
    date: date || new Date().toISOString(),
  });
};

export const updateTransaction = async (id: number, data: {
  amount: number;
  type: string;
  accountId: number;
  category: string;
  date?: string;
}) => {
  try {
    const updatedTransaction = await db
      .update(transactions)
      .set(data)
      .where(eq(transactions.id, id))
      .returning();

    return updatedTransaction;
  } catch {
    console.error("Failed to update transaction");
  }
};

export const deleteTransaction = async (id: number) => {
  return await db.delete(transactions).where(eq(transactions.id,id));
};