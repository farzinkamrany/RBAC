import create from "zustand";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface Product {
  id: number;
  name: string;
  image?: string | null;
}

interface AppState {
  user: User | null;
  users: User[];
  products: Product[];

  setUser: (user: User | null) => void;
  addUser: (user: Omit<User, "id">) => void;
  setUsers: (users: User[]) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  setProducts: (products: Product[]) => void;

  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: {
    id: 1,
    name: "مدیر نمونه",
    email: "admin@example.com",
    role: "admin",
  },

  users: [
    { id: 1, name: "مدیر نمونه", email: "admin@example.com", role: "admin" },
    { id: 2, name: "کاربر نمونه", email: "user@example.com", role: "user" },
  ],

  products: [],

  setUser: (user) => set({ user }),

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, { id: Date.now(), ...user }],
    })),
  setUsers: (users) => set({ users }),
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { id: Date.now(), ...product }],
    })),

  setProducts: (products) => set({ products }),

  logout: () => set({ user: null }),
}));
