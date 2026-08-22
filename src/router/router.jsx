import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/Payment/PaymentHistory";
import UpdateProfile from "../Pages/Profile/UpdateProfile";
import About from "../Pages/About/About";
import PrivateRoute from "../Routes/PrivateRoute";
import ErrorPage from "../Components/Common/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <SignIn></SignIn>,
      },
      {
        path: "signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);


export default router;