import { deleteAccount, updateAccount } from "@/app/services/AccountsServices";
import { accounts } from "@/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";





 export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const id = parseInt(params.id);
      const data = await req.json();
  
      const updatedAccount = await updateAccount(id, data);
  
      if (!updatedAccount.length) {
        return NextResponse.json({ message: "Account not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Account updated successfully", updatedAccount });
    } catch {
      return NextResponse.json({ message: "Error Creating Account" }, { status: 500 });
    }
  }

  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
      try {
        const id = parseInt(params.id);
    
        if (!id) {
          return NextResponse.json(
            { message: "Account ID is required for deletion." },
            { status: 400 }
          );
        }
    
        const deletedAccount = await deleteAccount(Number(id));
    
        if (!deletedAccount) {
          return NextResponse.json(
            { message: "Account not found." },
            { status: 404 }
          );
        }
    
        return NextResponse.json(
          { message: "Account deleted successfully" },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          { message: "Error deleting Account", error },
          { status: 500 }
        );
      }
    }