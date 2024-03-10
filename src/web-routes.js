import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { nationController } from "./controllers/nation-controller.js";
import { adminDashboardController } from "./controllers/admin-dashboard.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },

  { method: "GET", path: "/nation/{id}", config: nationController.index },
  { method: "POST", path: "/addlore", config: nationController.addLore },

  { method: "GET", path: "/admin/dashboard", config: adminDashboardController.index },
  { method: "POST", path: "/admin/dashboard/addnation", config: adminDashboardController.addNation },
  { method: "GET", path: "/admin/nation/deletenation/{id}", config: adminDashboardController.deleteNation },
  { method: "GET", path: "/admin/users", config: adminDashboardController.displayUsers },
  { method: "GET", path: "/admin/user/delete/{id}", config: adminDashboardController.deleteUser },
  { method: "GET", path: "/nation/{id}/deletelore/{loreid}", config: nationController.deleteLore },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
