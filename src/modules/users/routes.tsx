import UserList from "./components/UserList";
import ProtectedRoute from "../../components/ProtectedRoute";

const usersRoutes = [
  {
    path: "/users",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <UserList />
      </ProtectedRoute>
    ),
  },
];

export default usersRoutes;
