import Cart from "../pages/Cart";
import Home from "../pages/Home";

const routes = [
    {
        path: '/home',
        component: <Home/>,
        roles: []
    },
    {
        path: '/home/cart',
        component: <Cart/>,
        roles: []
    }
    
]

export default routes;