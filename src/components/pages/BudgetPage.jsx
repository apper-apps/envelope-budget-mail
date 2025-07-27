import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import BudgetOverview from "@/components/organisms/BudgetOverview";
import CategoryCard from "@/components/organisms/CategoryCard";
import CategoryModal from "@/components/organisms/CategoryModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "@/services/api/budgetService";
import { toast } from "react-toastify";

const BudgetPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to load budget categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = async (categoryData) => {
    try {
      const newCategory = await createCategory(categoryData);
      setCategories(prev => [...prev, newCategory]);
      setShowAddModal(false);
      toast.success("Category added successfully");
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const handleUpdateCategory = async (id, categoryData) => {
    try {
      const updatedCategory = await updateCategory(id, categoryData);
      setCategories(prev => 
        prev.map(cat => cat.Id === id ? updatedCategory : cat)
      );
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.Id !== id));
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadCategories} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budget Categories</h1>
          <p className="text-gray-600 mt-1">
            Manage your spending by allocating money to different categories
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} size="lg">
          <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
          Add Category
        </Button>
      </div>

      <BudgetOverview />

      {categories.length === 0 ? (
        <Empty
          title="No Budget Categories"
          description="Start managing your money by creating your first budget category. Allocate funds to different spending areas and track your progress."
          actionText="Add Your First Category"
          onAction={() => setShowAddModal(true)}
          icon="PlusCircle"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.Id}
              category={category}
              onUpdate={handleUpdateCategory}
              onDelete={handleDeleteCategory}
            />
          ))}
        </div>
      )}

      <CategoryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCategory}
        title="Add Category"
      />
    </div>
  );
};

export default BudgetPage;