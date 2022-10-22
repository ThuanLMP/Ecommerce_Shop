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
    }

]

export default routes;