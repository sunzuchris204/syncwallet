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

export async function POST(req: Request) {
  try {
    const {category, amount,spent} = await req.json();

    // Validate the input (basic validation)
    if (!category || !amount || !spent) {
      return NextResponse.json(
        { message: 'Category, amount are required' },
        { status: 400 }
      );
    }
    // Insert the new budget into the database
    const newBudget = await db.insert(budgets).values({
      category,
      amount,
      spent,
    }).returning(); 

    // Respond with the created budget
    return NextResponse.json(
      { message: 'Budget created successfully', budget: newBudget },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating budget:', error);

    // Handle any errors
    return NextResponse.json(
      { message: 'Failed to create budget', error},
      { status: 500 }
    );
  }
}
