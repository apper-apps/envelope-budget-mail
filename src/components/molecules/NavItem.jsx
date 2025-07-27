import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavItem = ({ to, icon, children, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
          isActive
            ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:scale-[1.02]",
          className
        )
      }
    >
      {({ isActive }) => (
        <>
          <ApperIcon 
            name={icon} 
            className={cn(
              "h-5 w-5 mr-3 transition-colors duration-200",
              isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"
            )}
          />
          {children}
        </>
      )}
    </NavLink>
  );
};

export default NavItem;