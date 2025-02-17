import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { transactions } from '../../../../db/schema';
import { eq } from "drizzle-orm";

// import { 
//     updateTransaction,
//     deleteTransaction
//  } from "../../../services/transactionService";
// import { PagesRouteHandlerContext } from 'next/dist/server/route-modules/pages/module.compiled';


 export async function GET(req: Request,context: { params: Promise<{ id: string }> }
 ) {
   try {
        // Note the await here
        const { id } = await context.params;
        const accountId = parseInt(id, 10);

        if(isNaN(accountId)) {
            return NextResponse.json({ error: 'Invalid account ID format' }, { status: 400 });
        }

       const data = await db.select().from(transactions).where(eq(transactions.accountId, accountId));

        if(!data.length) {
            return NextResponse.json({ error: 'No transactions found for this account'}, { status: 404 });
        }

        return NextResponse.json(data, { status: 200 });
            
    } catch (error) {
        console.error('Error fetching transactions by account:', error); 
        return NextResponse.json({ error: "Failed to fetch transactions"}, { status: 404 });
    }
}

//  export async function PATCH(req: NextRequest, context: PagesRouteHandlerContext<{ id: string }>) {
//      try {
//          const id = parseInt(context.params.id, 10);
//       const data = await req.json();
  
//       const updatedTransaction = await updateTransaction(id, data);
  
//       if (!updatedTransaction.length) {
//         return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
//       }
  
//       return NextResponse.json({ message: "Transaction updated successfully", updatedTransaction });
//     } catch {
//       return NextResponse.json({ message: "Error Creating Transaction" }, { status: 500 });
//     }
//   }


// export async function DELETE(req: Request, context: PagesRouteHandlerContext<{ id: string }>) {
//   try {
//       const id = parseInt(context.params.id, 10);
  
//       if (!id) {
//         return NextResponse.json(
//           { message: "Transaction ID is required for deletion." },
//           { status: 400 }
//         );
//       }
  
//       const deletedTransaction = await deleteTransaction(Number(id));
  
//       if (!deletedTransaction) {
//         return NextResponse.json(
//           { message: "Transaction not found." },
//           { status: 404 }
//         );
//       }
  
//       return NextResponse.json(
//         { message: "Transaction deleted successfully" },
//         { status: 200 }
//       );
//     } catch (error) {
//       return NextResponse.json(
//         { message: "Error deleting transaction", error },
//         { status: 500 }
//       );
//     }
//   }