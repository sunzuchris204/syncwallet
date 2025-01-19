import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PieChart, Wallet, Plus } from 'lucide-react';

interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
}

const initialBudgets: Budget[] = [
  {
    id: '1',
    category: 'Monthly Budget',
    amount: 5000,
    spent: 3240.50,
  }
];

const categories = [
  'Housing',
  'Transportation',
  'Food',
  'Utilities',
  'Healthcare',
  'Entertainment',
  'Shopping',
  'Savings',
  'Other'
];

export function Budget() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
  });

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/budgets/');
        const data = await response.json();

        // Check if the response contains budgetsData and if it's an array
        if (data?.budgetsData && Array.isArray(data.budgetsData)) {
          setBudgets(data.budgetsData); 
        } else {
          console.error("Invalid data structure received:", data);
        }
      } catch (error) {
        console.error("Error fetching Budgets:", error);
      }
    };

    fetchBudgets();
  },[]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBudget: Budget = {
      id: (budgets.length + 1).toString(),
      category: formData.category,
      amount: parseFloat(formData.amount),
      spent: 0
    };
    setBudgets([...budgets, newBudget]);
    setIsDialogOpen(false);
    setFormData({ category: '', amount: '' });
  };

  const calculatePercentage = (spent: number, total: number) => {
    return (spent / total) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Budget</h1>
          <p className="text-muted-foreground">Track your spending and stay within your budget</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Budget Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">Create Budget</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => (
          <Card key={budget.id} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`/10 p-3 rounded-lg`}>
                <Wallet className={`w-6 h-6 text-500`} />
              </div>
              <div>
                <h3 className="font-semibold">{budget.category}</h3>
                <p className="text-2xl font-bold mt-1">
                  ${budget.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Spent</span>
                <span className="font-medium">
                  ${budget.spent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <Progress value={calculatePercentage(budget.spent, budget.amount)} />
              <p className="text-sm text-muted-foreground">
                {calculatePercentage(budget.spent, budget.amount).toFixed(1)}% of budget used
              </p>
            </div>
          </Card>
        ))}

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <PieChart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Coming Soon</h3>
              <p className="text-sm text-muted-foreground">Syncing Budgets with Transactions, update and Delete</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}