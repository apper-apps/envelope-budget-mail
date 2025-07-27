import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { formatCurrency } from "@/utils/formatCurrency";
import { format } from "date-fns";
import { getAllTransactions } from "@/services/api/transactionService";
import { toast } from "react-toastify";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllTransactions();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (err) {
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    let filtered = transactions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter(transaction => transaction.type === filterType);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filterType]);

  const getTransactionIcon = (type) => {
    switch (type) {
      case "income":
        return "TrendingUp";
      case "expense":
        return "TrendingDown";
      case "transfer":
        return "ArrowRightLeft";
      default:
        return "DollarSign";
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case "income":
        return "success";
      case "expense":
        return "error";
      case "transfer":
        return "primary";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-subtle animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadTransactions} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">
            Track your income, expenses, and transfers
          </p>
        </div>
        <Button size="lg">
          <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search transactions..."
              onSearch={setSearchTerm}
            />
          </div>
          <div className="flex space-x-2">
            {["all", "income", "expense", "transfer"].map((type) => (
              <Button
                key={type}
                variant={filterType === type ? "primary" : "secondary"}
                size="sm"
                onClick={() => setFilterType(type)}
                className="capitalize"
              >
                {type === "all" ? "All" : type}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {filteredTransactions.length === 0 ? (
        <Empty
          title={transactions.length === 0 ? "No Transactions" : "No Matching Transactions"}
          description={
            transactions.length === 0 
              ? "Start tracking your finances by adding your first transaction." 
              : "Try adjusting your search or filter criteria."
          }
          actionText={transactions.length === 0 ? "Add Your First Transaction" : "Clear Filters"}
          onAction={() => {
            if (transactions.length === 0) {
              toast.info("Transaction creation feature coming soon!");
            } else {
              setSearchTerm("");
              setFilterType("all");
            }
          }}
          icon={transactions.length === 0 ? "Receipt" : "Search"}
        />
      ) : (
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.Id} className="p-4 hover:shadow-medium transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "income" ? "bg-success-100" :
                    transaction.type === "expense" ? "bg-error-100" :
                    "bg-primary-100"
                  }`}>
                    <ApperIcon 
                      name={getTransactionIcon(transaction.type)} 
                      className={`h-5 w-5 ${
                        transaction.type === "income" ? "text-success-600" :
                        transaction.type === "expense" ? "text-error-600" :
                        "text-primary-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">
                        {transaction.description}
                      </h3>
                      <Badge variant={getTransactionColor(transaction.type)}>
                        {transaction.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>{format(new Date(transaction.date), "MMM dd, yyyy")}</span>
                      {transaction.categoryName && (
                        <>
                          <span>•</span>
                          <span>{transaction.categoryName}</span>
                        </>
                      )}
                      {transaction.accountName && (
                        <>
                          <span>•</span>
                          <span>{transaction.accountName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold currency-display ${
                    transaction.type === "income" ? "text-success-600" : 
                    transaction.type === "expense" ? "text-error-600" :
                    "text-gray-900"
                  }`}>
                    {transaction.type === "expense" ? "-" : ""}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;