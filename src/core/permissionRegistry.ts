import { Permission } from "../app/permissions";

const registry: Permission[] = [];

export const registerPermissions = (perms: Permission[]) => {
  registry.push(...perms);
};

export const getPermissions = (): Permission[] => [...registry];
