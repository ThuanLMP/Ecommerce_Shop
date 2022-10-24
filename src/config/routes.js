import Account from "../pages/Account";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";

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
        component: <Account/>,
        roles: ['user']
    }

]

export default routes;