import App from "@/App";
import { Home, Order, Product, Users } from "@/pages";
import Category from "@/pages/category/Category";
import Login from "@/pages/Login";
import ProductAdd from "@/pages/products/Product.add";
import ProductEdit from "@/pages/products/Product.edit";
import { AdminRoute, PrivateRoute } from "@/utils/PrivateRoute";
import { createBrowserRouter } from 'react-router-dom';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/category',
        element:
          <PrivateRoute>
            <AdminRoute>
              <Category/>
            </AdminRoute>
          </PrivateRoute>
      },
      {
        path: '/product',
        element:
          <PrivateRoute>
            <AdminRoute>
              <Product />
            </AdminRoute>
          </PrivateRoute>
      },
      {
        path: '/product/add-product',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ProductAdd />
            </AdminRoute>
          </PrivateRoute>
        )
      },
      {
        path: '/product/edit-product/:id',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ProductEdit />
            </AdminRoute>
          </PrivateRoute>
        )
      },
      {
        path: '/order',
        element: <Order />
      },
      {
        path: '/user',
        element: <Users />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);

export default routes;