
import { Link } from "react-router-dom";
import {  useSelector } from 'react-redux';
import { RootState } from "@/store/store";
// import { HomeIcon, , UserIcon } from "lucide-react";
import { HomeIcon, OrderIcon, ProductIcon, UserIcon } from "@/assets/icons2";
import { TbCategoryPlus } from "react-icons/tb";

const Navbar = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.toggle.value);
  const role = localStorage.getItem('role');

  return (
    <div className="flex h-screen">
      <nav className={`relative bg-primary text-white h-full transition-all duration-300 ${isSidebarOpen ? "w-54" : "w-20"}`}>
        <div className="p-4">
          {/* Logo */}
          <div className="flex justify-between items-center mt-2">
            <div className={`font-bold transition-all duration-500 ${isSidebarOpen ? "text-xl text-center" : "text-center text-lg ml-2 "}`}>
              <Link to="/">{isSidebarOpen ? "Boitoi Dashboard" : "AD"}</Link>
            </div>
           
          </div>

          {/* Navigation Links */}
          <div className="py-5">
            {role === "admin" && (
              <div>
                <Link to="/home" className="flex items-center space-x-2 p-3 hover:bg-secondary rounded-md">
                  <HomeIcon />
                  {isSidebarOpen && <span className="text-base-1 px-1">Home</span>}
                </Link>

                <Link to="/category" className="flex items-center space-x-2 p-3 hover:bg-secondary rounded-md">
                  <TbCategoryPlus/>
                  {isSidebarOpen && <span className="text-base-1 px-1">Category</span>}
                </Link>
                <Link to="/product" className="flex items-center space-x-2 p-3 hover:bg-secondary rounded-md">
                  <ProductIcon />
                  {isSidebarOpen && <span className="text-base-1 px-1">Products</span>}
                </Link>

                <Link to="/order" className="flex items-center space-x-2 p-3 hover:bg-secondary rounded-md">
                  <OrderIcon className="w-6 h-6 text-white" />
                  {isSidebarOpen && <span className="text-base-1 px-1">Orders</span>}
                </Link>
                <Link to="/user" className="flex items-center space-x-2 p-3 hover:bg-secondary rounded-md">
                  <UserIcon className="w-6 h-6 text-white" />
                  {isSidebarOpen && <span className="text-base-1 px-1">Users</span>}
                </Link>
              </div>
            )}
            {role === "user" && (
              <div>
                <Link to="/order" className="flex items-center space-x-2 p-3 hover:bg-secondary rounded-md">
                  <OrderIcon className="w-6 h-6 text-white" />
                  {isSidebarOpen && <span className="text-base-1 px-1">Orders</span>}
                </Link>
              </div>
            )}
            {/* <Link to="/product/add-product" className="flex items-center space-x-2 p-3 hover:bg-secondary rounded-md">
              <UserIcon className="w-6 h-6 text-white" />
              {isSidebarOpen && <span className="text-base-1 px-1">Add Product</span>}
            </Link> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

