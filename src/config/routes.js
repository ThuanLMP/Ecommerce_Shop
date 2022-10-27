import Account from "../pages/Account";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import ManagementProduct from "../pages/ManagementProduct";
import AddProduct from "../pages/ManagementProduct/AddProduct";
import UpdateProduct from "../pages/ManagementProduct/UpdateProduct";

const routes = [
    {
        path: '/home',
        component: <Home />,
    },
    {
        path: '/home/cart',
        component: <Cart />,
        roles: ['user']
    },
    {
        path: '/home/checkout',
        component: <Checkout />,
        roles: ['user']
    },
    {
        path: '/home/my-profile',
        component: <Account />,
        roles: ['user']
    },
    {
        path: '/admin/management/product',
        component: <ManagementProduct />,
        roles: ['admin']
    },
    {
        path: '/admin/management/product/add-product',
        component: <AddProduct/>,
        roles: ['admin']
    },
    {
        path: '/admin/management/product/update-product/:id',
        component: <UpdateProduct/>,
        roles: ['admin']
    },

]

export default routes;