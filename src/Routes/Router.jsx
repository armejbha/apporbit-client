import { Children, Component } from "react";
import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import Overview from "../Pages/Dashboard/Common/Overview";
import BecomeModerator from "../Pages/Dashboard/User/BecomeModerator";
import ReviewSubmission from "../Pages/Dashboard/Moderator/ReviewSubmission";
import ReportedProducts from "../Pages/Dashboard/Moderator/ReportedProducts";
import FeaturedManager from "../Pages/Dashboard/Moderator/FeatureManage";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import PrivateRoutes from "./PrivateRoutes";
import ModeratorRoute from "./ModeratorRoute";
import AdminRoute from "./AdminRoute";
import Profile from "../Pages/Dashboard/Common/Profile";
import MyApps from "../Pages/Dashboard/User/MyApps";
import AddApps from "../Pages/Dashboard/User/AddApps.jsx";
import AppsDetails from "../Pages/AppsDetails/AppsDetails.jsx";
import ProductDescription from "../Pages/AppsDetails/ProductDescription.jsx";
import ProductReviews from "../Pages/AppsDetails/ProductReviews.jsx";



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
                path:"/appsDetails/:id",
                element:(
                <PrivateRoutes>
                    <AppsDetails></AppsDetails>
                </PrivateRoutes>
                ),
                children: [
                   {
                     index:true,
                     element: <ProductDescription />
                   },
                   {
                     path:"description",
                     element: <ProductDescription />
                   },
                   {
                     path: "reviews",
                     element: <ProductReviews />
                   }
                 ]

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
        element:
        <PrivateRoutes>
            <DashboardLayouts/>
        </PrivateRoutes>
        ,
        children:[
           {
            index:true,
            element:<Overview/>
           },
           {
            path:'/dashboard/my-apps',
            element:<PrivateRoutes>
                <MyApps/>
            </PrivateRoutes>,
           },
        //    {
        //     path:'/dashboard/my-apps/:id',
        //     element:
        //    },
           {
            path:"/dashboard/add-apps",
            element:<AddApps/>
           },
           {
            path:"/dashboard/become-moderator",
            element:<BecomeModerator/>
           },
           {
            path:"/dashboard/review-submission",
            element:<PrivateRoutes>
                <ModeratorRoute>
                    <ReviewSubmission/>
                </ModeratorRoute>
            </PrivateRoutes>
           },
           {
            path:"/dashboard/reported-products",
            element:
            <PrivateRoutes>
                <ModeratorRoute>
                    <ReportedProducts/>
                </ModeratorRoute>
            </PrivateRoutes>
           },
           {
            path:"/dashboard/feature-manage",
            element:<PrivateRoutes>
                <ModeratorRoute>
                    <FeaturedManager/>
                </ModeratorRoute>
            </PrivateRoutes>
           },
           {
            path:"/dashboard/manage-users",
            element:<PrivateRoutes>
                <AdminRoute>
                    <ManageUser/>
                </AdminRoute>
            </PrivateRoutes>
           },
           {
            path:"/dashboard/profile",
            element:<PrivateRoutes>
                <Profile/>
            </PrivateRoutes>
           }
        ]
    },
    {
        path:"*",
        element:<ErrorPage/>
    }

])