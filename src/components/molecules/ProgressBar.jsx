import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  value, 
  max, 
  className,
  variant = "default",
  showLabel = false 
}) => {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  
  const variants = {
    default: "bg-primary-500",
    success: "bg-success-500",
    warning: "bg-warning-500",
    error: "bg-error-500",
  };

  const getVariant = () => {
    if (variant !== "default") return variant;
    if (percentage > 90) return "error";
    if (percentage > 75) return "warning";
    return "success";
  };

  const currentVariant = getVariant();

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            variants[currentVariant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;