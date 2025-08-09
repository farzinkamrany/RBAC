export type Role = "admin" | "user";

export const Roles = {
  ADMIN: "admin" as Role,
  USER: "user" as Role,
};

export enum Resource {
  Products = "products",
  Users = "users",
  Orders = "orders",
  Tickets = "tickets",
}

export enum Action {
  Read = "read",
  Write = "write",
  Delete = "delete",
}

export interface Permission {
  resource: Resource;
  action: Action;
  allowedRoles: Role[];
}

export const defaultPermissions: Permission[] = [
  {
    resource: Resource.Products,
    action: Action.Read,
    allowedRoles: [Roles.ADMIN, Roles.USER],
  },
  {
    resource: Resource.Products,
    action: Action.Write,
    allowedRoles: [Roles.ADMIN],
  },
  {
    resource: Resource.Users,
    action: Action.Read,
    allowedRoles: [Roles.ADMIN],
  },
  {
    resource: Resource.Users,
    action: Action.Write,
    allowedRoles: [Roles.ADMIN],
  },
];

export const canAccess = (
  role: Role | null,
  resource: Resource,
  action: Action,
  permissions: Permission[]
): boolean => {
  if (!role) return false;
  const perm = permissions.find(
    (p) => p.resource === resource && p.action === action
  );
  if (!perm) return false;
  return perm.allowedRoles.includes(role);
};
