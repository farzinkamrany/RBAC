import { Routes, Route, RouteObject } from "react-router-dom";
import Unauthorized from "../components/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";
import { getModuleDefs } from "../core/moduleRegistry";
import { Roles } from "../app/permissions";
import Home from "../pages/Home";
function renderRoutes(routes: RouteObject[], allowedRoles?: string[]) {
  return routes.map((route, index) => {
    const element = allowedRoles ? (
      <ProtectedRoute allowedRoles={allowedRoles}>
        {route.element}
      </ProtectedRoute>
    ) : (
      route.element
    );

    return <Route key={index} path={route.path} element={element} />;
  });
}
const AppRoutes = () => {
  const modules = getModuleDefs();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {modules.map((module) => {
        if (!module.routes) return null;

        let allowedRoles: string[] | undefined = undefined;

        if (module.name === "products")
          allowedRoles = [Roles.ADMIN, Roles.USER];
        else if (module.name === "users") allowedRoles = [Roles.ADMIN];

        return renderRoutes(module.routes, allowedRoles);
      })}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
        path="*"
        element={
          <div className="text-center mt-10 text-gray-500">صفحه یافت نشد</div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
