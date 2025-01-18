import { useState } from "react";
import { Landmark, Wallet, LayoutDashboard, Building2, PieChart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

function Navbar() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <header className="bg-card shadow-md sticky top-0 z-10">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Landmark className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Sync Wallet</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <Button
            variant={activeTab === "dashboard" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === "accounts" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("accounts")}
          >
            <Building2 className="mr-2 h-4 w-4" />
            Accounts
          </Button>
          <Button
            variant={activeTab === "transactions" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("transactions")}
          >
            <Wallet className="mr-2 h-4 w-4" />
            Transactions
          </Button>
          <Button
            variant={activeTab === "budget" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("budget")}
          >
            <PieChart className="mr-2 h-4 w-4" />
            Budget
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
