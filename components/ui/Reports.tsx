
import { useEffect, useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

export interface Transaction {
    id: number;
    amount: number;
    type: string;
    accountId: number;
    date: string;
    category: string;
  }
export default function Reports() {

    const [transactions, setTransactions] = useState<Transaction[]>([]); 
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [isReportGenerated, setIsReportGenerated] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const response = await fetch('/api/transactions');

            if (!response.ok) {
              throw new Error('Failed to fetch transactions');
            }
            const data = await response.json();
            setTransactions(data.transactionsData);
          } catch (error) {
            console.error('Error fetching transactions:', error);
          }
        };
    
        fetchTransactions();
      }, []);

    const generateReport = async () => {
        // Build the query string using the selected start and end dates
        const queryParams = new URLSearchParams({
          startDate: startDate,
          endDate: endDate,
        });
    
        try {
          // Fetch the report from the API with the query parameters
          const response = await fetch(`/api/Reports?${queryParams.toString()}`);
          if (!response.ok) {
            throw new Error('Failed to fetch the report');
          }
    
          const data = await response.json();
          setFilteredTransactions(data.ReportsData);
          setIsReportGenerated(true); 
        } catch (error) {
          console.error('Error generating report:', error);
        }
      };

  const calculateSummary = () => {
    if (!Array.isArray(filteredTransactions)) {
        console.error('filteredTransactions is not an array:', filteredTransactions);
        return { totalIncome: 0, totalExpenses: 0, netAmount: 0 }; // Fallback values
      }
    const summary = filteredTransactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
            acc.totalIncome += transaction.amount;
        } else {
            acc.totalExpenses += Math.abs(transaction.amount);
         }
         return acc;
    }, { totalIncome: 0, totalExpenses: 0 });

    return {
      ...summary,
      netAmount: summary.totalIncome - summary.totalExpenses
    };
  };

  const downloadReport = () => {
    const summary = calculateSummary();
    const reportData = {
      startDate,
      endDate,
      summary,
      transactions: filteredTransactions
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-report-${startDate}-to-${endDate}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Generate transaction reports for specific date ranges</p>
      </div>

      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={generateReport}
              disabled={!startDate || !endDate}
              className="w-full"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </Card>

      {isReportGenerated && (
        <>
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Report Summary</h2>
              <Button onClick={downloadReport} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-green-500/10">
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-green-500">
                  ${calculateSummary().totalIncome}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10">
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-red-500">
                  ${calculateSummary().totalExpenses}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <p className="text-sm text-muted-foreground">Net Amount</p>
                <p className={cn(
                  "text-2xl font-bold",
                  calculateSummary().netAmount >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  ${calculateSummary().netAmount}
                </p>
              </div>
            </div>
          </Card>

          <div className="bg-card rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Transactions</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={transaction.type === 'income' ? 'default' : 'secondary'}
                        className={cn(
                          transaction.type === 'income' 
                            ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                            : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        )}
                      >
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className={cn(
                      "text-right font-medium",
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {transaction.amount > 0 ? "+" : ""}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
