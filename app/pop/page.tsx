'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  // Fetch accounts from the backend when component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/accounts'); // Replace with your API endpoint
        const data = await response.json();

        // Check if the response contains the "transactions" array
        if (data && Array.isArray(data.transactions)) {
          setAccounts(data.transactions); // Use transactions as accounts
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
  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    // Process the data (send it to the backend, etc.)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Transaction</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
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
            <Select
              id="type"
              {...register('type', { required: 'Type is required' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <span>{errors.type.message}</span>}
          </div>

          <div>
            <Label htmlFor="account">Account</Label>
            <Select
              id="account"
              {...register('accountId', { required: 'Account is required' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Account" />
              </SelectTrigger>
              <SelectContent>
                {/* Check if accounts is an array before mapping */}
                {Array.isArray(accounts) && accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} {/* Display account name */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.accountId && <span>{errors.accountId.message}</span>}
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
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;
