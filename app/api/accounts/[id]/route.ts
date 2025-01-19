// import { deleteAccount, updateAccount } from "@/app/services/AccountsServices";
import { accounts } from "@/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
// import type { RouteHandlerContext } from 'next/server';
import { NextResponse } from "next/server";



 export async function GET(req: Request,context: { params: Promise<{ id: string }> }
 ) {
   try {
        // Note the await here
        const { id } = await context.params;
        const parsedId = parseInt(id, 10);

        if(isNaN(parsedId)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

       const data = await db.select().from(accounts).where(eq(accounts.id, parsedId));

        if(!data.length) {
            return NextResponse.json({ error: 'No Account found'}, { status: 404 });
        }

        return NextResponse.json(data, { status: 200 });
            
    } catch (error) {
        console.error('Error fetching Account:', error); 
        return NextResponse.json({ error: "Failed to fetch Account"}, { status: 404 });
    }
}

//  export async function PATCH(req: NextRequest,  { params }: { params: { id: string } }) {
//   try {
//     const id = parseInt(params.id, 10);
//       const data = await req.json();
  
//       const updatedAccount = await updateAccount(id, data);
  
//       if (!updatedAccount.length) {
//         return NextResponse.json({ message: "Account not found" }, { status: 404 });
//       }
  
//       return NextResponse.json({ message: "Account updated successfully", updatedAccount });
//     } catch {
//       return NextResponse.json({ message: "Error Creating Account" }, { status: 500 });
//     }
//   }

//   export async function DELETE(req: Request,  { params }: { params: { id: string } }) {
//     try {
//       const id = parseInt(params.id, 10);
    
//         if (!id) {
//           return NextResponse.json(
//             { message: "Account ID is required for deletion." },
//             { status: 400 }
//           );
//         }
    
//         const deletedAccount = await deleteAccount(Number(id));
    
//         if (!deletedAccount) {
//           return NextResponse.json(
//             { message: "Account not found." },
//             { status: 404 }
//           );
//         }
    
//         return NextResponse.json(
//           { message: "Account deleted successfully" },
//           { status: 200 }
//         );
//       } catch (error) {
//         return NextResponse.json(
//           { message: "Error deleting Account", error },
//           { status: 500 }
//         );
//       }
//     }