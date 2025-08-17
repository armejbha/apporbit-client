// src/Routes/router.js
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Loading from "../Components/Shared/Loading/Loading";
import PrivateRoutes from "./PrivateRoutes";
import ModeratorRoute from "./ModeratorRoute";
import AdminRoute from "./AdminRoute";

// Lazy-loaded pages and layouts
const RootLayouts = lazy(() => import("../Layouts/RootLayouts"));
const DashboardLayouts = lazy(() => import("../Layouts/DashboardLayouts"));
const ErrorPage = lazy(() => import("../Pages/ErrorPage"));

const Home = lazy(() => import("../Pages/Home/Home"));
const About = lazy(() => import("../Pages/About/About"));
const Contact = lazy(() => import("../Pages/Contact/Contact"));
const LogIn = lazy(() => import("../Pages/LogIn/LogIn"));
const SignUp = lazy(() => import("../Pages/SignUp/SignUp"));

const Apps = lazy(() => import("../Pages/Apps/Apps"));
const AppsDetails = lazy(() => import("../Pages/AppsDetails/AppsDetails"));
const ProductDescription = lazy(() => import("../Pages/AppsDetails/ProductDescription"));
const ProductReviews = lazy(() => import("../Pages/AppsDetails/ProductReviews"));

const Profile = lazy(() => import("../Pages/Dashboard/Common/Profile"));
const Statistics = lazy(() => import("../Pages/Dashboard/Common/Statistics"));

const MyApps = lazy(() => import("../Pages/Dashboard/User/MyApps"));
const AddApps = lazy(() => import("../Pages/Dashboard/User/AddApps"));

const ReviewSubmission = lazy(() => import("../Pages/Dashboard/Moderator/ReviewSubmission"));
const ReportedProducts = lazy(() => import("../Pages/Dashboard/Moderator/ReportedProducts"));

const ManageUser = lazy(() => import("../Pages/Dashboard/Admin/ManageUser"));
const ManageCoupons = lazy(() => import("../Pages/Dashboard/Admin/ManageCoupons"));

// Reusable wrapper
const withSuspense = (element) => (
  <Suspense fallback={
  <div className="min-h-[400px] flex items-center justify-center">
    <Loading />
  </div>
}>
  {element}
</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<RootLayouts />),
    errorElement: withSuspense(<ErrorPage />),
    children: [
      {
        index: true,
        element: withSuspense(<Home />),
        handle: { title: "Home" },
      },
      {
        path: "apps",
        element: withSuspense(<Apps />),
        handle: { title: "All Apps" },
      },
      {
        path: "about",
        element: withSuspense(<About />),
        handle: { title: "About" },
      },
      {
        path: "contact",
        element: withSuspense(<Contact />),
        handle: { title: "Contact" },
      },
      {
        path: "appsDetails/:id",
        element: withSuspense(
          <PrivateRoutes>
            <AppsDetails />
          </PrivateRoutes>
        ),
        handle: { title: "App Details" },
        children: [
          {
            index: true,
            element: withSuspense(<ProductDescription />),
          },
          {
            path: "description",
            element: withSuspense(<ProductDescription />),
          },
          {
            path: "reviews",
            element: withSuspense(<ProductReviews />),
          },
        ],
      },
      {
        path: "login",
        element: withSuspense(<LogIn />),
        handle: { title: "Login" },
      },
      {
        path: "signup",
        element: withSuspense(<SignUp />),
        handle: { title: "Sign Up" },
      },
    ],
  },
  {
    path: "/dashboard",
    element: withSuspense(
      <PrivateRoutes>
        <DashboardLayouts />
      </PrivateRoutes>
    ),
    handle: { title: "Dashboard" },
    children: [
      {
        index: true,
        element: withSuspense(
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
        handle: { title: "My Profile" },
      },
      {
        path: "my-apps",
        element: withSuspense(
          <PrivateRoutes>
            <MyApps />
          </PrivateRoutes>
        ),
        handle: { title: "My Apps" },
      },
      {
        path: "add-apps",
        element: withSuspense(<AddApps />),
        handle: { title: "Add App" },
      },
      {
        path: "review-submission",
        element: withSuspense(
          <PrivateRoutes>
            <ModeratorRoute>
              <ReviewSubmission />
            </ModeratorRoute>
          </PrivateRoutes>
        ),
        handle: { title: "Review Submissions" },
      },
      {
        path: "reported-products",
        element: withSuspense(
          <PrivateRoutes>
            <ModeratorRoute>
              <ReportedProducts />
            </ModeratorRoute>
          </PrivateRoutes>
        ),
        handle: { title: "Reported Products" },
      },
      {
        path: "manage-users",
        element: withSuspense(
          <PrivateRoutes>
            <AdminRoute>
              <ManageUser />
            </AdminRoute>
          </PrivateRoutes>
        ),
        handle: { title: "Manage Users" },
      },
      {
        path: "manage-coupons",
        element: withSuspense(
          <PrivateRoutes>
            <AdminRoute>
              <ManageCoupons />
            </AdminRoute>
          </PrivateRoutes>
        ),
        handle: { title: "Manage Coupons" },
      },
      {
        path: "statistics",
        element: withSuspense(
          <PrivateRoutes>
            <AdminRoute>
              <Statistics />
            </AdminRoute>
          </PrivateRoutes>
        ),
        handle: { title: "Statistics" },
      },
    ],
  },
  {
    path: "*",
    element: withSuspense(<ErrorPage />),
    handle: { title: "Page Not Found" },
  },
]);
