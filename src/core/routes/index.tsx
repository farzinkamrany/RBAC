import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouteProps,
} from "react-router-dom";
import { getModuleDefs } from "../moduleRegistry";

export const AppRoutes = () => {
  const modules = getModuleDefs();

  return (
    <Router>
      <Routes>
        {modules.flatMap((m) => {
          const routes = m.routes as RouteProps[] | undefined;
          return (
            routes?.map((r, i) => <Route key={`${m.name}-${i}`} {...r} />) ?? []
          );
        })}
      </Routes>
    </Router>
  );
};
