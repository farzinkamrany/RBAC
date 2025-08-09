import { RouteObject } from "react-router-dom";

export type ModuleRoute = RouteObject[];

export type ModuleDef = {
  name: string;
  routes?: ModuleRoute;
};

const registry: Record<string, ModuleDef> = {};

export const registerModule = (m: ModuleDef) => {
  registry[m.name] = m;
};

export const unregisterModule = (name: string) => {
  delete registry[name];
};

export const getModuleDefs = () => Object.values(registry);
