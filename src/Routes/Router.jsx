import { Children, Component } from "react";
import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";


export const router=createBrowserRouter([
    {
        path:"/",
        element:<RootLayouts/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"login",
                element:<LogIn/>
            },
            {
                path:"signup",
                element:<SignUp/>
            }
        
    ]
    },
    {
        path:"*",
        element:<ErrorPage/>
    }

])