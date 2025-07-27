import { useEffect, useState } from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { formatCurrency } from "@/utils/formatCurrency";
import { getBudgetSummary } from "@/services/api/budgetService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const BudgetOverview = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBudgetSummary();
      setSummary(data);
    } catch (err) {
      setError("Failed to load budget summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-subtle animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8">
        <Error message={error} onRetry={loadSummary} />
      </div>
    );
  }
  
  if (!summary) return null;

  const overviewCards = [
    {
      title: "Total Income",
      value: summary.totalIncome,
      icon: "TrendingUp",
      gradient: "from-success-500 to-success-600",
      bgGradient: "from-success-50 to-success-100",
      textColor: "text-success-700",
    },
    {
      title: "Total Allocated",
      value: summary.totalAllocated,
      icon: "Target",
      gradient: "from-primary-500 to-primary-600",
      bgGradient: "from-primary-50 to-primary-100",
      textColor: "text-primary-700",
    },
    {
      title: "Remaining",
      value: summary.remaining,
      icon: "Wallet2",
      gradient: summary.remaining >= 0 ? "from-success-500 to-success-600" : "from-error-500 to-error-600",
      bgGradient: summary.remaining >= 0 ? "from-success-50 to-success-100" : "from-error-50 to-error-100",
      textColor: summary.remaining >= 0 ? "text-success-700" : "text-error-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {overviewCards.map((card, index) => (
        <Card key={index} className="p-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-medium transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className={`text-3xl font-bold currency-display ${card.textColor}`}>
                {formatCurrency(card.value)}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.bgGradient} flex items-center justify-center`}>
              <ApperIcon name={card.icon} className={`h-6 w-6 ${card.textColor}`} />
            </div>
          </div>
          {card.title === "Remaining" && (
            <div className="mt-3">
              <div className="flex items-center text-xs text-gray-500">
                <ApperIcon 
                  name={summary.remaining >= 0 ? "CheckCircle" : "AlertCircle"} 
                  className={`h-3 w-3 mr-1 ${summary.remaining >= 0 ? "text-success-500" : "text-error-500"}`} 
                />
                <span>
                  {summary.remaining >= 0 
                    ? "Budget is balanced" 
                    : "Over-allocated by " + formatCurrency(Math.abs(summary.remaining))
                  }
                </span>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default BudgetOverview;