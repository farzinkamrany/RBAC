import { Permission, Roles, Resource, Action } from "../../app/permissions";

export const productPermissions: Permission[] = [
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
    resource: Resource.Products,
    action: Action.Delete,
    allowedRoles: [Roles.ADMIN],
  },
];
