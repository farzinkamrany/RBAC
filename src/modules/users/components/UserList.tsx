import { useState } from "react";
import { useAppStore, User } from "../../../app/store";
import UserForm from "./UserForm";
import { getPermissions } from "../../../core/permissionRegistry";
import { Action, canAccess, Resource } from "../../../app/permissions";

const UserList: React.FC = () => {
  const users = useAppStore((s) => s.users);
  const updateUsers = useAppStore((s) => s.setUsers);

  const [editUser, setEditUser] = useState<User | null>(null);
  const user = useAppStore((state) => state.user);
  const permissions = getPermissions();

  const canEdit = canAccess(
    user?.role ?? null,
    Resource.Products,
    Action.Write,
    permissions
  );
  const canDelete = canAccess(
    user?.role ?? null,
    Resource.Products,
    Action.Delete,
    permissions
  );
  const deleteUser = (id: number) => {
    updateUsers(users.filter((u) => u.id !== id));
  };

  const startEdit = (user: User) => {
    setEditUser(user);
  };

  const cancelEdit = () => {
    setEditUser(null);
  };

  const saveEdit = (updatedUser: User) => {
    updateUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditUser(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">کاربران</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr
                className="text-gray-600 text-left
              "
              >
                <th className="pb-2">id</th>
                <th className="pb-2">نام</th>
                <th className="pb-2">ایمیل</th>
                <th className="pb-2">نقش</th>
                <th className="pb-2">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t text-left">
                  <td className="py-2">{u.id}</td>
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.role}</td>
                  <td className="py-2 space-x-2 rtl:space-x-reverse">
                    {canEdit && (
                      <button
                        onClick={() => startEdit(u)}
                        className="text-blue-600 hover:underline"
                      >
                        ویرایش
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="text-red-600 hover:underline"
                      >
                        حذف
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editUser ? (
        <UserForm user={editUser} onCancel={cancelEdit} onSave={saveEdit} />
      ) : (
        <UserForm />
      )}
    </div>
  );
};

export default UserList;
