// src/modules/products/index.ts
import routes from "./routes";
import { registerModule } from "../../core/moduleRegistry";
import { productPermissions } from "./permissions";
import { registerPermissions } from "../../core/permissionRegistry";

registerModule({ name: "products", routes });
registerPermissions(productPermissions);
