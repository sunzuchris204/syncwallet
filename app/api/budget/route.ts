import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { budgets } from '../../../db/schema';


export async function GET() {
  try {
    const budgetsData = await db.select().from(budgets);
    return NextResponse.json({ budgetsData });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching budgets', error });
  }
}
