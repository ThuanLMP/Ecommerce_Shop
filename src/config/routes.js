import Account from "../pages/Account";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import ManagementOrder from "../pages/ManagementOrder";
import OrderDetail from "../pages/ManagementOrder/OrderDetail";
import ManagementProduct from "../pages/ManagementProduct";
import AddProduct from "../pages/ManagementProduct/AddProduct";
import UpdateProduct from "../pages/ManagementProduct/UpdateProduct";
import ManagementUser from "../pages/ManagementUser";
import AddUser from "../pages/ManagementUser/AddUser";
import UpdateUser from "../pages/ManagementUser/UpdateUser";

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
    {
        path: '/admin/management/user',
        component: <ManagementUser />,
        roles: ['admin']
    },
    {
        path: '/admin/management/user/add-user',
        component: <AddUser/>,
        roles: ['admin']
    },
    {
        path: `/admin/management/user/update-user/:id`,
        component: <UpdateUser/>,
        roles: ['admin']
    },
    {
        path: '/admin/management/order',
        component: <ManagementOrder/>,
        roles: ['admin']
    },
    {
        path: '/admin/management/order/order-detail/:id',
        component: <OrderDetail/>,
        roles: ['admin']
    }

]

export default routes;