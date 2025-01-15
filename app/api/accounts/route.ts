import { NextResponse } from 'next/server';
import { createAccounts, getAccounts } from '../../services/AccountsServices';

export async function GET() {
  try {
    const transactions = await getAccounts();
    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching transactions', error });
  }
}


export async function POST(req: Request) {
  try {
    const data = await req.json();
    const createdAccounts = await createAccounts(data);
    return NextResponse.json({ message: 'Account created', createdAccounts });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating Account', error });
  }
}
