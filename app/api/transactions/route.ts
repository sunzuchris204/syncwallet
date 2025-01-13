import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { transactions } from '../../../db/schema';
import { 
  createTransaction,
 } from "../../services/transactionService";



export async function GET() {
  try {
    const transactionsData = await db.select().from(transactions);
    return NextResponse.json({ transactionsData });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching transactions', error });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, type, accountId, category, date } = body;

    if (!amount || !type || !accountId || !category) {
      return NextResponse.json(
        { message: "All fields (amount, type, accountId, category) are required." },
        { status: 400 }
      );
    }

    const newTransaction = await createTransaction({ amount, type, accountId, category, date });

    return NextResponse.json(
      { message: "Transaction created successfully", transaction: newTransaction },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating transaction", error},
      { status: 500 }
    );
  }
}


