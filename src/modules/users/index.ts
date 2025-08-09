import routes from "./routes";
import { registerModule } from "../../core/moduleRegistry";
import { userPermissions } from "./permissions";
import { registerPermissions } from "../../core/permissionRegistry";
registerModule({ name: "users", routes });
registerPermissions(userPermissions);
