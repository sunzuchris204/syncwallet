'use client';
import { useState } from 'react';
import {
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  PencilLine,
  Trash2,
  Wallet,
  LayoutDashboard,
  Building2,
  PieChart,
  MoreVertical,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for the accounts
const accounts = [
  { id: '1', name: 'Main Account', bank: 'Chase', balance: 5420.69 },
  { id: '2', name: 'Savings', bank: 'Bank of America', balance: 15780.42 },
  { id: '3', name: 'Business', bank: 'Wells Fargo', balance: 892.12 },
];

// Mock data for transactions
const transactions = [
  { id: '1', date: '2024-03-20', description: 'Grocery Store', amount: -120.50, type: 'expense' },
  { id: '2', date: '2024-03-19', description: 'Salary Deposit', amount: 3000.00, type: 'income' },
  { id: '3', date: '2024-03-18', description: 'Restaurant', amount: -85.20, type: 'expense' },
  { id: '4', date: '2024-03-17', description: 'Freelance Payment', amount: 750.00, type: 'income' },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAccount, setSelectedAccount] = useState(accounts[0].id);
  
  const currentAccount = accounts.find(account => account.id === selectedAccount);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Navigation Sidebar */}
        <div className="w-64 bg-card border-r border-border p-4">
          <h1 className="text-2xl font-bold text-foreground mb-8">Sync Wallet</h1>
          
          <nav className="space-y-2">
            <Button
              variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'accounts' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('accounts')}
            >
              <Building2 className="mr-2 h-4 w-4" />
              Accounts
            </Button>
            <Button
              variant={activeTab === 'transactions' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('transactions')}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Transactions
            </Button>
            <Button
              variant={activeTab === 'budget' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('budget')}
            >
              <PieChart className="mr-2 h-4 w-4" />
              Budget
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
          {activeTab === 'dashboard' && (
            <>
              <Card className="p-4 md:p-6 lg:p-8 bg-card">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                  {/* Account Selector */}
                  <div className="w-full lg:w-96 space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-2">Current Account</h2>
                      <p className="text-sm text-muted-foreground">Select an account to view its details and transactions</p>
                    </div>
                    <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                      <SelectTrigger className="w-full h-20">
                        <SelectValue>
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                              <Landmark className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex flex-col items-start gap-1">
                              <span className="text-base font-medium">{currentAccount?.name}</span>
                              <span className="text-sm text-muted-foreground">{currentAccount?.bank}</span>
                            </div>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map(account => (
                          <SelectItem key={account.id} value={account.id}>
                            <div className="flex items-center gap-4 py-2">
                              <div className="bg-primary/10 p-3 rounded-lg">
                                <Landmark className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex flex-col items-start">
                                <span className="text-base font-medium">{account.name}</span>
                                <span className="text-sm text-muted-foreground">{account.bank}</span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Balance Circle */}
                  <div className="relative w-full lg:w-[300px] aspect-square">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[90%] h-[90%] rounded-full bg-primary/5 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[80%] h-[80%] rounded-full bg-primary/10" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[70%] h-[70%] rounded-full bg-card border-2 border-primary flex flex-col items-center justify-center p-8">
                        <span className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                          ${currentAccount?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        <div className="text-center">
                          <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                          <p className="text-xs text-muted-foreground mt-1">{currentAccount?.bank} • {currentAccount?.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="bg-card rounded-xl p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Recent Transactions</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Transaction
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>

                <div className="relative overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={transaction.type === 'income' ? 'default' : 'secondary'}
                              className={cn(
                                transaction.type === 'income' ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                              )}
                            >
                              {transaction.type === 'income' ? (
                                <ArrowUpRight className="w-3 h-3 mr-1 inline-block" />
                              ) : (
                                <ArrowDownRight className="w-3 h-3 mr-1 inline-block" />
                              )}
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className={cn(
                            "text-right font-medium",
                            transaction.amount > 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {transaction.amount > 0 ? "+" : ""}
                            ${Math.abs(transaction.amount).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <PencilLine className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;