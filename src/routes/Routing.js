import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "../config/routes";
import Error from "../pages/Error";
import ProductDetails from "../pages/Product/ProductDetails";
import ProtectedRoutes from "./ProtectedRoutes";


export default function Routing() {
    return (
        <Router>
            <Routes>
                {
                    routes.map((route, index) => {
                        if (!route.roles) {
                            return <Route key={index} path={route.path} element={route.component} />
                        } else {
                            return <Route key={index} path={route.path} element={<ProtectedRoutes roles={route.roles}>{route.component}</ProtectedRoutes>} />
                        }
                        
                    })
                }
                <Route path="*" element={<Error />} />
                <Route path="/home/products/:id" element={<ProductDetails />} />
            </Routes>
        </Router>
    )
}