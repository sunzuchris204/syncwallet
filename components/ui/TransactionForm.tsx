'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Controller, useForm } from 'react-hook-form';

interface Account {
  id: number;
  name: string;
  balance: string;
}

interface FormData {
  amount: number;
  type: string;
  accountId: number;
  category: string;
  date?: string;
}

const TransactionForm = () => {
  const [accounts, setAccounts] = useState<Account[]>([]); // Set the correct type for accounts
  const { control,register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  // Fetch accounts from the backend when component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/accounts'); // Replace with your API endpoint
        const data = await response.json();

        // Check if the response contains the "transactions" array
        if (data && Array.isArray(data.AccountsData)) {
          setAccounts(data.AccountsData); // Use transactions as accounts
        } else {
          console.error("Expected 'transactions' array, but got:", data);
        }
      } catch (error) {
        console.error("Failed to fetch accounts", error);
      }
    };

    fetchAccounts();
  }, []);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);
    try{
      const response = await fetch("http://localhost:3000/api/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit transaction");
      }

      const result = await response.json();
      console.log("Transaction submitted successfully:", result);
      
      alert("Transaction created successfully!");
      alert("Transaction created successfully!");

    } catch {
      console.error("Error Creating Transaction");
    }
  };

  return (
    <Dialog>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              {...register('amount', { required: 'Amount is required' })}
            />
            {errors.amount && <span>{errors.amount.message}</span>}
          </div>
          
          <div>
            <Label htmlFor="type">Type</Label>
            <Controller
              name="type"
              control={control}
              rules={{ required: "Type is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="account">Account</Label>
            <Controller
              name="accountId"
              control={control}
              rules={{ required: "Account is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an account" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(accounts) && accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name} {/* Display account name */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.account && (
              <p className="text-red-500">{errors.account.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              {...register('category', { required: 'Category is required' })}
            />
            {errors.category && <span>{errors.category.message}</span>}
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              {...register('date')}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
    </Dialog>
  );
};

export default TransactionForm;
