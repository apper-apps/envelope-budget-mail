import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CategoryModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  category = null,
  title = "Add Category"
}) => {
  const [formData, setFormData] = useState({
    name: "",
    allocated: "",
    color: "#4f46e5",
    icon: "Wallet"
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const iconOptions = [
    "Wallet", "Home", "Car", "ShoppingCart", "Utensils", "Gamepad2",
    "Heart", "Book", "Music", "Plane", "Shirt", "Fuel",
    "Coffee", "Gift", "Phone", "Monitor", "CreditCard", "DollarSign"
  ];

  const colorOptions = [
    "#4f46e5", "#7c3aed", "#10b981", "#f59e0b", "#ef4444", "#3b82f6",
    "#8b5cf6", "#06b6d4", "#84cc16", "#f97316", "#ec4899", "#6366f1"
  ];

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setFormData({
          name: category.name,
          allocated: category.allocated.toString(),
          color: category.color || "#4f46e5",
          icon: category.icon || "Wallet"
        });
      } else {
        setFormData({
          name: "",
          allocated: "",
          color: "#4f46e5",
          icon: "Wallet"
        });
      }
      setErrors({});
    }
  }, [isOpen, category]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }
    
    if (!formData.allocated.trim()) {
      newErrors.allocated = "Allocated amount is required";
    } else {
      const amount = parseFloat(formData.allocated);
      if (isNaN(amount) || amount < 0) {
        newErrors.allocated = "Please enter a valid amount";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        allocated: parseFloat(formData.allocated),
        spent: category?.spent || 0
      };
      
      await onSubmit(submitData);
    } catch (error) {
      console.error("Error submitting category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" className="h-5 w-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormField
            label="Category Name"
            id="name"
            value={formData.name}
            onChange={handleChange("name")}
            error={errors.name}
            placeholder="e.g., Groceries, Rent, Entertainment"
            required
          />
          
          <FormField
            label="Allocated Amount"
            id="allocated"
            type="number"
            step="0.01"
            min="0"
            value={formData.allocated}
            onChange={handleChange("allocated")}
            error={errors.allocated}
            placeholder="0.00"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={cn(
                    "p-2 rounded-md border-2 transition-all duration-200 hover:scale-110",
                    formData.icon === icon
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <ApperIcon name={icon} className="h-5 w-5 text-gray-600" />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="grid grid-cols-6 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110",
                    formData.color === color
                      ? "border-gray-900 ring-2 ring-offset-1 ring-gray-400"
                      : "border-gray-300"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ApperIcon name="Save" className="h-4 w-4 mr-2" />
              )}
              {category ? "Update Category" : "Add Category"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;