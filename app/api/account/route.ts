import { NextResponse } from 'next/server';
import { getTransactions, newTransaction } from '../../services/transactionService';

export async function GET() {
  try {
    const transactions = await getTransactions();
    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching transactions', error });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const createdTransaction = await newTransaction(data);
    return NextResponse.json({ message: 'Transaction created', createdTransaction });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating transaction', error });
  }
}
