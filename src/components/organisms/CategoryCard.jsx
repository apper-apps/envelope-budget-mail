import { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ProgressBar from "@/components/molecules/ProgressBar";
import ApperIcon from "@/components/ApperIcon";
import { formatCurrency } from "@/utils/formatCurrency";
import CategoryModal from "@/components/organisms/CategoryModal";
import { toast } from "react-toastify";

const CategoryCard = ({ category, onUpdate, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const remaining = category.allocated - category.spent;
  const spentPercentage = category.allocated > 0 ? (category.spent / category.allocated) * 100 : 0;

  const getStatusColor = () => {
    if (remaining < 0) return "error";
    if (remaining < category.allocated * 0.2) return "warning";
    return "success";
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    
    setIsDeleting(true);
    try {
      await onDelete(category.Id);
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateCategory = async (updatedData) => {
    try {
      await onUpdate(category.Id, updatedData);
      setShowEditModal(false);
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  return (
    <>
      <Card className="p-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-strong transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: category.color || "#4f46e5" }}
            >
              <ApperIcon name={category.icon || "Wallet"} className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <Badge variant={getStatusColor()}>
                {remaining >= 0 ? `${formatCurrency(remaining)} left` : `Over by ${formatCurrency(Math.abs(remaining))}`}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="text-gray-400 hover:text-gray-600"
            >
              <ApperIcon name="Edit2" className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-gray-400 hover:text-error-600"
            >
              <ApperIcon name="Trash2" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Allocated</span>
            <span className="font-semibold text-gray-900 currency-display">
              {formatCurrency(category.allocated)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Spent</span>
            <span className="font-semibold text-gray-900 currency-display">
              {formatCurrency(category.spent)}
            </span>
          </div>
          
          <ProgressBar
            value={category.spent}
            max={category.allocated}
            variant={getStatusColor()}
          />
          
          <div className="text-center">
            <div className={`text-lg font-bold currency-display ${
              remaining >= 0 ? "text-success-600" : "text-error-600"
            }`}>
              {formatCurrency(remaining)}
            </div>
            <div className="text-xs text-gray-500">remaining</div>
          </div>
        </div>
      </Card>

      <CategoryModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleUpdateCategory}
        category={category}
        title="Edit Category"
      />
    </>
  );
};

export default CategoryCard;