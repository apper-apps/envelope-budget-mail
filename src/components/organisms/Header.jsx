import ApperIcon from "@/components/ApperIcon";

const Header = ({ title = "My Budget", showMobileMenu, onToggleMobileMenu }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={onToggleMobileMenu}
            >
              <span className="sr-only">Open sidebar</span>
              <ApperIcon name="Menu" className="h-6 w-6" />
            </button>
            <h1 className="ml-2 lg:ml-0 text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-success-50 to-success-100 px-3 py-2 rounded-lg">
              <ApperIcon name="TrendingUp" className="h-4 w-4 text-success-600" />
              <span className="text-sm font-medium text-success-700">Budget Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;