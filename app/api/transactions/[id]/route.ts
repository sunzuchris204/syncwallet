import { NextRequest, NextResponse } from 'next/server';
// import { db } from '../../../../lib/db';
// import { transactions } from '../../../../db/schema';

import { 
    updateTransaction,
    deleteTransaction
 } from "../../../services/transactionService";




 export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const id = parseInt(params.id);
      const data = await req.json();
  
      const updatedTransaction = await updateTransaction(id, data);
  
      if (!updatedTransaction.length) {
        return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Transaction updated successfully", updatedTransaction });
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }


export async function DELETE(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
  
      if (!id) {
        return NextResponse.json(
          { message: "Transaction ID is required for deletion." },
          { status: 400 }
        );
      }
  
      const deletedTransaction = await deleteTransaction(Number(id));
  
      if (!deletedTransaction) {
        return NextResponse.json(
          { message: "Transaction not found." },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: "Transaction deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error deleting transaction", error },
        { status: 500 }
      );
    }
  }