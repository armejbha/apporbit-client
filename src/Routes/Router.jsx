import { Children, Component } from "react";
import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import Overview from "../Pages/Dashboard/Common/Overview";
import MySubmission from "../Pages/Dashboard/User/MySubmission";
import AddProducts from "../Pages/Dashboard/User/AddProducts";
import BecomeModerator from "../Pages/Dashboard/User/BecomeModerator";
import ReviewSubmission from "../Pages/Dashboard/Moderator/ReviewSubmission";
import ReportedProducts from "../Pages/Dashboard/Moderator/ReportedProducts";
import FeaturedManager from "../Pages/Dashboard/Moderator/FeatureManage";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";



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
        path:"/dashboard",
        element:<DashboardLayouts/>,
        children:[
           {
             index:true,
            element:<Overview/>
           },
           {
            path:'/dashboard/my-submission',
            element:<MySubmission/>,
           },
           {
            path:"/dashboard/add-products",
            element:<AddProducts/>
           },
           {
            path:"/dashboard/become-moderator",
            element:<BecomeModerator/>
           },
           {
            path:"/dashboard/review-submission",
            element:<ReviewSubmission/>
           },
           {
            path:"/dashboard/reported-products",
            element:<ReportedProducts/>
           },
           {
            path:"/dashboard/feature-manage",
            element:<FeaturedManager/>
           },
           {
            path:"/dashboard/manage-users",
            element:<ManageUser/>
           }
        ]
    },
    {
        path:"*",
        element:<ErrorPage/>
    }

])