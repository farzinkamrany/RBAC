export const importAllModules = async () => {
  const modules = import.meta.glob("../modules/**/index.{ts,tsx}", {
    eager: true,
  });
  return modules;
};
