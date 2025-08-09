import { RouteObject } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductEdit from "./components/ProductEdit";
import ProductDetail from "./components/ProductDetail";

const routes: RouteObject[] = [
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/products/:id/edit",
    element: <ProductEdit />,
  },
];

export default routes;
