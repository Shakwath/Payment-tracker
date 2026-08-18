import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
]);

export default router;