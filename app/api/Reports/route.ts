import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { transactions } from '../../../db/schema';
import { and, gte, lte } from 'drizzle-orm';

export async function GET(req: Request) 
{
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate'); 

    // Validate that both dates are provided
    if (!startDate || !endDate) {
      return NextResponse.json(
        { message: 'Both startDate and endDate are required.' },
        { status: 400 }
      );
    }
    const ReportsData = await db
    .select()
    .from(transactions)
    .where(
      and(
        gte(transactions.date, new Date(startDate)), // Start date condition
        lte(transactions.date, new Date(endDate))  // End date condition
      )
    );
    return NextResponse.json({ ReportsData });
  } catch (error) {
    console.error('Error fetching Reports:', error);
    return NextResponse.json({ message: 'Error fetching Reports', error });
  }
}