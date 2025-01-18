// import { useState } from 'react';
import { Card } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
import { PieChart, Wallet } from 'lucide-react';

export function Budget() {
  // This is a placeholder component - we'll implement the full budget functionality later
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Budget</h1>
        <p className="text-muted-foreground">Track your spending and stay within your budget</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Monthly Budget</h3>
              <p className="text-2xl font-bold mt-1">$5,000.00</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent</span>
              <span className="font-medium">$3,240.50</span>
            </div>
            {/* <Progress value={64.81} /> */}
            <p className="text-sm text-muted-foreground">65% of budget used</p>
          </div>
        </Card>

        {/* Placeholder for future budget features */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <PieChart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Coming Soon</h3>
              <p className="text-sm text-muted-foreground">Budget categories and more</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}