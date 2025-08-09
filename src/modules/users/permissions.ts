import { Permission, Roles, Resource, Action } from "../../app/permissions";

export const userPermissions: Permission[] = [
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
  {
    resource: Resource.Users,
    action: Action.Delete,
    allowedRoles: [Roles.ADMIN],
  },
];
