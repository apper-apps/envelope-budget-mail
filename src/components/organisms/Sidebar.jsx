import { useState } from "react";
import NavItem from "@/components/molecules/NavItem";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ showMobile = false, onClose }) => {
  const navigation = [
    { name: "Budget", href: "/budget", icon: "Wallet" },
    { name: "Accounts", href: "/accounts", icon: "CreditCard" },
    { name: "Transactions", href: "/transactions", icon: "Receipt" },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {showMobile && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-full bg-white border-r border-gray-200 shadow-sm">
            <div className="flex items-center px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <ApperIcon name="PiggyBank" className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  EnvelopeBudget
                </span>
              </div>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <NavItem
                  key={item.name}
                  to={item.href}
                  icon={item.icon}
                >
                  {item.name}
                </NavItem>
              ))}
            </nav>
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Budget User</p>
                    <p className="text-xs text-gray-500">Manage your finances</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden",
        showMobile ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="PiggyBank" className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                EnvelopeBudget
              </span>
            </div>
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={onClose}
            >
              <ApperIcon name="X" className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <NavItem
                key={item.name}
                to={item.href}
                icon={item.icon}
                className="block"
                onClick={onClose}
              >
                {item.name}
              </NavItem>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;