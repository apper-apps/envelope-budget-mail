import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { formatCurrency } from "@/utils/formatCurrency";
import { getAllAccounts } from "@/services/api/accountService";
import { toast } from "react-toastify";

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllAccounts();
      setAccounts(data);
    } catch (err) {
      setError("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const getAccountIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "checking":
        return "CreditCard";
      case "savings":
        return "PiggyBank";
      case "credit":
        return "CreditCard";
      case "investment":
        return "TrendingUp";
      default:
        return "Wallet";
    }
  };

  const getAccountColor = (type) => {
    switch (type?.toLowerCase()) {
      case "checking":
        return "primary";
      case "savings":
        return "success";
      case "credit":
        return "warning";
      case "investment":
        return "secondary";
      default:
        return "default";
    }
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-subtle animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadAccounts} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
          <p className="text-gray-600 mt-1">
            Overview of your financial accounts and balances
          </p>
        </div>
        <Button size="lg">
          <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
          Add Account
        </Button>
      </div>

      {/* Total Balance Overview */}
      <Card className="p-6 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Balance</p>
            <p className="text-4xl font-bold text-primary-700 currency-display">
              {formatCurrency(totalBalance)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Across {accounts.length} {accounts.length === 1 ? "account" : "accounts"}
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <ApperIcon name="Banknote" className="h-8 w-8 text-primary-600" />
          </div>
        </div>
      </Card>

      {accounts.length === 0 ? (
        <Empty
          title="No Accounts Added"
          description="Add your bank accounts, credit cards, and other financial accounts to get a complete view of your finances."
          actionText="Add Your First Account"
          onAction={() => toast.info("Account creation feature coming soon!")}
          icon="CreditCard"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <Card key={account.Id} className="p-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-medium transition-all duration-200 hover:scale-[1.02]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <ApperIcon 
                      name={getAccountIcon(account.type)} 
                      className="h-5 w-5 text-primary-600" 
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{account.name}</h3>
                    <Badge variant={getAccountColor(account.type)}>
                      {account.type}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="MoreHorizontal" className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="text-center py-4">
                  <div className={`text-2xl font-bold currency-display ${
                    account.balance >= 0 ? "text-success-600" : "text-error-600"
                  }`}>
                    {formatCurrency(account.balance)}
                  </div>
                  <div className="text-xs text-gray-500">Current Balance</div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                  <span>Last Updated</span>
                  <span>Today</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountsPage;