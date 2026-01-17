import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./lib/RootLayout";
import Table from "./pages/table/Table";
import TableOrderDetail, {
  loader as tableOrderDetailLoader,
} from "./pages/table/TableOrderDetail";
import Order from "./pages/order/Order";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/table" replace />,
      },
      {
        path: "/table",
        element: <Table />,
      },
      {
        path: "/table/order-detail/:id",
        element: <TableOrderDetail />,
        loader: tableOrderDetailLoader,
      },
      {
        path: "/order",
        element: <Order />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes, { basename: "/test" });
