import { useState, useEffect } from "react";
import { useAppStore, User } from "../../../app/store";

interface UserFormProps {
  user?: User;
  onSave?: (user: User) => void;
  onCancel?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const addUser = useAppStore((s) => s.addUser);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState<"admin" | "user">(user?.role || "user");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("نام الزامی است.");
    if (!email.trim()) return setError("ایمیل الزامی است.");
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!role) return setError("نقش الزامی است.");

    if (user && onSave) {
      onSave({ ...user, name, email, role });
    } else {
      addUser({ name, email, role });
      setName("");
      setEmail("");
      setRole("user");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-4 rounded shadow space-y-3 max-w-md mx-auto"
    >
      <h3 className="text-lg font-medium">
        {user ? "ویرایش کاربر" : "افزودن کاربر جدید"}
      </h3>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="نام"
          className="p-2 border rounded"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل"
          className="p-2 border rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "admin" | "user")}
          className="p-2 border rounded"
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <div className="flex gap-3 justify-start">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {user ? "ذخیره" : "اضافه کن"}
        </button>
        {user && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded text-gray-700"
          >
            انصراف
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
