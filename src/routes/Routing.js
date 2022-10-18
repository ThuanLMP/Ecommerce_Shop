import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "../config/routes";
import Error from "../pages/Error";
import ProductDetails from "../pages/Product/ProductDetails";


export default function Routing() {
    return(
        <Router>
            <Routes>
                {
                    routes.map((route,index)=>{
                        return <Route key={index} path={route.path} element={route.component}/>
                    })
                }
                <Route path="*" element={<Error/>}/>
                <Route path="/home/products/:id" element={<ProductDetails/>}/>
            </Routes>
        </Router>
    )
}